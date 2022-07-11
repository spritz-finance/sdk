import { Token } from '@uniswap/sdk-core'
import { ethers } from 'ethers'
import { SupportedChainId } from '../constants'
import { UniswapQuoter } from '../quotes/uniswap'
import { getPaymentToken, TokenData, toToken } from '../tokens'
import { validateChain } from '../utils/supportedChains'

type SpritzClientParams = {
  chainId: SupportedChainId
  rpcUrl: string
  paymentTokenAddress?: string
}

export class SpritzClient {
  private chainId: SupportedChainId
  private provider: ethers.providers.JsonRpcProvider
  private outputToken: Token

  constructor({ chainId, rpcUrl, paymentTokenAddress }: SpritzClientParams) {
    validateChain(chainId)
    this.chainId = chainId
    this.outputToken = getPaymentToken(chainId, paymentTokenAddress)
    this.provider = new ethers.providers.JsonRpcProvider(rpcUrl)
  }

  public async getTokenPaymentQuote(inputTokenData: TokenData, paymentAmount: number) {
    const inputToken = toToken(inputTokenData, this.chainId)
    const quoter = new UniswapQuoter(this.outputToken, this.provider)
    return quoter.getPaymentQuote(inputToken, paymentAmount)
  }
}
