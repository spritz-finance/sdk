import { TypedDataDomain, TypedDataField } from 'ethers'
import { getChainId, SupportedNetwork } from '../networks'

export enum SubscriptionType {
  DIRECT,
  SWAP,
}

export enum Cadence {
  Monthly,
  Weekly,
  Daily,
}

type SubscriptionData = {
  paymentToken: string
  paymentAmountMax: string
  startTime: number
  totalPayments: number
  paymentReference: string
  cadence: Cadence
  subscriptionType: SubscriptionType
}

const subscriptionMessageData = (verifyingContract: string, chainId: number, subscriptionData: SubscriptionData) => {
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
  contractAddress: string,
  network: SupportedNetwork,
  subscriptionData: SubscriptionData,
) => {
  const chainId = getChainId(network)
  return subscriptionMessageData(contractAddress, chainId, subscriptionData)
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
