import { Network, SupportedNetwork } from './networks'
import { TokenData } from './tokens'

export const NATIVE_ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const NATIVE_ADDRESS_OTHER = '0x0000000000000000000000000000000000001010' //wat

export const USDT_POLYGON = { address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', decimals: 6, symbol: 'USDT' }
export const USDC_POLYGON = { address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', decimals: 6, symbol: 'USDC' }
export const DAI_POLYGON = { address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', decimals: 18, symbol: 'DAI' }

export const USDT_BSC = { address: '0x69bAb60997A2f5CbeE668E5087Dd9F91437206Bb', decimals: 6, symbol: 'USDT' }
export const USDC_BSC = { address: '0x0a385f86059e0b2a048171d78afd1f38558121f3', decimals: 6, symbol: 'USDC' }
export const DAI_BSC = { address: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3', decimals: 18, symbol: 'DAI' }
export const BUSD_BSC = { address: '0x55d398326f99059fF775485246999027B3197955', decimals: 18, symbol: 'BUSD' }

export const ACCEPTED_PAYMENT_TOKENS: Record<SupportedNetwork, TokenData[]> = {
  [Network.Polygon]: [USDC_POLYGON, USDT_POLYGON, DAI_POLYGON],
  [Network.Binance]: [USDT_BSC, USDC_BSC, BUSD_BSC, DAI_BSC],
}

export const isAcceptedPaymentToken = (tokenAddress: string, network: SupportedNetwork) => {
  const addresses = ACCEPTED_PAYMENT_TOKENS[network].map((token) => token.address.toLowerCase())
  return addresses.includes(tokenAddress.toLowerCase())
}
