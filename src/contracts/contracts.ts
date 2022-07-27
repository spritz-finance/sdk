import { Contract, ethers } from 'ethers'
import { getContractAddress } from '../addresses'
import { Network, SupportedNetwork } from '../networks'
import { SpritzPay_V1_ABI, SpritzPay_Legacy_ABI } from './abi'
import { SpritzPay_V1 as Contract_V1, SpritzPay_Legacy as Contract_Legacy } from './types'

export type SpritzPay_V1 = Contract_V1
export type SpritzPay_Legacy = Contract_Legacy

const SpritzInterface = new ethers.utils.Interface(SpritzPay_V1_ABI)
const spritzContract = (address: string) => new Contract(address, SpritzInterface) as SpritzPay_V1

const SpritzLegacyInterface = new ethers.utils.Interface(SpritzPay_Legacy_ABI)
const spritzLegacyContract = (address: string) => new Contract(address, SpritzLegacyInterface) as SpritzPay_Legacy

export const getSpritzContract = (network: SupportedNetwork = Network.Polygon, staging = false) => {
  const address = getContractAddress(network, staging)
  return staging ? spritzContract(address) : spritzLegacyContract(address)
}

export type SpritzPayMethod = Exclude<
  keyof SpritzPay_V1['functions'],
  'pause' | 'paused' | 'setPaymentRecipient' | 'setV2Router' | 'setV3Router' | 'setWETHAddress' | 'unpause'
>
