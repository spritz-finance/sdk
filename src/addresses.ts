import { Network, SupportedNetwork } from './networks'

export const SPRITZ_PAYMENT_CONTRACT_POLYGON = '0x0AC79b8711A92340e55ACf6ACceC03df6e181171'
export const SPRITZ_PAYMENT_CONTRACT_STAGING_POLYGON = '0xa40a3E8aeA2Fb9C38efE4d9F71F8d58175e0b6B3'
export const SPRITZ_PAYMENT_CONTRACT_BSC = '0x77eEb345cd1763B077E67732c50EeFFB918BdF77'
export const SPRITZ_PAYMENT_CONTRACT_STAGING_BSC = '0x1bf8A11830447733943a17D639e3a15534e33F4c'

const SPRITZ_PAY_CONTRACT_STAGING_ADDRESS: Record<SupportedNetwork, string> = {
  [Network.Polygon]: SPRITZ_PAYMENT_CONTRACT_STAGING_POLYGON,
  [Network.Binance]: SPRITZ_PAYMENT_CONTRACT_STAGING_BSC,
}

const SPRITZ_PAY_CONTRACT_ADDRESS: Record<SupportedNetwork, string> = {
  [Network.Polygon]: SPRITZ_PAYMENT_CONTRACT_POLYGON,
  [Network.Binance]: SPRITZ_PAYMENT_CONTRACT_BSC,
}

export const getContractAddress = (network: SupportedNetwork, staging = false) => {
  return staging ? SPRITZ_PAY_CONTRACT_STAGING_ADDRESS[network] : SPRITZ_PAY_CONTRACT_ADDRESS[network]
}
