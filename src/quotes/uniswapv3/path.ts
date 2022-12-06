import { V3Route } from '@uniswap/smart-order-router'
import { ethers } from 'ethers'

export const getSwapPath = (route: V3Route) => {
  // reverse order of tokens and fees for path
  const poolFees = route.pools.reverse().map((pool) => pool.fee)
  const tokenAddresses = route.tokenPath.reverse().map((token) => token.address)

  const dataLength = poolFees.length + tokenAddresses.length

  const typeArray = Array.from({ length: dataLength }, (_, i) => (i % 2 === 0 ? 'address' : 'int24'))

  const valueArray: (number | string)[] = [tokenAddresses[0]]
  for (let index = 0; index < poolFees.length; index++) {
    valueArray.push(poolFees[index], tokenAddresses[index + 1])
  }

  const additionalHops = tokenAddresses.length > 2 ? tokenAddresses.length - 2 : 0

  return { path: ethers.utils.solidityPack(typeArray, valueArray), additionalHops }
}
