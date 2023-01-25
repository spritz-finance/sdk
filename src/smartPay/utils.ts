import { ethers, TypedDataDomain, TypedDataField } from 'ethers'
import { getSmartPayContractAddress } from '../addresses'
import { getChainId, SupportedNetwork } from '../networks'
import { roundNumber } from '../utils/format'
import { SignatureParams } from './types'

const subscriptionMessageData = (verifyingContract: string, chainId: number, subscriptionData: SignatureParams) => {
  const subscription = [
    { name: 'paymentToken', type: 'address' },
    { name: 'paymentAmountMax', type: 'uint256' },
    { name: 'startTime', type: 'uint256' },
    { name: 'totalPayments', type: 'uint256' },
    { name: 'paymentReference', type: 'bytes32' },
    { name: 'cadence', type: 'uint8' },
    { name: 'subscriptionType', type: 'uint8' },
  ]

  const domainData = {
    name: 'SpritzSmartPay',
    version: '1',
    chainId,
    verifyingContract,
  }

  return [
    domainData,
    {
      Subscription: subscription,
    },
    subscriptionData,
  ] as [TypedDataDomain, Record<string, TypedDataField[]>, Record<string, string | number>]
}

export const getSubscriptionSignatureData = (
  network: SupportedNetwork,
  subscriptionData: SignatureParams,
  staging: boolean,
) => {
  const chainId = getChainId(network)
  const contractAddress = getSmartPayContractAddress(network, staging)
  return subscriptionMessageData(contractAddress.toLowerCase(), chainId, subscriptionData)
}

export const extractSignatureFromMessage = (signedMessage: string) => {
  const signature = signedMessage.substring(2)
  const r = `0x${signature.substring(0, 64)}`
  const s = `0x${signature.substring(64, 128)}`
  const v = parseInt(signature.substring(128, 130), 16)

  return {
    r,
    s,
    v,
  }
}

export const fiatAmountToTokenInputMax = (amount: number, feePercentage: number, tokenDecimals: number) => {
  const usdPaymentAmount = roundNumber(amount * (1 + Math.round(feePercentage) / 100)).toString()
  return ethers.utils.parseUnits(usdPaymentAmount, tokenDecimals).toString()
}
