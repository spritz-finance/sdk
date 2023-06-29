import { Token } from '@uniswap/sdk-core'
import { ethers } from 'ethers'
import { UnsupportedPaymentTokenError } from './errors'
import { getChainId, SupportedNetwork } from './networks'
import {
  ACCEPTED_PAYMENT_TOKENS,
  ACCEPTED_SWAP_OUTPUTS,
  NATIVE_ADDRESS_OTHER,
  NATIVE_ZERO_ADDRESS,
  USDC_POLYGON,
} from './supportedTokens'
import { getWrappedNativeToken } from './wrappedNativeTokens'
import { ERC20__factory } from './contracts/types'

export const isNativeAddress = (address: string) => [NATIVE_ZERO_ADDRESS, NATIVE_ADDRESS_OTHER].includes(address)

export type TokenData = {
  address: string
  decimals: number
  symbol: string
  name?: string
}

export const acceptedOutputTokenFor = (network: SupportedNetwork) => {
  const outputToken = ACCEPTED_SWAP_OUTPUTS[network][0]
  return toToken(outputToken, network)
}

export const toToken = (data: TokenData, network: SupportedNetwork) => {
  const chainId = getChainId(network)
  return new Token(chainId, data.address, data.decimals, data.symbol)
}

export const getPaymentToken = (network: SupportedNetwork, paymentTokenAddress: string = USDC_POLYGON.address) => {
  const token = ACCEPTED_PAYMENT_TOKENS[network]?.find(
    (token: TokenData) => token.address.toLowerCase() === paymentTokenAddress.toLowerCase(),
  )

  if (!token) throw new UnsupportedPaymentTokenError()

  return toToken(token, network)
}

export const getFullToken = async (
  address: string,
  network: SupportedNetwork,
  provider: ethers.providers.BaseProvider,
): Promise<Token> => {
  return (await tokenFromAddress(address, network, provider)) as Token
}

const tokenFromAddress = async (
  address: string,
  network: SupportedNetwork,
  provider: ethers.providers.BaseProvider,
) => {
  const chainId = getChainId(network)

  if (isNativeAddress(address)) {
    return getWrappedNativeToken(network)
  }

  const contract = ERC20__factory.connect(address, provider)

  const [decimals, symbol, name] = await Promise.all([contract.decimals(), contract.symbol(), contract.name()])

  return new Token(chainId, address, decimals, symbol, name)
}
