import { Token } from '@uniswap/sdk-core'
import { BigNumber, Overrides, ethers } from 'ethers'
import { SupportedNetwork } from '../../networks'
import { isNonPaymentStablecoin } from '../../supportedTokens'
import { acceptedOutputTokenFor, getFullToken } from '../../tokens'
import { FiatValue, fiatNumber, roundNumber } from '../../utils/format'
import { formatPaymentReference } from '../../utils/reference'
import { ExactInQuote, PayWithNativeSwapArgs, PayWithSwapArgs, SwapQuote } from '../types'
import { getParaswapExactInTransactionData, getParaswapTransactionData } from './paraswapQuote'
import { getSwapModuleAddress } from '../../swaps'

export { SwapRateError, TransactionError } from './paraswapQuote'

export type PayWithSwapArgsResult = {
  args: PayWithSwapArgs
  data: SwapQuote
  additionalHops: number
  requiredTokenInput: BigNumber
}

export type PayWithNativeSwapArgsResult = {
  args: PayWithNativeSwapArgs
  data: SwapQuote
  additionalHops: number
  requiredTokenInput: BigNumber
}

const SLIPPAGE_TOLERANCE = 0.5
const SLIPPAGE_TOLERANCE_STABLECOIN = 0.25 // 0.25%

export class ParaswapQuoter {
  private paymentToken: Token
  private network: SupportedNetwork
  private provider: ethers.providers.BaseProvider
  private staging: boolean

  constructor(network: SupportedNetwork, provider: ethers.providers.BaseProvider, staging: boolean) {
    this.provider = provider
    this.network = network
    this.staging = staging
    this.paymentToken = acceptedOutputTokenFor(network)
  }

  public async getPayWithSwapArgs(
    tokenAddress: string,
    fiatAmount: string | number,
    reference: string,
    currentTime = Math.floor(Date.now() / 1000),
  ): Promise<PayWithSwapArgsResult> {
    const inputToken = await getFullToken(tokenAddress, this.network, this.provider)

    const data = await this.getTokenPaymentQuote(inputToken, fiatAmount, currentTime)
    const args: PayWithSwapArgs = [
      inputToken.address,
      data.sourceTokenAmountMax,
      data.paymentTokenAmount,
      formatPaymentReference(reference),
      data.deadline,
      data.path,
    ]

    return {
      args,
      data,
      additionalHops: data.additionalHops,
      requiredTokenInput: BigNumber.from(data.sourceTokenAmountMax),
    }
  }

  public async getPayWithNativeSwapArgs(
    tokenAddress: string,
    fiatAmount: string | number,
    reference: string,
    currentTime = Math.floor(Date.now() / 1000),
  ): Promise<PayWithNativeSwapArgsResult> {
    const inputToken = await getFullToken(tokenAddress, this.network, this.provider)

    const data = await this.getTokenPaymentQuote(inputToken, fiatAmount, currentTime)
    const args: PayWithNativeSwapArgs = [
      data.paymentTokenAmount,
      formatPaymentReference(reference),
      data.deadline,
      data.path,
      {
        value: data.sourceTokenAmountMax,
      } as Overrides,
    ]

    return {
      args,
      data,
      additionalHops: data.additionalHops,
      requiredTokenInput: BigNumber.from(data.sourceTokenAmountMax),
    }
  }

  private async getTokenPaymentQuote(
    inputToken: Token,
    fiatAmount: FiatValue,
    currentTime: number,
    swapperAddress?: string,
  ): Promise<SwapQuote> {
    const { amountOut, deadline } = this.getQuoteParams(fiatNumber(fiatAmount), currentTime)

    const swapModuleAddress = swapperAddress ?? (await getSwapModuleAddress(this.network, this.provider, this.staging))

    const maxSlippage = isNonPaymentStablecoin(inputToken.address, this.network)
      ? SLIPPAGE_TOLERANCE_STABLECOIN
      : SLIPPAGE_TOLERANCE

    const txn = await getParaswapTransactionData({
      amountOut,
      deadline,
      srcToken: inputToken.address,
      srcDecimals: inputToken.decimals,
      destToken: this.paymentToken.address,
      destDecimals: this.paymentToken.decimals,
      network: this.network,
      userAddress: swapModuleAddress,
      maxSlippage,
    })

    return {
      path: txn.swapCallData,
      sourceTokenAddress: inputToken.address,
      sourceTokenAmountMax: txn.inputAmount,
      paymentTokenAddress: this.paymentToken.address,
      paymentTokenAmount: amountOut,
      deadline,
      additionalHops: 0,
    }
  }

  private async getExactInputQuote(
    inputToken: Token,
    inputAmount: string,
    currentTime: number,
    userAddress: string,
  ): Promise<ExactInQuote> {
    const maxSlippage = isNonPaymentStablecoin(inputToken.address, this.network)
      ? SLIPPAGE_TOLERANCE_STABLECOIN
      : SLIPPAGE_TOLERANCE

    const deadline = currentTime + 1800

    const txn = await getParaswapExactInTransactionData({
      amountIn: inputAmount,
      deadline,
      srcToken: inputToken.address,
      srcDecimals: inputToken.decimals,
      destToken: this.paymentToken.address,
      destDecimals: this.paymentToken.decimals,
      network: this.network,
      userAddress,
      maxSlippage,
    })

    return {
      swapData: txn.swapCallData,
      sourceTokenAmount: txn.inputAmount,
      paymentTokenAmountMin: txn.outputAmount,
      deadline,
    }
  }

  private getQuoteParams(_amountOut: number, currentTime: number) {
    const usdPaymentAmount = roundNumber(_amountOut).toString()
    const amountOut = ethers.utils.parseUnits(usdPaymentAmount, this.paymentToken.decimals).toString()

    const deadline = currentTime + 1800 // 30 minutes
    return { amountOut, deadline }
  }

  public async getPayWithSwapArgsWithSwapper(
    tokenAddress: string,
    fiatAmount: string | number,
    reference: string,
    swapperAddress: string,
    currentTime = Math.floor(Date.now() / 1000),
  ): Promise<PayWithSwapArgsResult> {
    const inputToken = await getFullToken(tokenAddress, this.network, this.provider)

    const data = await this.getTokenPaymentQuote(inputToken, fiatAmount, currentTime, swapperAddress)
    const args: PayWithSwapArgs = [
      inputToken.address,
      data.sourceTokenAmountMax,
      data.paymentTokenAmount,
      formatPaymentReference(reference),
      data.deadline,
      data.path,
    ]

    return {
      args,
      data,
      additionalHops: data.additionalHops,
      requiredTokenInput: BigNumber.from(data.sourceTokenAmountMax),
    }
  }

  public async getPayWithExactInputArgs(
    tokenAddress: string,
    inputAmount: string,
    user: string,
    currentTime = Math.floor(Date.now() / 1000),
  ) {
    const inputToken = await getFullToken(tokenAddress, this.network, this.provider)

    const data = await this.getExactInputQuote(inputToken, inputAmount, currentTime, user)

    const args = [data.sourceTokenAmount, data.paymentTokenAmountMin, data.deadline, data.swapData]

    return {
      args,
      data,
      requiredTokenInput: BigNumber.from(data.sourceTokenAmount),
      outputTokenMin: BigNumber.from(data.paymentTokenAmountMin),
    }
  }
}
