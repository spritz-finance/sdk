import { Network, SupportedNetwork } from './networks'
import { TokenData } from './tokens'

export const USDT_POLYGON = { address: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f', decimals: 6, symbol: 'USDT' }
export const USDC_POLYGON = { address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174', decimals: 6, symbol: 'USDC' }
export const DAI_POLYGON = { address: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063', decimals: 18, symbol: 'DAI' }
export const MAI_POLYGON = { address: '0xa3fa99a148fa48d14ed51d610c367c61876997f1', decimals: 18, symbol: 'miMATIC' }

export const ACCEPTED_PAYMENT_TOKENS: Record<SupportedNetwork, TokenData[]> = {
  [Network.Polygon]: [USDC_POLYGON, USDT_POLYGON, DAI_POLYGON, MAI_POLYGON],
}

export const isAcceptedPaymentToken = (tokenAddress: string, network: SupportedNetwork) => {
  const addresses = ACCEPTED_PAYMENT_TOKENS[network].map((token) => token.address)
  return addresses.includes(tokenAddress)
}
