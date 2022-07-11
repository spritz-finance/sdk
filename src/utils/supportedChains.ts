import { SupportedChainId, SUPPORTED_CHAINS } from '../constants'
import { UnsupportedChainError } from '../errors'

export const chainIsSupported = (chainId: number) => SUPPORTED_CHAINS.includes(chainId as SupportedChainId)

export const validateChain = (chainId: number) => {
  if (!chainIsSupported(chainId)) throw new UnsupportedChainError()
}
