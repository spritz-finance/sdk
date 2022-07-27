import { Token } from '@uniswap/sdk-core'
import { ethers } from 'ethers'
import { SupportedNetwork, validateNetwork } from '../networks'
import { ZeroExQuoter } from '../quotes/0x'
import { UniswapQuoter } from '../quotes/uniswap'
import { getPaymentToken, TokenData, toToken } from '../tokens'
import { FiatValue } from '../utils/format'

type QuoterParams = {
  network: SupportedNetwork
  provider?: ethers.providers.JsonRpcProvider
  paymentTokenAddress?: string
}

export class Quoter {
  private network: SupportedNetwork
  private provider?: ethers.providers.JsonRpcProvider
  private outputToken: Token

  constructor({ network, provider, paymentTokenAddress }: QuoterParams) {
    const validNetwork = validateNetwork(network)
    this.network = validNetwork
    this.outputToken = getPaymentToken(validNetwork, paymentTokenAddress)
    this.provider = provider
  }

  public async getTokenPaymentQuote(inputTokenData: TokenData, paymentAmount: FiatValue) {
    if (!this.provider) throw new Error('getTokenPaymentQuote requires a provider')
    const inputToken = toToken(inputTokenData, this.network)
    const quoter = new UniswapQuoter(this.outputToken, this.network, this.provider)
    return quoter.getTokenPaymentQuote(inputToken, paymentAmount)
  }

  public async getNativePaymentQuote(paymentAmount: FiatValue) {
    if (!this.provider) throw new Error('getTokenPaymentQuote requires a provider')
    const quoter = new UniswapQuoter(this.outputToken, this.network, this.provider)
    return quoter.getNativePaymentQuote(paymentAmount)
  }

  // public async getAggregatedSwapQuote(inputTokenAddress: string, paymentAmount: FiatValue, reference: string) {
  //   const quoter = new ZeroExQuoter(this.outputToken, this.network)
  //   return quoter.getAggregatedSwapQuote(inputTokenAddress, paymentAmount, reference)
  // }
}
