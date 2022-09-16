import { Fetcher, Pair, Percent, Route, Token, TokenAmount, Trade, TradeType } from './uniswap-v2-sdk'
import { ACCEPTED_PAYMENT_TOKENS } from '../../supportedTokens'
import { NETWORK_TO_CHAIN_ID, SupportedNetwork } from '../../networks'
import { ethers } from 'ethers'
import { getFullToken, isNativeAddress } from '../../tokens'

const slippageTolerance = new Percent('50', '10000') // 50 bips, or 0.50%

export class UniswapV2Quoter {
  constructor(public network: SupportedNetwork, public provider: ethers.providers.BaseProvider) {}

  async getPayWithSwapArgs(tokenAddress: string, fiatAmount: string | number, reference: string) {
    const native = isNativeAddress(tokenAddress)
    console.log('getPayWithSwapArgs', { tokenAddress, fiatAmount })
    const token = await getFullToken(tokenAddress, this.provider)
    //@ts-ignore
    const trade = await this.getBestStablecoinTradeForToken2(token, fiatAmount)
    return trade
    // const args: Parameters<SpritzPay_V1['functions']['payWithSwap']> = [
    //   trade.path[0],
    //   trade.amountInMax,
    //   trade.path[1],
    //   trade.amountOut,
    //   formatPaymentReference(reference),
    //   Math.round(Date.now() / 1000) + 120,
    // ]
    // if (native) {
    //   args.push({
    //     value: args[1],
    //   })
    // }
    // return args
  }

  async getPairData(tokenA: Token, tokenB: Token) {
    try {
      const data = await Fetcher.fetchPairData(tokenA, tokenB, this.provider, {})
      return data
    } catch (err) {
      console.warn('Could not fetch pair data')
      return null
    }
  }

  async getStablecoinPairsForToken(tokenA: Token): Promise<Pair[]> {
    const acceptedTokens = ACCEPTED_PAYMENT_TOKENS[this.network].map(
      (t) => new Token(NETWORK_TO_CHAIN_ID[this.network], t.address, t.decimals, t.symbol, t.symbol),
    )
    const pairs = await Promise.all(acceptedTokens.map((tokenB) => this.getPairData(tokenA, tokenB)))

    return pairs.filter(Boolean) as Pair[]
  }

  getTrades(pairs: Pair[], tokenA: Token, fiatAmount: string | number) {
    return pairs
      .map((pair) => {
        try {
          const dec = pair.token1.decimals
          const amt = Number(fiatAmount) * 10 ** dec
          return new Trade(
            new Route([pair], tokenA),
            new TokenAmount(pair.token1, amt.toString()),
            TradeType.EXACT_OUTPUT,
          )
        } catch (err) {
          console.warn(`Could not construct trade`, err)
          return null
        }
      })
      .filter(Boolean) as Trade[]
  }

  getBestStablecoinTradeForToken = async (tokenA: Token, fiatAmount: number | string) => {
    const allPairs = await this.getStablecoinPairsForToken(tokenA)

    const trades = this.getTrades(allPairs, tokenA, fiatAmount)

    if (!trades.length) {
      throw new Error('Could not find trade')
    }

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

    console.log(`Best trade found: ${bestTrade.trade.route.path[0].symbol} -> ${bestTrade.trade.route.path[1].symbol}`)

    return bestTrade
  }

  async getBestTradeForPath(tokenA: Token, tokenB: Token, fiatAmount: number | string) {
    const tokenCombos = Fetcher.getAllPairCombinations(tokenA, tokenB)

    const pairs = await Fetcher.getAllPairsWithData(tokenCombos, this.provider)

    const [bestTrade] = Trade.bestTradeExactOut(
      pairs.filter(Boolean) as Pair[],
      tokenA,
      new TokenAmount(tokenB, ethers.utils.parseUnits(fiatAmount.toString(), tokenB.decimals).toString()),
      { maxNumResults: 1, maxHops: 2 },
    )

    return bestTrade
  }

  getBestStablecoinTradeForToken2 = async (tokenA: Token, fiatAmount: number | string) => {
    const stablecoins = ACCEPTED_PAYMENT_TOKENS[this.network].map(
      (t) => new Token(NETWORK_TO_CHAIN_ID[this.network], t.address, t.decimals, t.symbol, t.symbol),
    )

    const trades: Trade[] = await Promise.all(
      stablecoins.map((stable) => this.getBestTradeForPath(tokenA, stable, fiatAmount)),
    ).then((trades) => trades.filter(Boolean))

    if (!trades.length) {
      throw new Error('Could not find trade')
    }

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

    console.log(
      `Best trade found: ${bestTrade.trade.route.path.map((t) => t.symbol).join('->')} for input ${
        bestTrade.amountInMax
      }`,
    )

    return bestTrade
  }
}
