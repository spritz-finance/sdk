import { Percent, Token, TradeType, Currency, CurrencyAmount } from '@uniswap/sdk-core'
import { Protocol } from '@uniswap/router-sdk'
import { AlphaRouter, SwapRoute, SwapType, V3Route } from '@uniswap/smart-order-router'
import { BigNumber, ethers } from 'ethers'
import { SpritzPayV2 } from '../../contracts/types'
import { UniswapQuoteError } from '../../errors'
import { getChainId, Network, SupportedNetwork } from '../../networks'
import { isNonPaymentStablecoin, NATIVE_ZERO_ADDRESS } from '../../supportedTokens'
import { acceptedOutputTokenFor, getFullToken, isNativeAddress } from '../../tokens'
import { fiatNumber, FiatValue, roundNumber } from '../../utils/format'
import { formatPaymentReference } from '../../utils/reference'
import { computeRoutes, transformRoutesToTrade } from './bestRoute'
import { getSwapPath } from './path'
import { transformQuote } from './transformQuote'

export type PayWithV3SwapArgsResult = {
  args: Parameters<SpritzPayV2['functions']['payWithV3Swap']>
  data: PaymentQuote
  additionalHops: number
  requiredTokenInput: BigNumber
}

type SwapRouteProps = {
  inputToken: Token
  currencyOut: CurrencyAmount<Currency>
}

export type PaymentQuote = {
  path: string
  sourceTokenAddress: string
  sourceTokenAmountMax: string
  paymentTokenAddress: string
  paymentTokenAmount: string
  deadline: number
  additionalHops: number
}

const SLIPPAGE_TOLERANCE = new Percent(50, 10_000) // 0.5%
const SLIPPAGE_TOLERANCE_STABLECOIN = new Percent(25, 10_000) // 0.25%

export class UniswapV3Quoter {
  private router: AlphaRouter
  private paymentToken: Token
  private network: SupportedNetwork
  private provider: ethers.providers.BaseProvider

  constructor(network: SupportedNetwork, provider: ethers.providers.BaseProvider) {
    this.provider = provider
    this.network = network
    this.router = new AlphaRouter({
      chainId: getChainId(network),
      provider,
    })
    this.paymentToken = acceptedOutputTokenFor(network)
  }

  public async getPayWithSwapArgs(
    tokenAddress: string,
    fiatAmount: string | number,
    reference: string,
    currentTime = Math.floor(Date.now() / 1000),
  ): Promise<PayWithV3SwapArgsResult> {
    const isNativeSwap = isNativeAddress(tokenAddress)

    const inputToken = await getFullToken(tokenAddress, this.network, this.provider)

    const data = await this.getTokenPaymentQuote(inputToken, fiatAmount, currentTime)
    const args: Parameters<SpritzPayV2['functions']['payWithV3Swap']> = [
      data.path,
      inputToken.address,
      data.sourceTokenAmountMax,
      data.paymentTokenAddress,
      data.paymentTokenAmount,
      formatPaymentReference(reference),
      data.deadline,
    ]

    if (isNativeSwap) {
      args.push({
        value: data.sourceTokenAmountMax,
      })
    }

    return {
      args,
      data,
      additionalHops: data.additionalHops,
      requiredTokenInput: BigNumber.from(data.sourceTokenAmountMax),
    }
  }

  private async getTokenPaymentQuote(
    inputToken: Token,
    fiatAmount: FiatValue,
    currentTime: number,
  ): Promise<PaymentQuote> {
    const { amountOut, deadline } = this.getQuoteParams(fiatNumber(fiatAmount), currentTime)

    const currencyOut = CurrencyAmount.fromRawAmount(this.paymentToken, amountOut.toString())

    const routeData = await this.getSwapRoute({
      inputToken,
      currencyOut,
    })

    if (!routeData) throw new UniswapQuoteError()
    const transformedRoute = transformQuote(currencyOut, routeData)

    const route = computeRoutes(inputToken, currencyOut.currency, transformedRoute)
    const trade = transformRoutesToTrade(route, TradeType.EXACT_OUTPUT, transformedRoute?.blockNumber)

    const { path, additionalHops } = getSwapPath(trade.routes[0] as unknown as V3Route)

    const slippage = isNonPaymentStablecoin(inputToken.address, this.network)
      ? SLIPPAGE_TOLERANCE_STABLECOIN
      : SLIPPAGE_TOLERANCE

    return {
      path,
      sourceTokenAddress: inputToken.address,
      sourceTokenAmountMax: trade.maximumAmountIn(slippage).quotient.toString(),
      paymentTokenAddress: this.paymentToken.address,
      paymentTokenAmount: amountOut,
      deadline,
      additionalHops,
    }
  }

  private async getSwapRoute({ inputToken, currencyOut }: SwapRouteProps) {
    return this.router.route(currencyOut, inputToken, TradeType.EXACT_OUTPUT, undefined, {
      protocols: [Protocol.V3],
    })
  }

  private getQuoteParams(_amountOut: number, currentTime: number) {
    const usdPaymentAmount = roundNumber(_amountOut).toString()
    const amountOut = ethers.utils.parseUnits(usdPaymentAmount, this.paymentToken.decimals).toString()

    const deadline = currentTime + 1800 // 30 minutes
    return { amountOut, deadline }
  }
}
