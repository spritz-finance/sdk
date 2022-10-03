import { Contract } from '@ethersproject/contracts'
import { getNetwork } from '@ethersproject/networks'
import { getDefaultProvider } from '@ethersproject/providers'
import { Pair, Token, TokenAmount } from './entities'
import IUniswapV2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import invariant from 'tiny-invariant'
import { ContractCallContext, Multicall } from 'ethereum-multicall'

import { ChainId } from './constants'
import { ERC20_ABI } from '../../../contracts/abi'
import { BASE_TOKENS } from '../../../supportedTokens'

let TOKEN_DECIMALS_CACHE: { [chainId: number]: { [address: string]: number } } = {
  [ChainId.MAINNET]: {
    '0xE0B7927c4aF23765Cb51314A0E0521A9645F0E2A': 9, // DGD
  },
}

/**
 * Contains methods for constructing instances of pairs and tokens from on-chain data.
 */
export abstract class Fetcher {
  /**
   * Cannot be constructed.
   */
  private constructor() {}

  /**
   * Fetch information for a given token on the given chain, using the given ethers provider.
   * @param chainId chain of the token
   * @param address address of the token on the chain
   * @param provider provider used to fetch the token
   * @param symbol optional symbol of the token
   * @param name optional name of the token
   */
  public static async fetchTokenData(
    chainId: ChainId,
    address: string,
    provider = getDefaultProvider(getNetwork(chainId)),
    symbol?: string,
    name?: string,
  ): Promise<Token> {
    const parsedDecimals =
      typeof TOKEN_DECIMALS_CACHE?.[chainId]?.[address] === 'number'
        ? TOKEN_DECIMALS_CACHE[chainId][address]
        : await new Contract(address, ERC20_ABI, provider).decimals().then((decimals: number): number => {
            TOKEN_DECIMALS_CACHE = {
              ...TOKEN_DECIMALS_CACHE,
              [chainId]: {
                ...TOKEN_DECIMALS_CACHE?.[chainId],
                [address]: decimals,
              },
            }
            return decimals
          })
    return new Token(chainId, address, parsedDecimals, symbol, name)
  }

  /**
   * Fetches information about a pair and constructs a pair from the given two tokens.
   * @param tokenA first token
   * @param tokenB second token
   * @param provider the provider to use to fetch the data
   */
  public static async fetchPairData(
    tokenA: Token,
    tokenB: Token,
    provider = getDefaultProvider(getNetwork(tokenA.chainId)),
  ): Promise<Pair> {
    invariant(tokenA.chainId === tokenB.chainId, 'CHAIN_ID')
    const address = Pair.getAddress(tokenA, tokenB)

    console.log(`getReserves ${tokenA.symbol} ${tokenB.symbol}`)
    const [reserves0, reserves1] = await new Contract(address, IUniswapV2Pair.abi, provider).getReserves()
    const balances = tokenA.sortsBefore(tokenB) ? [reserves0, reserves1] : [reserves1, reserves0]
    const pair = new Pair(new TokenAmount(tokenA, balances[0]), new TokenAmount(tokenB, balances[1]))

    return pair
  }

  public static async getAllPairsWithData(pairs: Token[][], provider: any): Promise<Pair[]> {
    const multicall = new Multicall({ ethersProvider: provider, tryAggregate: true })

    const tokenLookup: Record<string, Token> = {}
    pairs.forEach(([t0, t1]) => {
      tokenLookup[t0.address] = t0
      tokenLookup[t1.address] = t1
    })

    const contractCallContext: ContractCallContext[] = pairs.map(([tokenA, tokenB]) => {
      const reference = tokenA.address + '_' + tokenB.address
      return {
        reference,
        contractAddress: Pair.getAddress(tokenA, tokenB),
        abi: IUniswapV2Pair.abi,
        calls: [{ reference, methodName: 'getReserves', methodParameters: [] }],
      }
    })

    const { results } = await multicall.call(contractCallContext)
    const values = Object.values(results)
      .map((c) => c.callsReturnContext[0])
      .filter((r) => r.success)
      .map((r) => {
        const addresses = r.reference.split('_')
        return {
          reference: r.reference,
          reserves: [r.returnValues[0].hex, r.returnValues[1].hex],
          tokens: [tokenLookup[addresses[0]], tokenLookup[addresses[1]]],
        }
      })

    const pairsWithData = values.map((v) => {
      const balances = v.tokens[0].sortsBefore(v.tokens[1])
        ? [v.reserves[0], v.reserves[1]]
        : [v.reserves[1], v.reserves[0]]

      return new Pair(new TokenAmount(v.tokens[0], balances[0]), new TokenAmount(v.tokens[1], balances[1]))
    })

    return pairsWithData
  }

  public static getAllPairCombinations(tokenA: Token, tokenB: Token): Token[][] {
    const baseTokens = BASE_TOKENS[tokenA.chainId]!

    const BASE_PAIRS = baseTokens
      .map((token) => baseTokens.map((base) => [token, base]))
      .flatMap((x) => x)
      .filter(([t1, t2]) => t1.address !== t2.address)

    const uniquePairMap = [
      // the direct pair
      [tokenA, tokenB],
      // token A against all bases
      ...baseTokens.map((base): [Token, Token] => [tokenA, base]),
      // token B against all bases
      ...baseTokens.map((base): [Token, Token] => [tokenB, base]),
      // each base against all bases
      ...BASE_PAIRS,
    ]
      .filter((tokens): tokens is [Token, Token] => Boolean(tokens[0] && tokens[1]))
      .filter(([t0, t1]) => t0.address !== t1.address)
      .map(([t0, t1]) => (t0.symbol! < t1.symbol! ? [t0, t1] : [t1, t0]))
      .reduce((acc, val) => {
        const key = val[0].address + val[1].address
        acc[key] = val
        return acc
      }, {} as Record<string, Token[]>)

    return Object.values(uniquePairMap)
  }
}

// export const trade = (pairs: (Pair | undefined)[], input: Token, out: Token, amount: number) => {
//   const bestTrade = Trade.bestTradeExactOut(
//     pairs.filter(Boolean) as Pair[],
//     input,
//     new TokenAmount(out, ethers.utils.parseUnits(amount.toString(), out.decimals).toString()),
//     { maxNumResults: 3, maxHops: 1 },
//   )
//   //   console.log(bestTrade[0]);
//   console.log(bestTrade[0].outputAmount)
//   console.log(bestTrade[0].maximumAmountIn)
//   console.log(bestTrade[0].inputAmount)
// }
