import { JsonRpcProvider } from '@ethersproject/providers'
import { Token } from '@uniswap/sdk-core'
import { SupportedNetwork, validateNetwork } from '../networks'
import { UniswapQuoter } from '../quotes/uniswap'
import { getPaymentToken, TokenData, toToken } from '../tokens'

type QuoterParams = {
  network: SupportedNetwork
  rpcUrl: string
  paymentTokenAddress?: string
}

export class Quoter {
  private network: SupportedNetwork
  private provider: JsonRpcProvider
  private outputToken: Token

  constructor({ network, rpcUrl, paymentTokenAddress }: QuoterParams) {
    const validNetwork = validateNetwork(network)
    this.network = validNetwork
    this.outputToken = getPaymentToken(validNetwork, paymentTokenAddress)
    this.provider = new JsonRpcProvider(rpcUrl)
  }

  public async getTokenPaymentQuote(inputTokenData: TokenData, paymentAmount: number) {
    const inputToken = toToken(inputTokenData, this.network)
    const quoter = new UniswapQuoter(this.outputToken, this.network, this.provider)
    return quoter.getTokenPaymentQuote(inputToken, paymentAmount)
  }

  public async getNativePaymentQuote(paymentAmount: number) {
    const quoter = new UniswapQuoter(this.outputToken, this.network, this.provider)
    return quoter.getNativePaymentQuote(paymentAmount)
  }
}
