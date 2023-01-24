import { Contract, ethers } from 'ethers'
import { getContractAddress } from '../addresses'
import { Network, SupportedNetwork } from '../networks'
import { SpritzPay_V3_ABI } from './abi'
import { SpritzPayV1 as Contract_V1, SpritzPayV2 as Contract_V2, SpritzPayV3 as Contract_V3 } from './types'

export type SpritzPay_V1 = Contract_V1
export type SpritzPay_V2 = Contract_V2
export type SpritzPay_V3 = Contract_V3

const SpritzInterface = new ethers.utils.Interface(SpritzPay_V3_ABI)
const spritzContract = (address: string) => new Contract(address, SpritzInterface) as SpritzPay_V3

export const getSpritzContract = (network: SupportedNetwork = Network.Polygon, staging = false) => {
  const address = getContractAddress(network, staging)
  return spritzContract(address)
}

export type SpritzPayMethod = 'payWithNativeSwap' | 'payWithSwap' | 'payWithToken'

export { SpritzPayV3__factory } from './types'
