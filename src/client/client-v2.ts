import { ethers } from 'ethers'
import { getContractAddress } from '../addresses'
import { getSpritzContract, SpritzPayMethod } from '../contracts-updated'
import { SpritzPayV3 } from '../contracts-updated/types'
import { SupportedNetwork } from '../networks'
import { UniswapV2Quoter } from '../quotes-updated/uniswap/uniswapV2Quoter'
import { PayWithNativeSwapArgsResult, PayWithSwapArgsResult, UniswapV3Quoter } from '../quotes-updated/uniswapv3'
import { isAcceptedPaymentToken } from '../supportedTokens'
import { isV3SwapNetwork } from '../swaps'
import { getPaymentToken, isNativeAddress } from '../tokens'
import { fiatString } from '../utils/format'
import { formatPaymentReference } from '../utils/reference'

type PayWithTokenArgsResult = {
  args: Parameters<SpritzPayV3['functions']['payWithToken']>
  data: { tokenAddress: string; amount: ethers.BigNumber; reference: string }
  additionalHops: number
  requiredTokenInput: ethers.BigNumber
}

type ConditionalSwapArgs<T extends 'payWithNativeSwap' | 'payWithSwap' | 'payWithToken'> = T extends 'payWithNativeSwap'
  ? Promise<PayWithNativeSwapArgsResult>
  : T extends 'payWithSwap'
  ? Promise<PayWithSwapArgsResult>
  : Promise<PayWithTokenArgsResult>

interface SpritzPaySDKConstructorArgs {
  network: SupportedNetwork
  provider: ethers.providers.BaseProvider
  staging?: boolean
}

export class SpritzPayV3SDK {
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
    if (isNativeAddress(tokenAddress)) return 'payWithNativeSwap'
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
    return {
      args: [tokenAddress, amount, reference],
      data: { tokenAddress, amount, reference },
      additionalHops: 0,
      requiredTokenInput: amount,
    }
  }

  public getPaymentArgs<Method extends 'payWithNativeSwap' | 'payWithSwap' | 'payWithToken'>(
    method: Method,
    sourceTokenAddress: string,
    fiatAmount: string | number,
    reference: string,
    currentTime = Math.floor(Date.now() / 1000),
    slippagePercentage?: number,
  ): ConditionalSwapArgs<Method> {
    if (method === 'payWithSwap')
      return this.getSwapPaymentData(
        sourceTokenAddress,
        fiatAmount,
        reference,
        currentTime,
        slippagePercentage,
      ) as unknown as ConditionalSwapArgs<Method>
    if (method === 'payWithNativeSwap')
      return this.getNativeSwapPaymentData(
        sourceTokenAddress,
        fiatAmount,
        reference,
        currentTime,
      ) as unknown as ConditionalSwapArgs<Method>

    return this.getTokenPaymentData(sourceTokenAddress, fiatAmount, reference) as unknown as ConditionalSwapArgs<Method>
  }

  public getSwapPaymentData(
    sourceTokenAddress: string,
    fiatAmount: string | number,
    reference: string,
    currentTime: number,
    slippagePercentage?: number,
  ) {
    const v3 = isV3SwapNetwork(this.network)
    const Quoter = v3 ? UniswapV3Quoter : UniswapV2Quoter
    const uniswapQuoter = new Quoter(this.network, this.provider)
    return uniswapQuoter.getPayWithSwapArgs(sourceTokenAddress, fiatAmount, reference, currentTime, slippagePercentage)
  }

  public getNativeSwapPaymentData(
    sourceTokenAddress: string,
    fiatAmount: string | number,
    reference: string,
    currentTime: number,
  ) {
    const v3 = isV3SwapNetwork(this.network)
    const Quoter = v3 ? UniswapV3Quoter : UniswapV2Quoter
    const uniswapQuoter = new Quoter(this.network, this.provider)
    return uniswapQuoter.getPayWithNativeSwapArgs(sourceTokenAddress, fiatAmount, reference, currentTime)
  }
}
