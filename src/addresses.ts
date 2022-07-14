import { Network, SupportedNetwork } from './networks'

export const SPRITZ_PAYMENT_WALLET_POLYGON = '0xC812d763b1b17F7ceF189F50A0a8C2d9419852E3'
export const SPRITZ_PAYMENT_CONTRACT = '0xc05671899Ed4551ECE53428061869C9940B8Af2e'

const PAYMENT_WALLET_ADDRESS: Record<SupportedNetwork, string> = {
  [Network.Polygon]: SPRITZ_PAYMENT_WALLET_POLYGON,
}

const SPRITZ_PAY_CONTRACT_ADDRESS: Record<SupportedNetwork, string> = {
  [Network.Polygon]: SPRITZ_PAYMENT_CONTRACT,
}

export const getPaymentWalletAddress = (network: SupportedNetwork) => {
  return PAYMENT_WALLET_ADDRESS[network]
}

export const getContractAddress = (network: SupportedNetwork) => {
  return SPRITZ_PAY_CONTRACT_ADDRESS[network]
}
