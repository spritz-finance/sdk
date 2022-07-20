import { Contract, ethers } from 'ethers'
import { getPaymentWalletAddress, SPRITZ_PAYMENT_CONTRACT } from '../addresses'
import { SupportedNetwork } from '../networks'
import { TokenPaymentQuote } from '../quotes/uniswap'
import { isAcceptedPaymentToken } from '../supportedTokens'
import { getPaymentToken } from '../tokens'
import { fiatString } from '../utils/format'
import { formatPaymentReference } from '../utils/reference'
import { SpritzPay_V2_ABI } from './abi'
import { SpritzPay_V2 as Contract_V2 } from './types'

export type SpritzPay_V2 = Contract_V2
export const SpritzInterface = new ethers.utils.Interface(SpritzPay_V2_ABI)
export const spritzContract = new Contract(SPRITZ_PAYMENT_CONTRACT, SpritzInterface) as SpritzPay_V2

type SpritzPayMethod = Exclude<
  keyof SpritzPay_V2['functions'],
  'renounceOwnership' | 'transferOwnership' | 'initialize' | 'owner' | 'swapRouter'
>

export type PayWithTokenArgs = SpritzPay_V2['functions']['payWithToken']
export type PayWithSwapArgs = SpritzPay_V2['functions']['payWithSwap']
export type PayWithNativeArgs = SpritzPay_V2['functions']['payWithNative']
export type PayWithAggregatedSwapArgs = Parameters<SpritzPay_V2['functions']['payWithAggregatedSwap']>

export class SpritzPay {
  public static contractMethod(tokenAddress: string, network: SupportedNetwork): SpritzPayMethod {
    if (isAcceptedPaymentToken(tokenAddress, network)) return 'payWithToken'
    return 'payWithAggregatedSwap'
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
