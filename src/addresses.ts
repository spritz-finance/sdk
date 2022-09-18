import { Network, SupportedNetwork } from './networks'

export const SPRITZ_PAYMENT_CONTRACT_POLYGON = '0xc05671899Ed4551ECE53428061869C9940B8Af2e'
export const SPRITZ_PAYMENT_CONTRACT_STAGING_POLYGON = '0x7094ef23A5fE55DaCee6Ee844A83FeE606d49445'
export const SPRITZ_PAYMENT_CONTRACT_STAGING_OPTIMISM = '0xBe968Aca610Ad1FcEEf466151aC77eD9296b17E8'

const SPRITZ_PAY_CONTRACT_STAGING_ADDRESS: Record<SupportedNetwork, string> = {
  [Network.Polygon]: SPRITZ_PAYMENT_CONTRACT_STAGING_POLYGON,
  [Network.Optimism]: SPRITZ_PAYMENT_CONTRACT_STAGING_OPTIMISM,
}

const SPRITZ_PAY_CONTRACT_ADDRESS: Record<SupportedNetwork, string> = {
  [Network.Polygon]: SPRITZ_PAYMENT_CONTRACT_POLYGON,
  [Network.Optimism]: SPRITZ_PAYMENT_CONTRACT_STAGING_OPTIMISM,
}

export const getContractAddress = (network: SupportedNetwork, staging = false) => {
  return staging ? SPRITZ_PAY_CONTRACT_STAGING_ADDRESS[network] : SPRITZ_PAY_CONTRACT_ADDRESS[network]
}
