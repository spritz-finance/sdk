import { Network, SupportedNetwork } from './networks'

export const SPRITZ_PAYMENT_WALLET_POLYGON = '0xC812d763b1b17F7ceF189F50A0a8C2d9419852E3'
export const SPRITZ_PAYMENT_CONTRACT_POLYGON = '0xc05671899Ed4551ECE53428061869C9940B8Af2e'
export const SPRITZ_PAYMENT_CONTRACT_STAGING_POLYGON = '0x3d87Fe94927Ae23d8b461774C70D25392384010a'

export const SPRITZ_PAYMENT_CONTRACT_STAGING_OPTIMISM = '0xBe968Aca610Ad1FcEEf466151aC77eD9296b17E8'

const PAYMENT_WALLET_ADDRESS: Record<SupportedNetwork, string> = {
  [Network.Polygon]: SPRITZ_PAYMENT_WALLET_POLYGON,
  [Network.Optimism]: SPRITZ_PAYMENT_WALLET_POLYGON,
}

const SPRITZ_PAY_CONTRACT_STAGING_ADDRESS: Record<SupportedNetwork, string> = {
  [Network.Polygon]: SPRITZ_PAYMENT_CONTRACT_STAGING_POLYGON,
  [Network.Optimism]: SPRITZ_PAYMENT_CONTRACT_STAGING_OPTIMISM,
}

const SPRITZ_PAY_CONTRACT_ADDRESS: Record<SupportedNetwork, string> = {
  [Network.Polygon]: SPRITZ_PAYMENT_CONTRACT_POLYGON,
  [Network.Optimism]: SPRITZ_PAYMENT_CONTRACT_STAGING_OPTIMISM,
}

export const getPaymentWalletAddress = (network: SupportedNetwork) => {
  return PAYMENT_WALLET_ADDRESS[network]
}

export const getContractAddress = (network: SupportedNetwork, staging = false) => {
  return staging ? SPRITZ_PAY_CONTRACT_STAGING_ADDRESS[network] : SPRITZ_PAY_CONTRACT_ADDRESS[network]
}
