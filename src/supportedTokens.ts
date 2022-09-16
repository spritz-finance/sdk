import { Network, SupportedNetwork } from './networks'
import { TokenData } from './tokens'

/**
 * Returned by Zapper API as the "contract address" signifying native token (MATIC) balance.
 */
export const NATIVE_ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const NATIVE_ADDRESS_OTHER = '0x0000000000000000000000000000000000001010' //wat

export const USDT_POLYGON = { address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', decimals: 6, symbol: 'USDT' }
export const USDC_POLYGON = { address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', decimals: 6, symbol: 'USDC' }
export const DAI_POLYGON = { address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', decimals: 18, symbol: 'DAI' }
export const MAI_POLYGON = { address: '0xa3Fa99A148fA48D14Ed51d610c367C61876997F1', decimals: 18, symbol: 'miMATIC' }

export const USDT_OPTIMISM = { address: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58', decimals: 6, symbol: 'USDT' }
export const USDC_OPTIMISM = { address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607', decimals: 6, symbol: 'USDC' }
export const DAI_OPTIMISM = { address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1', decimals: 18, symbol: 'DAI' }

export const ACCEPTED_PAYMENT_TOKENS: Record<SupportedNetwork, TokenData[]> = {
  [Network.Polygon]: [USDC_POLYGON, USDT_POLYGON, DAI_POLYGON, MAI_POLYGON],
  [Network.Optimism]: [USDT_OPTIMISM, USDC_OPTIMISM, DAI_OPTIMISM],
}

export const isAcceptedPaymentToken = (tokenAddress: string, network: SupportedNetwork) => {
  const addresses = ACCEPTED_PAYMENT_TOKENS[network].map((token) => token.address.toLowerCase())
  return addresses.includes(tokenAddress.toLowerCase())
}
