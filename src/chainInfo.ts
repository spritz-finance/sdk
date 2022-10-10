import { getChainId, Network, SupportedNetwork } from './networks'

export type ChainInfo = {
  /**
   * The ID of the chain. Every chain has a unique chainId.
   */
  chainId: number
  /**
   * The URL of the network's block explorer, used for adding the network to Metamask
   */
  blockExplorerUrl: string
  /**
   * The name of the network
   */
  name: string
  /**
   * The network's currency, used for adding the network to Metamask
   */
  nativeCurrency?: {
    name: string
    symbol: string
    decimals: number
  }
  /**
   * A function to construct a link to a blockchain explorer, based on an ethereum address.
   */
  getExplorerAddressLink: (address: string) => string
  /**
   * A function to construct a link to a blockchain explorer, based on a transaction hash.
   */
  getExplorerTransactionLink: (address: string) => string
}

const CHAIN_INFO: Record<SupportedNetwork, ChainInfo> = {
  [Network.Ethereum]: {
    chainId: getChainId(Network.Ethereum),
    blockExplorerUrl: 'https://etherscan.io/',
    name: 'Ethereum',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    getExplorerAddressLink: (address: string) => `https://etherscan.io/address/${address}`,
    getExplorerTransactionLink: (tx: string) => `https://etherscan.io/tx/${tx}`,
  },
  [Network.Polygon]: {
    chainId: getChainId(Network.Polygon),
    blockExplorerUrl: 'https://polygonscan.com/',
    name: 'Polygon',
    nativeCurrency: { name: 'Polygon Matic', symbol: 'MATIC', decimals: 18 },
    getExplorerAddressLink: (address: string) => `https://polygonscan.com/address/${address}`,
    getExplorerTransactionLink: (tx: string) => `https://polygonscan.com/tx/${tx}`,
  },

  [Network.Binance]: {
    chainId: getChainId(Network.Binance),
    blockExplorerUrl: 'https://bscscan.com/',
    name: 'Binance Smart Chain',
    nativeCurrency: { name: 'Binance Coin', symbol: 'BNB', decimals: 18 },
    getExplorerAddressLink: (address: string) => `https://bscscan.com/address/${address}`,
    getExplorerTransactionLink: (tx: string) => `https://bscscan.com/tx/${tx}`,
  },
}

export function getChainInfo(network: SupportedNetwork): ChainInfo | undefined {
  return CHAIN_INFO[network] ?? undefined
}
