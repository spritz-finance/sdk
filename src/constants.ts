import { networks } from './chains'

export const SUPPORTED_CHAINS = [networks.polygon.chainId]
export type SupportedChainId = typeof SUPPORTED_CHAINS[number]

export const SPRITZ_PAYMENT_WALLET = '0xC812d763b1b17F7ceF189F50A0a8C2d9419852E3'
export const SPRITZ_PAYMENT_CONTRACT = '0xc05671899Ed4551ECE53428061869C9940B8Af2e'
