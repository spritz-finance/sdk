import { ethers } from 'ethers'
import { getContractAddress } from '../addresses'
import { getSpritzContract, SpritzPayMethod } from '../contracts'
import { SpritzPayV3 } from '../contracts/types'
import { SupportedNetwork } from '../networks'
import { ParaswapQuoter } from '../quotes/paraswap'
import { PayWithNativeSwapArgsResult, PayWithSwapArgsResult, UniswapV3Quoter } from '../quotes/uniswapv3'
import { isAcceptedPaymentToken } from '../supportedTokens'
import { isV3SwapNetwork } from '../swaps'
import { getPaymentToken, isNativeAddress } from '../tokens'
import { fiatString } from '../utils/format'
import { formatPaymentReference } from '../utils/reference'

export { SwapRateError, TransactionError } from '../quotes/paraswap'

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
    useParaswap?: boolean,
    slippagePercentage?: number,
  ): ConditionalSwapArgs<Method> {
    if (method === 'payWithSwap')
      return this.getSwapPaymentData(
        sourceTokenAddress,
        fiatAmount,
        reference,
        currentTime,
        useParaswap,
        slippagePercentage,
      ) as unknown as ConditionalSwapArgs<Method>
    if (method === 'payWithNativeSwap')
      return this.getNativeSwapPaymentData(
        sourceTokenAddress,
        fiatAmount,
        reference,
        currentTime,
        useParaswap,
        slippagePercentage,
      ) as unknown as ConditionalSwapArgs<Method>

    return this.getTokenPaymentData(sourceTokenAddress, fiatAmount, reference) as unknown as ConditionalSwapArgs<Method>
  }

  public getSwapPaymentData(
    sourceTokenAddress: string,
    fiatAmount: string | number,
    reference: string,
    currentTime: number,
    useParaswap?: boolean,
    _slippagePercentage?: number,
  ) {
    const v3 = isV3SwapNetwork(this.network)

    const Quoter = useParaswap ? ParaswapQuoter : v3 ? UniswapV3Quoter : ParaswapQuoter
    const quoter = new Quoter(this.network, this.provider, this.staging)
    return quoter.getPayWithSwapArgs(sourceTokenAddress, fiatAmount, reference, currentTime)
  }

  public getNativeSwapPaymentData(
    sourceTokenAddress: string,
    fiatAmount: string | number,
    reference: string,
    currentTime: number,
    useParaswap?: boolean,
    _slippagePercentage?: number,
  ) {
    const v3 = isV3SwapNetwork(this.network)

    const Quoter = useParaswap ? ParaswapQuoter : v3 ? UniswapV3Quoter : ParaswapQuoter
    const quoter = new Quoter(this.network, this.provider, this.staging)
    return quoter.getPayWithNativeSwapArgs(sourceTokenAddress, fiatAmount, reference, currentTime)
  }

  public async getParaswapExactInQuote(sourceTokenAddress: string, inputAmount: string, swapper: string) {
    const quoter = new ParaswapQuoter(this.network, this.provider, this.staging)
    return quoter.getPayWithExactInputArgs(sourceTokenAddress, inputAmount, swapper)
  }
}
