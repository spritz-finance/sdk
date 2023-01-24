import { Network, SupportedNetwork } from './networks'
import { TokenData } from './tokens'
import { ChainId, Token } from './quotes/uniswap/uniswap-v2-sdk'

export const NATIVE_ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const NATIVE_ADDRESS_OTHER = '0x0000000000000000000000000000000000001010' //wat

export const USDT_POLYGON = { address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', decimals: 6, symbol: 'USDT' }
export const USDC_POLYGON = { address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', decimals: 6, symbol: 'USDC' }
export const DAI_POLYGON = { address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', decimals: 18, symbol: 'DAI' }

export const BUSD_BSC = { address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', decimals: 18, symbol: 'BUSD' }
export const USDT_BSC = { address: '0x55d398326f99059fF775485246999027B3197955', decimals: 18, symbol: 'USDT' }
export const USDC_BSC = { address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', decimals: 18, symbol: 'USDC' }

export const USDC_MAINNET = { address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', decimals: 6, symbol: 'USDC' }
export const USDT_MAINNET = { address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', decimals: 6, symbol: 'USDT' }
export const DAI_MAINNET = { address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', decimals: 18, symbol: 'DAI' }
export const BUSD_MAINNET = { address: '0x4Fabb145d64652a948d72533023f6E7A623C7C53', decimals: 18, symbol: 'BUSD' }

export const USDC_ARBITRUM = { address: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8', decimals: 6, symbol: 'USDC' }
export const USDT_ARBITRUM = { address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9', decimals: 6, symbol: 'USDT' }
export const DAI_ARBITRUM = { address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1', decimals: 18, symbol: 'DAI' }

export const USDC_AVALANCHE = { address: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E', decimals: 6, symbol: 'USDC' }
export const USDT_AVALANCHE = { address: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118', decimals: 6, symbol: 'USDT' }

export const USDC_OPTIMISM = { address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607', decimals: 6, symbol: 'USDC' }
export const USDT_OPTIMISM = { address: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58', decimals: 6, symbol: 'USDT' }
export const DAI_OPTIMISM = { address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1', decimals: 18, symbol: 'DAI' }

export const ACCEPTED_PAYMENT_TOKENS: Record<SupportedNetwork, TokenData[]> = {
  [Network.Polygon]: [USDC_POLYGON],
  [Network.Binance]: [USDC_BSC],
  [Network.Ethereum]: [USDC_MAINNET],
  [Network.Arbitrum]: [USDC_ARBITRUM],
  [Network.Optimism]: [USDC_OPTIMISM],
  [Network.Avalanche]: [USDC_AVALANCHE],
}

export const ACCEPTED_SWAP_OUTPUTS: Record<SupportedNetwork, TokenData[]> = {
  [Network.Polygon]: [USDC_POLYGON],
  [Network.Binance]: [USDC_BSC],
  [Network.Ethereum]: [USDC_MAINNET],
  [Network.Arbitrum]: [USDC_ARBITRUM],
  [Network.Optimism]: [USDC_OPTIMISM],
  [Network.Avalanche]: [USDC_AVALANCHE],
}

// for determining a lower slippage threshold in USDC swap
export const NON_PAYMENT_STABLECOINS: Record<SupportedNetwork, TokenData[]> = {
  [Network.Polygon]: [USDT_POLYGON, DAI_POLYGON],
  [Network.Binance]: [BUSD_BSC, USDT_BSC],
  [Network.Ethereum]: [USDT_MAINNET, DAI_MAINNET, BUSD_MAINNET],
  [Network.Arbitrum]: [USDT_ARBITRUM, DAI_ARBITRUM],
  [Network.Optimism]: [USDT_OPTIMISM, DAI_OPTIMISM],
  [Network.Avalanche]: [USDT_AVALANCHE],
}

export const BASE_TOKENS: { [chainId: number]: Token[] } = {
  [ChainId.POLYGON]: [
    new Token(ChainId.POLYGON, '0xC6d54D2f624bc83815b49d9c2203b1330B841cA0', 18, 'SAND', 'The Sandbox'),
    new Token(ChainId.POLYGON, '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', 6, 'USDC', 'USD//C'),
    new Token(ChainId.POLYGON, '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', 6, 'USDT', 'Tether USD'),
    new Token(ChainId.POLYGON, '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', 18, 'WMATIC', 'Wrapped MATIC'),
    new Token(ChainId.POLYGON, '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', 18, 'WETH', 'Wrapped ETHER'),
    new Token(ChainId.POLYGON, '0x831753DD7087CaC61aB5644b308642cc1c33Dc13', 18, 'QUICK', 'Quickswap'),
    new Token(ChainId.POLYGON, '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', 18, 'DAI', 'Dai Stablecoin'),
  ],
  [ChainId.BINANCE]: [
    new Token(ChainId.BINANCE, '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 18, 'BUSD', 'BUSD Token'),
    new Token(ChainId.BINANCE, '0x55d398326f99059fF775485246999027B3197955', 18, 'USDT', 'Tether USD'),
    new Token(ChainId.BINANCE, '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', 18, 'USDC', 'USD Coin'),
    new Token(ChainId.BINANCE, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 18, 'WBNB', 'Wrapped BNB'),
    new Token(ChainId.BINANCE, '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3', 18, 'DAI', 'Dai Stablecoin'),
    new Token(ChainId.BINANCE, '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', 18, 'CAKE', 'PancakeSwap Token'),
    new Token(ChainId.BINANCE, '0x2170Ed0880ac9A755fd29B2688956BD959F933F8', 18, 'ETH', 'Ethereum Token'),
  ],
  [ChainId.MAINNET]: [
    new Token(ChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD Coin'),
    new Token(ChainId.MAINNET, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD'),
    new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin'),
    new Token(ChainId.MAINNET, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'WETH', 'Wrapped ETHER'),
    new Token(ChainId.MAINNET, '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', 8, 'WBTC', 'Wrapped Bitcoin'),
  ],
  [ChainId.AVALANCHE]: [
    new Token(ChainId.AVALANCHE, '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E', 6, 'USDC', 'USD Coin'),
    new Token(ChainId.AVALANCHE, '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', 18, 'WAVAX', 'Wrapped AVAX'),
    new Token(ChainId.AVALANCHE, '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664', 6, 'USDC.e', 'USDC.e'),
    new Token(ChainId.AVALANCHE, '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB', 18, 'WETH.e', 'Wrapped Ether'),
    new Token(ChainId.AVALANCHE, '0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd', 18, 'JOE', 'JoeToken'),
    new Token(ChainId.AVALANCHE, '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7', 6, 'USDT', 'TetherToken'),
  ],
}

export const isAcceptedPaymentToken = (tokenAddress: string, network: SupportedNetwork) => {
  const addresses = ACCEPTED_PAYMENT_TOKENS[network].map((token) => token.address.toLowerCase())
  return addresses.includes(tokenAddress.toLowerCase())
}

export const isNonPaymentStablecoin = (tokenAddress: string, network: SupportedNetwork) => {
  const addresses = NON_PAYMENT_STABLECOINS[network].map((token) => token.address.toLowerCase())
  return addresses.includes(tokenAddress.toLowerCase())
}
