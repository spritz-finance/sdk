import { Network, SupportedNetwork } from './networks'

export const SPRITZ_PAYMENT_WALLET_POLYGON = '0xC812d763b1b17F7ceF189F50A0a8C2d9419852E3'
export const SPRITZ_PAYMENT_CONTRACT_POLYGON = '0xc05671899Ed4551ECE53428061869C9940B8Af2e'
export const SPRITZ_PAYMENT_CONTRACT_STAGING_POLYGON = '0xaf329BFAec75b85d12Da2bc4Fc4B7fF27A0807d3'

const PAYMENT_WALLET_ADDRESS: Record<SupportedNetwork, string> = {
  [Network.Polygon]: SPRITZ_PAYMENT_WALLET_POLYGON,
}

const SPRITZ_PAY_CONTRACT_STAGING_ADDRESS: Record<SupportedNetwork, string> = {
  [Network.Polygon]: SPRITZ_PAYMENT_CONTRACT_STAGING_POLYGON,
}

const SPRITZ_PAY_CONTRACT_ADDRESS: Record<SupportedNetwork, string> = {
  [Network.Polygon]: SPRITZ_PAYMENT_CONTRACT_POLYGON,
}

export const getPaymentWalletAddress = (network: SupportedNetwork) => {
  return PAYMENT_WALLET_ADDRESS[network]
}

export const getContractAddress = (network: SupportedNetwork, staging = false) => {
  return staging ? SPRITZ_PAY_CONTRACT_STAGING_ADDRESS[network] : SPRITZ_PAY_CONTRACT_ADDRESS[network]
}
