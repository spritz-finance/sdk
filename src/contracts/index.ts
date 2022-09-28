import { Contract, ethers } from 'ethers'
import { getContractAddress } from '../addresses'
import { Network, SupportedNetwork } from '../networks'
import { SpritzPay_V1_ABI } from './abi'
import { SpritzPay_V1 as Contract_V1 } from './types'

export type SpritzPay_V1 = Contract_V1

const SpritzInterface = new ethers.utils.Interface(SpritzPay_V1_ABI)
const spritzContract = (address: string) => new Contract(address, SpritzInterface) as SpritzPay_V1

export const getSpritzContract = (network: SupportedNetwork = Network.Polygon, staging = false) => {
  const address = getContractAddress(network, staging)
  return spritzContract(address)
}

export type SpritzPayMethod = Exclude<
  keyof SpritzPay_V1['functions'],
  'pause' | 'paused' | 'setPaymentRecipient' | 'setV2Router' | 'setV3Router' | 'setWETHAddress' | 'unpause'
>

export { SpritzPay_V1__factory } from './types'
