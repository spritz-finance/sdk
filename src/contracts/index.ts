import { Contract, ethers } from 'ethers'
import { getContractAddress, getSmartPayContractAddress } from '../addresses'
import { Network, SupportedNetwork } from '../networks'
import { SpritzPay_V3_ABI, SpritzSmartPay_ABI } from './abi'
import { SpritzPayV3 as Contract_V3, SpritzSmartPay as SpritzSmartPayContract } from './types'

export type SpritzPay_V3 = Contract_V3
export type SpritzSmartPay = SpritzSmartPayContract

export const SpritzInterface = new ethers.utils.Interface(SpritzPay_V3_ABI)
const spritzContract = (address: string) => new Contract(address, SpritzInterface) as SpritzPay_V3

export const getSpritzContract = (network: SupportedNetwork = Network.Polygon, staging = false) => {
  const address = getContractAddress(network, staging)
  return spritzContract(address)
}

const SmartPayInterface = new ethers.utils.Interface(SpritzSmartPay_ABI)
const smartPayContract = (address: string) => new Contract(address, SmartPayInterface) as SpritzSmartPay

export const getSmartPayContract = (network: SupportedNetwork = Network.Polygon, staging = false) => {
  const address = getSmartPayContractAddress(network, staging)
  return smartPayContract(address)
}

export type SpritzPayMethod = 'payWithNativeSwap' | 'payWithSwap' | 'payWithToken'

export { SpritzPayV3__factory, SpritzSmartPay__factory } from './types'
