import { ethers } from 'ethers'
import { getPaymentWalletAddress } from '../addresses'
import { SupportedNetwork } from '../networks'
import { isAcceptedPaymentToken } from '../supportedTokens'
import { getPaymentToken } from '../tokens'
import { fiatString } from '../utils/format'
import { formatPaymentReference } from '../utils/reference'
import { SpritzPayMethod, SpritzPay_Legacy, SpritzPay_V1 } from './contracts'

export type LegacyPayWithTokenArgs = SpritzPay_Legacy['functions']['payWithToken']
export type PayWithTokenArgs = SpritzPay_V1['functions']['payWithToken']

export class SpritzPay {
  public static contractMethod(tokenAddress: string, network: SupportedNetwork): SpritzPayMethod {
    if (isAcceptedPaymentToken(tokenAddress, network)) return 'payWithToken'
    return 'payWithToken'
  }

  public static tokenPaymentArgs(
    tokenAddress: string,
    network: SupportedNetwork,
    fiatAmount: string | number,
    reference: string,
    staging = false,
  ): Parameters<PayWithTokenArgs | LegacyPayWithTokenArgs> {
    const token = getPaymentToken(network, tokenAddress)
    const paymentWallet = getPaymentWalletAddress(network)
    const amount = ethers.utils.parseUnits(fiatString(fiatAmount), token.decimals)

    if (staging) return [tokenAddress, amount, formatPaymentReference(reference)] as Parameters<PayWithTokenArgs>

    return [
      paymentWallet,
      tokenAddress,
      amount,
      formatPaymentReference(reference),
    ] as Parameters<LegacyPayWithTokenArgs>
  }

  // public static swapPaymentArgsFromQuote(quote: TokenPaymentQuote, reference: string): Parameters<PayWithSwapArgs> {
  //   return [
  //     quote.to,
  //     quote.sourceTokenAddress,
  //     quote.paymentTokenAddress,
  //     ethers.BigNumber.from(quote.amountOut).toString(),
  //     ethers.BigNumber.from(quote.amountInMax).toString(),
  //     quote.path,
  //     formatPaymentReference(reference),
  //   ]
  // }

  // public static nativePaymentArgsFromQuote(quote: TokenPaymentQuote, reference: string): Parameters<PayWithNativeArgs> {
  //   return [
  //     quote.to,
  //     quote.sourceTokenAddress,
  //     quote.paymentTokenAddress,
  //     ethers.BigNumber.from(quote.amountOut).toString(),
  //     ethers.BigNumber.from(quote.amountInMax).toString(),
  //     quote.path,
  //     formatPaymentReference(reference),
  //     { value: ethers.BigNumber.from(quote.amountInMax).toString() },
  //   ]
  // }
}
