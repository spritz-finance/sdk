export const roundNumber = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100

export const fiatString = (num: string | number): string => {
  if (typeof num === 'number') return num.toString()
  return num
}

export const fiatNumber = (num: string | number): number => {
  if (typeof num === 'string') return parseFloat(num)
  return num
}
