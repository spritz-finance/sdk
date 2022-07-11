import { ethers } from 'ethers'
import { SupportedChainId } from '../constants'
import { validateChain } from '../utils/supportedChains'

type SpritzClientParams = {
  chainId: SupportedChainId
  rpcUrl: string
}

export class SpritzClient {
  private provider: ethers.providers.JsonRpcProvider

  constructor({ chainId, rpcUrl }: SpritzClientParams) {
    validateChain(chainId)
    this.provider = new ethers.providers.JsonRpcProvider(rpcUrl)
  }
}
