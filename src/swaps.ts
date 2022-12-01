import { Network } from './networks'

// const V3_SWAP_NETWORKS = [Network.Ethereum, Network.Arbitrum, Network.Optimism]
const V3_SWAP_NETWORKS = [Network.Arbitrum, Network.Optimism]

export const isV3SwapNetwork = (network: Network) => V3_SWAP_NETWORKS.includes(network)
