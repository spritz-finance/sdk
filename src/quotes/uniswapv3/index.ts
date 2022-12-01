import { Percent, Token, TradeType } from '@uniswap/sdk-core'
import { AlphaRouter, CurrencyAmount, SwapRoute, SwapType, V3Route } from '@uniswap/smart-order-router'
import { ethers } from 'ethers'
import { SpritzPayV2 } from '../../contracts/types'
import { UniswapQuoteError } from '../../errors'
import { getChainId, SupportedNetwork } from '../../networks'
import { NATIVE_ZERO_ADDRESS } from '../../supportedTokens'
import { acceptedOutputTokenFor, getFullToken, isNativeAddress } from '../../tokens'
import { fiatNumber, FiatValue, roundNumber } from '../../utils/format'
import { formatPaymentReference } from '../../utils/reference'
import { getSwapPath } from './path'

export type PayWithV3SwapArgsResult = {
  args: Parameters<SpritzPayV2['functions']['payWithV3Swap']>
  data: PaymentQuote
}

type SwapRouteProps = {
  inputToken: Token
  deadline: number
  amountOut: string
  slippagePercentage: number
}

export type PaymentQuote = {
  path: string
  sourceTokenAddress: string
  sourceTokenAmountMax: string
  paymentTokenAddress: string
  paymentTokenAmount: string
  deadline: number
}

const getAmountInMax = (token: Token, routeData: SwapRoute) => {
  const amountString = routeData.quote.toExact()
  const parsedAmount = ethers.utils.parseUnits(amountString, token.decimals)
  return parsedAmount.toString()
}

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
  ): Promise<PayWithV3SwapArgsResult> {
    const isNativeSwap = isNativeAddress(tokenAddress)

    const inputToken = await getFullToken(tokenAddress, this.network, this.provider)

    const data = await this.getTokenPaymentQuote(inputToken, fiatAmount)
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
    }
  }

  private async getTokenPaymentQuote(
    inputToken: Token,
    fiatAmount: FiatValue,
    slippagePercentage = 5,
  ): Promise<PaymentQuote> {
    const { amountOut, deadline } = this.getQuoteParams(fiatNumber(fiatAmount))

    const routeData = await this.getSwapRoute({
      inputToken,
      deadline,
      amountOut,
      slippagePercentage,
    })

    const route = (routeData?.route[0].route ?? null) as V3Route | null
    if (!route || !routeData) throw new UniswapQuoteError()

    const amountInMax = getAmountInMax(inputToken, routeData)
    const path = getSwapPath(route)

    return {
      path,
      sourceTokenAddress: inputToken.address,
      sourceTokenAmountMax: amountInMax,
      paymentTokenAddress: this.paymentToken.address,
      paymentTokenAmount: amountOut,
      deadline,
    }
  }

  private async getSwapRoute({ inputToken, deadline, amountOut, slippagePercentage }: SwapRouteProps) {
    return this.router.route(
      CurrencyAmount.fromRawAmount(this.paymentToken, amountOut.toString()),
      inputToken,
      TradeType.EXACT_OUTPUT,
      {
        type: SwapType.SWAP_ROUTER_02,
        recipient: NATIVE_ZERO_ADDRESS,
        slippageTolerance: new Percent(slippagePercentage, 100),
        deadline,
      },
    )
  }

  private getQuoteParams(_amountOut: number) {
    const usdPaymentAmount = roundNumber(_amountOut).toString()
    const amountOut = ethers.utils.parseUnits(usdPaymentAmount, this.paymentToken.decimals).toString()

    const deadline = Math.floor(Date.now() / 1000 + 1800) // 30 minutes
    return { amountOut, deadline }
  }
}
