export type SignatureParams = {
  paymentAmountMax: string
  startTime: number
  paymentToken: string
  cadence: number
  subscriptionType: number
  totalPayments: number
  paymentReference: string
}

export enum SubscriptionType {
  DIRECT,
  SWAP,
}

export enum Cadence {
  Monthly,
  Weekly,
  Daily,
}
