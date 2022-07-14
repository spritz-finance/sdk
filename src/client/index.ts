import { JsonRpcProvider } from '@ethersproject/providers'
import { Token } from '@uniswap/sdk-core'
import { SupportedNetwork, validateNetwork } from '../networks'
import { UniswapQuoter } from '../quotes/uniswap'
import { getPaymentToken, TokenData, toToken } from '../tokens'
import { FiatValue } from '../utils/format'

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

  public async getTokenPaymentQuote(inputTokenData: TokenData, fiatAmount: FiatValue) {
    const inputToken = toToken(inputTokenData, this.network)
    const quoter = new UniswapQuoter(this.outputToken, this.network, this.provider)
    return quoter.getTokenPaymentQuote(inputToken, fiatAmount)
  }

  public async getNativePaymentQuote(fiatAmount: FiatValue) {
    const quoter = new UniswapQuoter(this.outputToken, this.network, this.provider)
    return quoter.getNativePaymentQuote(fiatAmount)
  }
}
