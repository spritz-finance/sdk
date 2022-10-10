import { UnsupportedNetworkError } from './errors'
import { invert } from './utils/object'

export enum Network {
  Ethereum = 'ethereum',
  Polygon = 'polygon',
  Optimism = 'optimism',
  Arbitrum = 'arbitrum',
  Gnosis = 'gnosis',
  Binance = 'binance-smart-chain',
  Fantom = 'fantom',
  Avalanche = 'avalanche',
  Celo = 'celo',
  Harmony = 'harmony',
  Moonriver = 'moonriver',
}

export const SUPPORTED_NETWORK_CHAIN_ID: Record<SupportedNetwork, number> = {
  [Network.Ethereum]: 1,
  [Network.Polygon]: 137,
  [Network.Binance]: 56,
}

export const NETWORK_TO_CHAIN_ID: Record<Network, number> = {
  ...SUPPORTED_NETWORK_CHAIN_ID,
  [Network.Optimism]: 10,
  [Network.Arbitrum]: 42161,
  [Network.Avalanche]: 43114,
  [Network.Gnosis]: 100,
  [Network.Fantom]: 250,
  [Network.Celo]: 42220,
  [Network.Harmony]: 1666600000,
  [Network.Moonriver]: 1285,
}

export const NETWORK_TO_CHAIN_ID_STRING: Record<Network, string> = {
  [Network.Ethereum]: '0x1',
  [Network.Polygon]: '0x89',
  [Network.Optimism]: '0xa',
  [Network.Arbitrum]: '0xa4b1',
  [Network.Avalanche]: '0xa86a',
  [Network.Binance]: '0x38',
  [Network.Gnosis]: '0x64',
  [Network.Fantom]: '0xfa',
  [Network.Celo]: 'a4ec',
  [Network.Harmony]: '0x63564c40',
  [Network.Moonriver]: '0x505',
}

export const SUPPORTED_NETWORKS = [Network.Polygon, Network.Binance, Network.Ethereum] as const
export const CHAIN_ID_TO_NETWORK = invert<Network, number>(NETWORK_TO_CHAIN_ID)

const SUPPORTED_CHAIN_IDS = SUPPORTED_NETWORKS.map((network) => NETWORK_TO_CHAIN_ID[network])
export type SupportedNetwork = typeof SUPPORTED_NETWORKS[number]

const isSupportedChainId = (chainId: number) => {
  return SUPPORTED_CHAIN_IDS.includes(chainId)
}

const isSupportedNetworkName = (chainId: string) => {
  return SUPPORTED_NETWORKS.includes(chainId as SupportedNetwork)
}

export const isSupportedNetwork = (network: SupportedNetwork | number) => {
  if (typeof network === 'number') return isSupportedChainId(network)
  return isSupportedNetworkName(network)
}

export const validateNetwork = (network: SupportedNetwork | string): SupportedNetwork => {
  if (!network) throw new UnsupportedNetworkError()
  if (!isSupportedNetwork(network as SupportedNetwork)) throw new UnsupportedNetworkError()
  return network as SupportedNetwork
}

export const getChainId = (network: Network) => {
  return NETWORK_TO_CHAIN_ID[network]
}

export const getNetwork = (chainId: number) => {
  return CHAIN_ID_TO_NETWORK[chainId] ?? null
}

export const chainIdHexString = (network: Network) => {
  return NETWORK_TO_CHAIN_ID_STRING[network]
}
