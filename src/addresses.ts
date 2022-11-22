import { Network, SupportedNetwork } from './networks'

// Polygon
export const SPRITZPAY_STAGING_POLYGON_ADDRESS = '0xa40a3E8aeA2Fb9C38efE4d9F71F8d58175e0b6B3'
export const SPRITZPAY_POLYGON_ADDRESS = '0x0AC79b8711A92340e55ACf6ACceC03df6e181171'

// ETH Mainnet
export const SPRITZPAY_STAGING_MAINNET_ADDRESS = '0xbF7Abc15f00a8C2d6b13A952c58d12b7c194A8D0'
export const SPRITZPAY_MAINNET_ADDRESS = '0x0fe08D911246566fdFD4afE0181a21ab810EE1C2'

// BNB Chain
export const SPRITZPAY_STAGING_BSC_ADDRESS = '0x1bf8A11830447733943a17D639e3a15534e33F4c'
export const SPRITZPAY_BSC_ADDRESS = '0x77eEb345cd1763B077E67732c50EeFFB918BdF77'

// Optimism
export const SPRITZPAY_OPTIMISM_ADDRESS = '0x0'
export const SPRITZPAY_STAGING_OPTIMISM_ADDRESS = '0x0'

// Arbitrum
export const SPRITZPAY_ARBITRUM_ADDRESS = '0x0'
export const SPRITZPAY_STAGING_ARBITRUM_ADDRESS = '0x0'

const SPRITZ_PAY_CONTRACT_STAGING_ADDRESS: Record<SupportedNetwork, string> = {
  [Network.Polygon]: SPRITZPAY_STAGING_POLYGON_ADDRESS,
  [Network.Binance]: SPRITZPAY_STAGING_BSC_ADDRESS,
  [Network.Ethereum]: SPRITZPAY_STAGING_MAINNET_ADDRESS,
  [Network.Arbitrum]: SPRITZPAY_STAGING_ARBITRUM_ADDRESS,
  [Network.Optimism]: SPRITZPAY_STAGING_OPTIMISM_ADDRESS,
}

const SPRITZ_PAY_CONTRACT_ADDRESS: Record<SupportedNetwork, string> = {
  [Network.Polygon]: SPRITZPAY_POLYGON_ADDRESS,
  [Network.Binance]: SPRITZPAY_BSC_ADDRESS,
  [Network.Ethereum]: SPRITZPAY_MAINNET_ADDRESS,
  [Network.Optimism]: SPRITZPAY_ARBITRUM_ADDRESS,
  [Network.Arbitrum]: SPRITZPAY_OPTIMISM_ADDRESS,
}

export const getContractAddress = (network: SupportedNetwork, staging = false) => {
  return staging ? SPRITZ_PAY_CONTRACT_STAGING_ADDRESS[network] : SPRITZ_PAY_CONTRACT_ADDRESS[network]
}
