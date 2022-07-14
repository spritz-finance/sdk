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

export const SUPPORTED_NETWORKS = [Network.Polygon] as const
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

export const NETWORK_TO_CHAIN_ID: Record<Network, number> = {
  [Network.Ethereum]: 1,
  [Network.Polygon]: 137,
  [Network.Optimism]: 10,
  [Network.Arbitrum]: 42161,
  [Network.Avalanche]: 43114,
  [Network.Binance]: 56,
  [Network.Gnosis]: 100,
  [Network.Fantom]: 250,
  [Network.Celo]: 42220,
  [Network.Harmony]: 1666600000,
  [Network.Moonriver]: 1285,
}

export const CHAIN_ID_TO_NETWORK = invert<Network, number>(NETWORK_TO_CHAIN_ID)
