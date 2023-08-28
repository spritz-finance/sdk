import { SpritzPayV3 } from '../contracts/types'

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

export type ExactInQuote = {
  data: string
  sourceTokenAddress: string
  sourceTokenAmount: string
  paymentTokenAddress: string
  paymentTokenAmountMin: string
  deadline: number
}
