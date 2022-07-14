import { Token } from '@uniswap/sdk-core'
import { UnsupportedPaymentTokenError } from './errors'
import { NETWORK_TO_CHAIN_ID, SupportedNetwork } from './networks'
import { ACCEPTED_PAYMENT_TOKENS, USDC_POLYGON } from './supportedTokens'

export type TokenData = {
  address: string
  decimals: number
  symbol: string
}

export const toToken = (data: TokenData, network: SupportedNetwork) => {
  const chainId = NETWORK_TO_CHAIN_ID[network]
  return new Token(chainId, data.address, data.decimals, data.symbol)
}

export const getPaymentToken = (network: SupportedNetwork, paymentTokenAddress: string = USDC_POLYGON.address) => {
  const token = ACCEPTED_PAYMENT_TOKENS[network]?.find((token: TokenData) => token.address === paymentTokenAddress)

  if (!token) throw new UnsupportedPaymentTokenError()

  return toToken(token, network)
}
