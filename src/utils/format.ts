import { BigNumber, ethers } from 'ethers'

export const roundNumber = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100

export type FiatValue = number | string

export const fiatString = (num: FiatValue): string => {
  if (typeof num === 'number') return num.toString()
  return num
}

export const fiatNumber = (num: FiatValue): number => {
  if (typeof num === 'string') return parseFloat(num)
  return num
}

export const fiatValueToBigNumber = (num: FiatValue, decimals: number): BigNumber => {
  const amount = fiatNumber(num)
  const fiatPaymentAmount = roundNumber(amount).toString()
  return ethers.utils.parseUnits(fiatPaymentAmount, decimals)
}
