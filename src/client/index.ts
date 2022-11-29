import { ethers } from 'ethers'
import { getContractAddress } from '../addresses'
import { getSpritzContract, SpritzPayMethod } from '../contracts'
import { SpritzPayV2 } from '../contracts/types'
import { SupportedNetwork } from '../networks'
import { PayWithV2SwapArgsResult, UniswapV2Quoter } from '../quotes/uniswap/uniswapV2Quoter'
import { PayWithV3SwapArgsResult, UniswapV3Quoter } from '../quotes/uniswapv3'
import { isAcceptedPaymentToken } from '../supportedTokens'
import { isV3SwapNetwork } from '../swaps'
import { getPaymentToken } from '../tokens'
import { fiatString } from '../utils/format'
import { formatPaymentReference } from '../utils/reference'

export type PayWithTokenArgsResult = {
  args: Parameters<SpritzPayV2['functions']['payWithToken']>
  data: { tokenAddress: string; amount: ethers.BigNumber; reference: string }
}

export type ConditionalSwapArgs<T extends 'payWithV3Swap' | 'payWithSwap' | 'payWithToken'> = T extends 'payWithV3Swap'
  ? Promise<PayWithV3SwapArgsResult>
  : T extends 'payWithSwap'
  ? Promise<PayWithV2SwapArgsResult>
  : Promise<PayWithTokenArgsResult>

interface SpritzPaySDKConstructorArgs {
  network: SupportedNetwork
  provider: ethers.providers.BaseProvider
  staging?: boolean
}

export class SpritzPaySDK {
  private network: SupportedNetwork
  provider: ethers.providers.BaseProvider
  staging: boolean

  constructor({ network, provider, staging = false }: SpritzPaySDKConstructorArgs) {
    if (!network) throw new Error(`Network must be provided`)
    if (!provider) throw new Error(`Provider missing`)
    this.network = network
    this.provider = provider
    this.staging = staging
  }

  public getContractAddress(): string {
    return getContractAddress(this.network, this.staging)
  }

  public getContract() {
    return getSpritzContract(this.network, this.staging)
  }

  public getContractMethodForPayment(tokenAddress: string): SpritzPayMethod {
    if (isAcceptedPaymentToken(tokenAddress, this.network)) return 'payWithToken'
    if (isV3SwapNetwork(this.network)) return 'payWithV3Swap'
    return 'payWithSwap'
  }

  public getTokenPaymentData(
    tokenAddress: string,
    fiatAmount: string | number,
    _reference: string,
  ): PayWithTokenArgsResult {
    const token = getPaymentToken(this.network, tokenAddress)
    const amount = ethers.utils.parseUnits(fiatString(fiatAmount), token.decimals)
    const reference = formatPaymentReference(_reference)
    return { args: [tokenAddress, amount, reference], data: { tokenAddress, amount, reference } }
  }

  public getPaymentArgs<Method extends 'payWithV3Swap' | 'payWithSwap' | 'payWithToken'>(
    method: Method,
    sourceTokenAddress: string,
    fiatAmount: string | number,
    reference: string,
  ): ConditionalSwapArgs<Method> {
    if (method === 'payWithSwap')
      return this.getV2SwapPaymentData(
        sourceTokenAddress,
        fiatAmount,
        reference,
      ) as unknown as ConditionalSwapArgs<Method>
    if (method === 'payWithV3Swap')
      return this.getV3SwapPaymentData(
        sourceTokenAddress,
        fiatAmount,
        reference,
      ) as unknown as ConditionalSwapArgs<Method>

    return this.getTokenPaymentData(sourceTokenAddress, fiatAmount, reference) as unknown as ConditionalSwapArgs<Method>
  }

  public getV2SwapPaymentData(sourceTokenAddress: string, fiatAmount: string | number, reference: string) {
    const uniswapQuoter = new UniswapV2Quoter(this.network, this.provider)
    return uniswapQuoter.getPayWithSwapArgs(sourceTokenAddress, fiatAmount, reference)
  }

  public getV3SwapPaymentData(sourceTokenAddress: string, fiatAmount: string | number, reference: string) {
    const uniswapQuoter = new UniswapV3Quoter(this.network, this.provider)
    return uniswapQuoter.getPayWithSwapArgs(sourceTokenAddress, fiatAmount, reference)
  }
}
