import { Token } from '@uniswap/sdk-core'
import { CHAIN_ID_TO_NAME } from './chains'
import { SupportedChainId } from './constants'
import { UnsupportedPaymentTokenError } from './errors'
import { DAI_POLYGON, MAI_POLYGON, USDC_POLYGON, USDT_POLYGON } from './supportedTokens'

export type TokenData = {
  address: string
  decimals: number
  symbol: string
}

export const ACCEPTED_PAYMENT_TOKENS: Record<string, TokenData[]> = {
  polygon: [USDC_POLYGON, USDT_POLYGON, DAI_POLYGON, MAI_POLYGON],
}

export const toToken = (data: TokenData, chainId: SupportedChainId) => {
  return new Token(chainId, data.address, data.decimals, data.symbol)
}

export const getPaymentToken = (chainId: SupportedChainId, paymentTokenAddress: string = USDC_POLYGON.address) => {
  const chain = CHAIN_ID_TO_NAME[chainId]
  const token = ACCEPTED_PAYMENT_TOKENS[chain]?.find((token: TokenData) => token.address === paymentTokenAddress)

  if (!token) throw new UnsupportedPaymentTokenError()

  return toToken(token, chainId)
}
