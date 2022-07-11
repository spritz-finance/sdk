import { Percent, Token, TradeType } from '@uniswap/sdk-core'
import { AlphaRouter, CurrencyAmount, SwapRoute, V3Route } from '@uniswap/smart-order-router'
import { ethers } from 'ethers'
import { SPRITZ_PAYMENT_WALLET } from '../../constants'
import { roundNumber } from '../../utils/roundNumber'
import { getSwapPath } from './path'

const AMOUNT_IN_MAX_PADDING = 1.02

type SwapRouteProps = {
  inputToken: Token
  deadline: number
  amountOut: string
  slippagePercentage: number
}

const getAmountInMax = (token: Token, routeData: SwapRoute) => {
  const amountString = routeData.quote.toFixed(token.decimals)
  const amount = parseFloat(amountString) * 10 ** token.decimals * AMOUNT_IN_MAX_PADDING
  return amount.toString()
}

export class UniswapQuoter {
  private router: AlphaRouter
  private paymentToken: Token

  constructor(paymentToken: Token, provider: ethers.providers.JsonRpcProvider) {
    this.router = new AlphaRouter({
      chainId: paymentToken.chainId,
      provider,
    })
    this.paymentToken = paymentToken
  }

  public async getPaymentQuote(inputToken: Token, _amountOut: number, slippagePercentage = 5) {
    const { amountOut, deadline } = this.getQuoteParams(_amountOut)

    const routeData = await this.getSwapRoute({
      inputToken,
      deadline,
      amountOut,
      slippagePercentage,
    })

    const route = (routeData?.route[0].route ?? null) as V3Route | null
    if (!route || !routeData) return null

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

  private async getSwapRoute({ inputToken, deadline, amountOut, slippagePercentage }: SwapRouteProps) {
    const data = await this.router.route(
      CurrencyAmount.fromRawAmount(this.paymentToken, amountOut.toString()),
      inputToken,
      TradeType.EXACT_OUTPUT,
      {
        recipient: SPRITZ_PAYMENT_WALLET,
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
