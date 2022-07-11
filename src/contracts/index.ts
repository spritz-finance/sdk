import { Contract, ethers } from 'ethers'
import { SPRITZ_PAYMENT_CONTRACT } from '../constants'
import { SpritzPay_V1_ABI } from './abi'
import { SpritzPay_V1 } from './types'

export const SpritzInterface = new ethers.utils.Interface(SpritzPay_V1_ABI)
export const spritzContract = new Contract(SPRITZ_PAYMENT_CONTRACT, SpritzInterface) as SpritzPay_V1
