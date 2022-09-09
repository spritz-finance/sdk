import {
  Fetcher,
  WETH as GenericWETH,
  JSBI,
  Pair,
  Percent,
  Route,
  Token,
  TokenAmount,
  Trade,
  TradeType,
} from 'quickswap-sdk'
import { ACCEPTED_PAYMENT_TOKENS } from '../../supportedTokens'
import { Network, SupportedNetwork } from '../../networks'
import { ethers } from 'ethers'

export class UniswapV2Quoter {
  constructor(public network: SupportedNetwork, public provider: ethers.providers.BaseProvider) {}

  getPayWithSwapArgs(tokenAddress: string, fiatAmount: string | number) {}

  async getPairData(tokenA: Token, tokenB: Token) {
    const data = await Fetcher.fetchPairData(tokenA, tokenB, this.provider)
    return data
  }

  async getStablecoinPairsForToken(tokenA: Token) {
    const acceptedTokens = ACCEPTED_PAYMENT_TOKENS[this.network].map(
      (t) => new Token(137, t.address, t.decimals, t.symbol, t.symbol),
    )

    return Promise.all(acceptedTokens.map((tokenB) => this.getPairData(tokenA, tokenB)))
  }

  getTrades(pairs: Pair[], tokenA: Token, fiatAmount: number) {
    return pairs.map((pair) => {
      return new Trade(
        new Route([pair], tokenA),
        new TokenAmount(
          pair.token1,
          JSBI.multiply(JSBI.BigInt(fiatAmount), JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(pair.token1.decimals))),
        ),
        TradeType.EXACT_OUTPUT,
      )
    })
  }

  getBestStablecoinTradeForToken = async (tokenA: Token, fiatAmount: number) => {
    const slippageTolerance = new Percent('50', '10000') // 50 bips, or 0.50%

    const allPairs = await this.getStablecoinPairsForToken(tokenA)
    const trades = this.getTrades(allPairs, tokenA, fiatAmount)

    const tradesWithArgs = trades.map((trade) => {
      const amountInMax = trade.maximumAmountIn(slippageTolerance).raw.toString()
      const amountOut = trade.outputAmount.raw.toString()
      const path = trade.route.path.map((t) => t.address)
      return {
        trade,
        amountInMax,
        amountOut,
        path,
      }
    })

    const bestTrade = tradesWithArgs.sort((a, b) => (a.amountInMax > b.amountInMax ? 1 : -1))[0]

    return bestTrade
  }
}
