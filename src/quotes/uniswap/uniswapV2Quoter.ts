import { Fetcher, Pair, Percent, Route, Token, TokenAmount, Trade, TradeType } from './uniswap-v2-sdk'
import { ACCEPTED_SWAP_OUTPUTS, isNonPaymentStablecoin } from '../../supportedTokens'
import { Network, NETWORK_TO_CHAIN_ID, SupportedNetwork } from '../../networks'
import { BigNumber, ethers } from 'ethers'
import { getFullToken, isNativeAddress, toV2Token } from '../../tokens'
import { SpritzPayV2 } from '../../contracts/types'
import { formatPaymentReference } from '../../utils/reference'

export type PayWithV2SwapArgsResult = {
  args: Parameters<SpritzPayV2['functions']['payWithSwap']>
  data: { path: string[]; trade: Trade; amountOut: string; amountInMax: string }
  additionalHops: number
  requiredTokenInput: BigNumber
}

const slippageTolerance = new Percent('50', '10000') // 50 bips, or 0.50%
const slippageToleranceOnePercent = new Percent('100', '10000') // 100 bips, or 1%
const slippageToleranceStablecoin = new Percent('25', '10000') // 25 bips, or 0.25%

export class UniswapV2Quoter {
  public slippage: Percent = slippageTolerance

  constructor(public network: SupportedNetwork, public provider: ethers.providers.BaseProvider) {
    if (network === Network.Binance) {
      this.slippage = slippageToleranceOnePercent
    }
  }

  async getPayWithSwapArgs(
    tokenAddress: string,
    fiatAmount: string | number,
    reference: string,
    currentTime = Math.floor(Date.now() / 1000),
  ): Promise<PayWithV2SwapArgsResult> {
    if (isNonPaymentStablecoin(tokenAddress, this.network)) {
      this.slippage = slippageToleranceStablecoin
    }

    const isNativeSwap = isNativeAddress(tokenAddress)

    const token = await getFullToken(tokenAddress, this.network, this.provider)

    const data = await this.getBestStablecoinTradeForToken(toV2Token(token), fiatAmount)

    const args: Parameters<SpritzPayV2['functions']['payWithSwap']> = [
      data.path,
      data.amountInMax,
      data.amountOut,
      formatPaymentReference(reference),
      currentTime + 1800, // +30 minutes
    ]

    if (isNativeSwap) {
      args.push({
        value: args[1],
      })
    }

    const additionalHops = data.path.length > 2 ? data.path.length - 2 : 0

    return {
      args,
      data,
      additionalHops,
      requiredTokenInput: BigNumber.from(data.amountInMax),
    }
  }

  async getPairData(tokenA: Token, tokenB: Token) {
    try {
      const data = await Fetcher.fetchPairData(tokenA, tokenB, this.provider)
      return data
    } catch (err) {
      console.warn('Could not fetch pair data')
      return null
    }
  }

  async getStablecoinPairsForToken(tokenA: Token): Promise<Pair[]> {
    const acceptedTokens = ACCEPTED_SWAP_OUTPUTS[this.network].map(
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

  getBestStablecoinTradeForToken = async (tokenA: Token, fiatAmount: number | string) => {
    //get accepted stablecoins
    const stablecoins = ACCEPTED_SWAP_OUTPUTS[this.network].map(
      (t) => new Token(NETWORK_TO_CHAIN_ID[this.network], t.address, t.decimals, t.symbol, t.symbol),
    )

    //find the best source token to stablecoin swap for each one
    const trades: Trade[] = await Promise.all(
      stablecoins.map((stable) => this.getBestTradeForPath(tokenA, stable, fiatAmount)),
    ).then((trades) => trades.filter(Boolean))

    if (!trades.length) {
      throw new Error('Could not find trade')
    }

    //Compare all the stablecoin trades, and pick the best one
    const tradesWithArgs = trades.map((trade) => {
      const amountInMax = trade.maximumAmountIn(this.slippage).raw.toString()
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
