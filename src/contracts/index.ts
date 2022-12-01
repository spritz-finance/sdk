import { Contract, ethers } from 'ethers'
import { getContractAddress } from '../addresses'
import { Network, SupportedNetwork } from '../networks'
import { SpritzPay_V2_ABI } from './abi'
import { SpritzPayV1 as Contract_V1, SpritzPayV2 as Contract_V2 } from './types'

export type SpritzPay_V1 = Contract_V1
export type SpritzPay_V2 = Contract_V2

const SpritzInterface = new ethers.utils.Interface(SpritzPay_V2_ABI)
const spritzContract = (address: string) => new Contract(address, SpritzInterface) as SpritzPay_V2

export const getSpritzContract = (network: SupportedNetwork = Network.Polygon, staging = false) => {
  const address = getContractAddress(network, staging)
  return spritzContract(address)
}

export type SpritzPayMethod = Exclude<
  keyof SpritzPay_V2['functions'],
  'pause' | 'paused' | 'setPaymentRecipient' | 'setV2Router' | 'setV3Router' | 'setWETHAddress' | 'unpause'
>

export { SpritzPayV2__factory } from './types'
