import { Token } from './quotes/uniswap/uniswap-v2-sdk'
import { UnsupportedPaymentTokenError } from './errors'
import { CHAIN_ID_TO_NETWORK, NETWORK_TO_CHAIN_ID, SupportedNetwork } from './networks'
import { ACCEPTED_PAYMENT_TOKENS, NATIVE_ADDRESS_OTHER, NATIVE_ZERO_ADDRESS, USDC_POLYGON } from './supportedTokens'
import { ethers } from 'ethers'
import { ERC20__factory } from './contracts/types'
import { getWrappedNativeToken } from './wrappedNativeTokens'

export const isNativeAddress = (address: string) => [NATIVE_ZERO_ADDRESS, NATIVE_ADDRESS_OTHER].includes(address)

export type TokenData = {
  address: string
  decimals: number
  symbol: string
  name?: string
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

export const getFullToken = async (address: string, provider: ethers.providers.BaseProvider): Promise<Token> => {
  const chainId = provider.network.chainId

  if (isNativeAddress(address)) {
    return getWrappedNativeToken(CHAIN_ID_TO_NETWORK[chainId] as SupportedNetwork)
  }

  const contract = ERC20__factory.connect(address, provider)

  const [decimals, symbol, name] = await Promise.all([contract.decimals(), contract.symbol(), contract.name()])

  return new Token(chainId, address, decimals, symbol, name)
}
