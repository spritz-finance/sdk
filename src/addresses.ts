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
export const SPRITZPAY_OPTIMISM_ADDRESS = '0xC7689fCceB570B0BD397C847491Bc645BFDd88a3'
export const SPRITZPAY_STAGING_OPTIMISM_ADDRESS = '0x4934d8dD3841CAfFf7A618aE650bFc682156Cf1B'

// Arbitrum
export const SPRITZPAY_ARBITRUM_ADDRESS = '0x3a01FCE88dae24A7B01620Db2F348aB1E50e2150'
export const SPRITZPAY_STAGING_ARBITRUM_ADDRESS = '0x841F6cdEd88EDb3fBe1320ef5637CCe1d32c6C1B'

// Avalanche
export const SPRITZPAY_AVALANCHE_ADDRESS = '0x1D26ebaf6AD7BAab6D94dD8d9841f960FAF2dEe2'
export const SPRITZPAY_STAGING_AVALANCHE_ADDRESS = '0x61cd72AeA6760573f08B7eE02a10a840E51C45DF'

// Base
export const SPRITZPAY_BASE_STAGING_ADDRESS = '0x9114080c6477a92Eae4792A3f0118a159247F896'
export const SPRITZPAY_BASE_ADDRESS = '0x652A545E3eBb5d1a81C7F03Fed19804f15AAbc3a'

const SPRITZ_PAY_CONTRACT_STAGING_ADDRESS: Record<SupportedNetwork, string> = {
  [Network.Polygon]: SPRITZPAY_STAGING_POLYGON_ADDRESS,
  [Network.Binance]: SPRITZPAY_STAGING_BSC_ADDRESS,
  [Network.Ethereum]: SPRITZPAY_STAGING_MAINNET_ADDRESS,
  [Network.Arbitrum]: SPRITZPAY_STAGING_ARBITRUM_ADDRESS,
  [Network.Optimism]: SPRITZPAY_STAGING_OPTIMISM_ADDRESS,
  [Network.Avalanche]: SPRITZPAY_STAGING_AVALANCHE_ADDRESS,
  // [Network.Base]: SPRITZPAY_BASE_STAGING_ADDRESS,
}

const SPRITZ_PAY_CONTRACT_ADDRESS: Record<SupportedNetwork, string> = {
  [Network.Polygon]: SPRITZPAY_POLYGON_ADDRESS,
  [Network.Binance]: SPRITZPAY_BSC_ADDRESS,
  [Network.Ethereum]: SPRITZPAY_MAINNET_ADDRESS,
  [Network.Optimism]: SPRITZPAY_OPTIMISM_ADDRESS,
  [Network.Arbitrum]: SPRITZPAY_ARBITRUM_ADDRESS,
  [Network.Avalanche]: SPRITZPAY_AVALANCHE_ADDRESS,
  // [Network.Base]: SPRITZPAY_BASE_ADDRESS,
}

export const getContractAddress = (network: SupportedNetwork, staging = false) => {
  return staging ? SPRITZ_PAY_CONTRACT_STAGING_ADDRESS[network] : SPRITZ_PAY_CONTRACT_ADDRESS[network]
}

/**
 * SMARTPAY
 */

// Polygon
export const SMARTPAY_STAGING_POLYGON_ADDRESS = '0xe4eb1e80aaf7bc8dc16c712561f1fe12dd896fac'
export const SMARTPAY_PRODUCTION_POLYGON_ADDRESS = '0x496ff741135284433742293bEBc41dD6fA1F0f0C'

const SMARTPAY_CONTRACT_STAGING_ADDRESS: Record<SupportedNetwork, string> = {
  [Network.Polygon]: SMARTPAY_STAGING_POLYGON_ADDRESS,
  [Network.Binance]: '',
  [Network.Ethereum]: '',
  [Network.Arbitrum]: '',
  [Network.Optimism]: '',
  [Network.Avalanche]: '',
}

const SMARTPAY_CONTRACT_PRODUCTION_ADDRESS: Record<SupportedNetwork, string> = {
  [Network.Polygon]: SMARTPAY_PRODUCTION_POLYGON_ADDRESS,
  [Network.Binance]: '',
  [Network.Ethereum]: '',
  [Network.Arbitrum]: '',
  [Network.Optimism]: '',
  [Network.Avalanche]: '',
}

export const getSmartPayContractAddress = (network: SupportedNetwork, staging = false) => {
  return staging ? SMARTPAY_CONTRACT_STAGING_ADDRESS[network] : SMARTPAY_CONTRACT_PRODUCTION_ADDRESS[network]
}
