import { Contract, ethers } from 'ethers'
import { getPaymentWalletAddress, SPRITZ_PAYMENT_CONTRACT } from '../addresses'
import { SupportedNetwork } from '../networks'
import { TokenPaymentQuote } from '../quotes/uniswap'
import { isAcceptedPaymentToken } from '../supportedTokens'
import { getPaymentToken, isNativeAddress } from '../tokens'
import { fiatString } from '../utils/format'
import { formatPaymentReference } from '../utils/reference'
import { SpritzPay_V1_ABI } from './abi'
import { SpritzPay_V1 as Contract_V1 } from './types'

export type SpritzPay_V1 = Contract_V1
export const SpritzInterface = new ethers.utils.Interface(SpritzPay_V1_ABI)
export const spritzContract = new Contract(SPRITZ_PAYMENT_CONTRACT, SpritzInterface) as SpritzPay_V1

type SpritzPayMethod = Exclude<
  keyof SpritzPay_V1['functions'],
  'renounceOwnership' | 'transferOwnership' | 'initialize' | 'owner' | 'swapRouter'
>

export type PayWithTokenArgs = SpritzPay_V1['functions']['payWithToken']
export type PayWithSwapArgs = SpritzPay_V1['functions']['payWithSwap']
export type PayWithNativeArgs = SpritzPay_V1['functions']['payWithNative']

export class SpritzPay {
  public static contractMethod(tokenAddress: string, network: SupportedNetwork): SpritzPayMethod {
    if (isNativeAddress(tokenAddress)) return 'payWithNative'
    if (isAcceptedPaymentToken(tokenAddress, network)) return 'payWithToken'
    return 'payWithSwap'
  }

  public static tokenPaymentArgs(
    tokenAddress: string,
    network: SupportedNetwork,
    fiatAmount: string | number,
    reference: string,
  ): Parameters<PayWithTokenArgs> {
    const token = getPaymentToken(network, tokenAddress)
    const paymentWallet = getPaymentWalletAddress(network)
    const amount = ethers.utils.parseUnits(fiatString(fiatAmount), token.decimals)

    return [paymentWallet, tokenAddress, amount, formatPaymentReference(reference)]
  }

  public static swapPaymentArgsFromQuote(quote: TokenPaymentQuote, reference: string): Parameters<PayWithSwapArgs> {
    return [
      quote.to,
      quote.sourceTokenAddress,
      quote.paymentTokenAddress,
      ethers.BigNumber.from(quote.amountOut).toString(),
      ethers.BigNumber.from(quote.amountInMax).toString(),
      quote.path,
      formatPaymentReference(reference),
    ]
  }

  public static nativePaymentArgsFromQuote(quote: TokenPaymentQuote, reference: string): Parameters<PayWithNativeArgs> {
    return [
      quote.to,
      quote.sourceTokenAddress,
      quote.paymentTokenAddress,
      ethers.BigNumber.from(quote.amountOut).toString(),
      ethers.BigNumber.from(quote.amountInMax).toString(),
      quote.path,
      formatPaymentReference(reference),
      { value: ethers.BigNumber.from(quote.amountInMax).toString() },
    ]
  }
}
