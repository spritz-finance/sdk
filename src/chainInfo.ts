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
    name: 'BNB Chain',
    nativeCurrency: { name: 'Binance Coin', symbol: 'BNB', decimals: 18 },
    getExplorerAddressLink: (address: string) => `https://bscscan.com/address/${address}`,
    getExplorerTransactionLink: (tx: string) => `https://bscscan.com/tx/${tx}`,
  },
  [Network.Optimism]: {
    chainId: getChainId(Network.Optimism),
    blockExplorerUrl: 'https://optimistic.etherscan.io/',
    name: 'Optimism',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    getExplorerAddressLink: (address: string) => `https://optimistic.etherscan.io/address/${address}`,
    getExplorerTransactionLink: (tx: string) => `https://optimistic.etherscan.io/tx/${tx}`,
  },
  [Network.Arbitrum]: {
    chainId: getChainId(Network.Arbitrum),
    blockExplorerUrl: 'https://arbiscan.io/',
    name: 'Arbitrum One',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    getExplorerAddressLink: (address: string) => `https://arbiscan.io/address/${address}`,
    getExplorerTransactionLink: (tx: string) => `https://arbiscan.io/tx/${tx}`,
  },
  [Network.Avalanche]: {
    chainId: getChainId(Network.Avalanche),
    blockExplorerUrl: 'https://snowtrace.io/',
    name: 'Avalanche C-Chain',
    nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
    getExplorerAddressLink: (address: string) => `https://snowtrace.io/address/${address}`,
    getExplorerTransactionLink: (tx: string) => `https://snowtrace.io/tx/${tx}`,
  },
  // [Network.Base]: {
  //   chainId: getChainId(Network.Base),
  //   blockExplorerUrl: 'https://basescan.org/',
  //   name: 'Base',
  //   nativeCurrency: { name: 'Base', symbol: 'ETH', decimals: 18 },
  //   getExplorerAddressLink: (address: string) => `https://basescan.org/address/${address}`,
  //   getExplorerTransactionLink: (tx: string) => `https://basescan.org/tx/${tx}`,
  // },
}

export function getChainInfo(network: SupportedNetwork): ChainInfo {
  return CHAIN_INFO[network]
}
