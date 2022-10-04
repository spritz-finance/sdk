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

export const ACCEPTED_PAYMENT_TOKENS: Record<SupportedNetwork, TokenData[]> = {
  [Network.Polygon]: [USDC_POLYGON, USDT_POLYGON, DAI_POLYGON],
  [Network.Binance]: [BUSD_BSC, USDT_BSC, USDC_BSC],
  [Network.Ethereum]: [USDC_MAINNET, USDT_MAINNET, DAI_MAINNET, BUSD_MAINNET],
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
}

export const isAcceptedPaymentToken = (tokenAddress: string, network: SupportedNetwork) => {
  const addresses = ACCEPTED_PAYMENT_TOKENS[network].map((token) => token.address.toLowerCase())
  return addresses.includes(tokenAddress.toLowerCase())
}
