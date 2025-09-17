import { Network, SupportedNetwork } from './networks'
import { TokenData } from './tokens'

export const NATIVE_ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const NATIVE_ADDRESS_OTHER = '0x0000000000000000000000000000000000001010' //wat

export const USDT_POLYGON = { address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', decimals: 6, symbol: 'USDT' }
export const USDC_POLYGON = { address: '0x3c499c542cef5e3811e1192ce70d8cc03d5c3359', decimals: 6, symbol: 'USDC' }
export const USDC_BRIDGED_POLYGON = {
  address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
  decimals: 6,
  symbol: 'USDC',
}
export const DAI_POLYGON = { address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', decimals: 18, symbol: 'DAI' }

export const BUSD_BSC = { address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', decimals: 18, symbol: 'BUSD' }
export const USDT_BSC = { address: '0x55d398326f99059fF775485246999027B3197955', decimals: 18, symbol: 'USDT' }
export const USDC_BSC = { address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', decimals: 18, symbol: 'USDC' }

export const USDC_MAINNET = { address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', decimals: 6, symbol: 'USDC' }
export const USDT_MAINNET = { address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', decimals: 6, symbol: 'USDT' }
export const DAI_MAINNET = { address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', decimals: 18, symbol: 'DAI' }
export const BUSD_MAINNET = { address: '0x4Fabb145d64652a948d72533023f6E7A623C7C53', decimals: 18, symbol: 'BUSD' }

export const USDC_ARBITRUM = { address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831', decimals: 6, symbol: 'USDC' }
export const USDT_ARBITRUM = { address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9', decimals: 6, symbol: 'USDT' }
export const DAI_ARBITRUM = { address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1', decimals: 18, symbol: 'DAI' }
export const USDC_ARBITRUM_BRIDGED = {
  address: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
  decimals: 6,
  symbol: 'USDC',
}

export const USDC_AVALANCHE = { address: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E', decimals: 6, symbol: 'USDC' }
export const USDT_AVALANCHE = { address: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118', decimals: 6, symbol: 'USDT' }

export const USDC_OPTIMISM = { address: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85', decimals: 6, symbol: 'USDC' }
export const USDC_OPTIMISM_BRIDGED = {
  address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
  decimals: 6,
  symbol: 'USDC',
}
export const USDT_OPTIMISM = { address: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58', decimals: 6, symbol: 'USDT' }
export const DAI_OPTIMISM = { address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1', decimals: 18, symbol: 'DAI' }

export const USDC_BASE = { address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913', decimals: 6, symbol: 'USDC' }
export const DAI_BASE = { address: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb', decimals: 18, symbol: 'DAI' }

export const ACCEPTED_PAYMENT_TOKENS: Record<SupportedNetwork, TokenData[]> = {
  [Network.Polygon]: [USDC_POLYGON],
  [Network.Binance]: [USDT_BSC],
  [Network.Ethereum]: [USDC_MAINNET],
  [Network.Arbitrum]: [USDC_ARBITRUM],
  [Network.Optimism]: [USDC_OPTIMISM],
  [Network.Avalanche]: [USDC_AVALANCHE],
  [Network.Base]: [USDC_BASE],
}

export const ACCEPTED_SWAP_OUTPUTS: Record<SupportedNetwork, TokenData[]> = {
  [Network.Polygon]: [USDC_POLYGON],
  [Network.Binance]: [USDT_BSC],
  [Network.Ethereum]: [USDC_MAINNET],
  [Network.Arbitrum]: [USDC_ARBITRUM],
  [Network.Optimism]: [USDC_OPTIMISM],
  [Network.Avalanche]: [USDC_AVALANCHE],
  [Network.Base]: [USDC_BASE],
}

// for determining a lower slippage threshold in USDC swap
export const NON_PAYMENT_STABLECOINS: Record<SupportedNetwork, TokenData[]> = {
  [Network.Polygon]: [USDT_POLYGON, DAI_POLYGON],
  [Network.Binance]: [BUSD_BSC, USDC_BSC],
  [Network.Ethereum]: [USDT_MAINNET, DAI_MAINNET, BUSD_MAINNET],
  // [Network.Arbitrum]: [USDT_ARBITRUM, DAI_ARBITRUM, USDC_ARBITRUM_BRIDGED],
  [Network.Arbitrum]: [DAI_ARBITRUM, USDC_ARBITRUM_BRIDGED],
  [Network.Optimism]: [USDT_OPTIMISM, DAI_OPTIMISM, USDC_OPTIMISM_BRIDGED],
  [Network.Avalanche]: [USDT_AVALANCHE],
  [Network.Base]: [DAI_BASE],
}

export const isAcceptedPaymentToken = (tokenAddress: string, network: SupportedNetwork) => {
  const addresses = ACCEPTED_PAYMENT_TOKENS[network].map((token) => token.address.toLowerCase())
  return addresses.includes(tokenAddress.toLowerCase())
}

export const isNonPaymentStablecoin = (tokenAddress: string, network: SupportedNetwork) => {
  const addresses = NON_PAYMENT_STABLECOINS[network].map((token) => token.address.toLowerCase())
  return addresses.includes(tokenAddress.toLowerCase())
}
