import { Token } from '@uniswap/sdk-core'
import { UnsupportedPaymentTokenError } from './errors'
import { NETWORK_TO_CHAIN_ID, SupportedNetwork } from './networks'
import { ACCEPTED_PAYMENT_TOKENS, USDC_POLYGON } from './supportedTokens'

/**
 * Returned by Zapper API as the "contract address" signifying native token (MATIC) balance.
 */
export const NATIVE_ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

//wat
export const NATIVE_ADDRESS_OTHER = '0x0000000000000000000000000000000000001010'

export const isNativeAddress = (address: string) => [NATIVE_ZERO_ADDRESS, NATIVE_ADDRESS_OTHER].includes(address)

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
  const token = ACCEPTED_PAYMENT_TOKENS[network]?.find(
    (token: TokenData) => token.address.toLowerCase() === paymentTokenAddress.toLowerCase(),
  )

  if (!token) throw new UnsupportedPaymentTokenError()

  return toToken(token, network)
}
