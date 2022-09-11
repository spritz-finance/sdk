import { Percent, Token, TradeType } from '@uniswap/sdk-core'
import { AlphaRouter, CurrencyAmount, SwapRoute, V3Route } from '@uniswap/smart-order-router'
import { ethers } from 'ethers'
import { UniswapQuoteError } from '../../errors'
import { NETWORK_TO_CHAIN_ID, SupportedNetwork } from '../../networks'
import { fiatNumber, FiatValue, roundNumber } from '../../utils/format'
import { getWrappedNativeToken } from '../../wrappedNativeTokens'
import { getSwapPath } from './path'
import { NATIVE_ZERO_ADDRESS } from '../../supportedTokens'

type SwapRouteProps = {
  inputToken: Token
  deadline: number
  amountOut: string
  slippagePercentage: number
}

export type TokenPaymentQuote = {
  sourceTokenAddress: string
  paymentTokenAddress: string
  amountOut: string
  amountInMax: string
  path: string
}

export type NativePaymentQuote = {
  sourceTokenAddress: string
  paymentTokenAddress: string
  amountOut: string
  amountInMax: string
  path: string
}

const getAmountInMax = (token: Token, routeData: SwapRoute) => {
  const amountString = routeData.quote.toExact()
  const parsedAmount = ethers.utils.parseUnits(amountString, token.decimals)
  return parsedAmount.toString()
}

export class UniswapQuoter {
  private router: AlphaRouter
  private network: SupportedNetwork
  private paymentToken: Token

  constructor(paymentToken: Token, network: SupportedNetwork, provider: ethers.providers.JsonRpcProvider) {
    this.network = network
    this.router = new AlphaRouter({
      chainId: NETWORK_TO_CHAIN_ID[network],
      provider,
    })
    this.paymentToken = paymentToken
  }

  public async getTokenPaymentQuote(
    inputToken: Token,
    fiatAmount: FiatValue,
    slippagePercentage = 5,
  ): Promise<TokenPaymentQuote> {
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
      sourceTokenAddress: inputToken.address,
      paymentTokenAddress: this.paymentToken.address,
      amountOut,
      amountInMax,
      path,
    }
  }

  public async getNativePaymentQuote(fiatAmount: FiatValue, slippagePercentage = 5): Promise<NativePaymentQuote> {
    const { amountOut, deadline } = this.getQuoteParams(fiatNumber(fiatAmount))

    const nativeToken = getWrappedNativeToken(this.network) as Token
    const routeData = await this.getSwapRoute({
      inputToken: nativeToken,
      deadline,
      amountOut,
      slippagePercentage,
    })

    const route = (routeData?.route[0].route ?? null) as V3Route | null
    if (!route || !routeData) throw new UniswapQuoteError()

    const amountInMax = getAmountInMax(nativeToken, routeData)
    const path = getSwapPath(route)

    return {
      sourceTokenAddress: nativeToken.address,
      paymentTokenAddress: this.paymentToken.address,
      amountOut,
      amountInMax,
      path,
    }
  }

  private async getSwapRoute({ inputToken, deadline, amountOut, slippagePercentage }: SwapRouteProps) {
    const data = await this.router.route(
      CurrencyAmount.fromRawAmount(this.paymentToken, amountOut.toString()),
      inputToken,
      TradeType.EXACT_OUTPUT,
      {
        recipient: NATIVE_ZERO_ADDRESS,
        slippageTolerance: new Percent(slippagePercentage, 100),
        deadline,
      },
    )

    return data
  }

  private getQuoteParams(_amountOut: number) {
    const usdPaymentAmount = roundNumber(_amountOut).toString()
    const amountOut = ethers.utils.parseUnits(usdPaymentAmount, this.paymentToken.decimals).toString()

    const deadline = Math.floor(Date.now() / 1000 + 1800)
    return { usdPaymentAmount, amountOut, deadline }
  }
}
