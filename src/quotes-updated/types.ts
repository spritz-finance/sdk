import { SpritzPayV3 } from '../contracts-updated/types'

export type PayWithSwapArgs = Parameters<SpritzPayV3['functions']['payWithSwap']>
export type PayWithNativeSwapArgs = Parameters<SpritzPayV3['functions']['payWithNativeSwap']>

export type SwapQuote = {
  path: string
  sourceTokenAddress: string
  sourceTokenAmountMax: string
  paymentTokenAddress: string
  paymentTokenAmount: string
  deadline: number
  additionalHops: number
}
