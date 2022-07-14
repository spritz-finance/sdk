import { Token } from '@uniswap/sdk-core'
import { Network, NETWORK_TO_CHAIN_ID, SupportedNetwork } from './networks'
import { TokenData } from './tokens'

export const WMATIC_POLYGON = { address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', decimals: 18, symbol: 'WMATIC' }
export const WETH_MAINNET = { address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', decimals: 18, symbol: 'WETH' }
export const WETH_ARBITRUM = { address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', decimals: 18, symbol: 'WETH' }
export const WETH_OPTIMISM = { address: '0x4200000000000000000000000000000000000006', decimals: 18, symbol: 'WETH' }

const NETWORK_NATIVE_TOKEN: Record<SupportedNetwork, TokenData> = {
  [Network.Polygon]: WMATIC_POLYGON,
  //   [Network.Ethereum]: WETH_MAINNET,
  //   [Network.Arbitrum]: WETH_ARBITRUM,
  //   [Network.Optimism]: WETH_OPTIMISM,
}

export const getWrappedNativeToken = (network: SupportedNetwork) => {
  const token = NETWORK_NATIVE_TOKEN[network]
  return new Token(NETWORK_TO_CHAIN_ID[network], token.address, token.decimals, token.symbol)
}
