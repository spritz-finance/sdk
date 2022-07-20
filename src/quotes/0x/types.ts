interface Source {
  name: string
  proportion: string
}

interface FillData {
  tokenAddressPath: string[]
  router: string
}

interface Order {
  makerToken: string
  takerToken: string
  makerAmount: string
  takerAmount: string
  fillData: FillData
  source: string
  sourcePathId: string
  type: number
}

export interface ZeroExQuoteResponse {
  chainId: number
  price: string
  guaranteedPrice: string
  estimatedPriceImpact: string
  to: string
  data: string
  value: string
  gas: string
  estimatedGas: string
  gasPrice: string
  protocolFee: string
  minimumProtocolFee: string
  buyTokenAddress: string
  sellTokenAddress: string
  buyAmount: string
  sellAmount: string
  sources: Source[]
  orders: Order[]
  allowanceTarget: string
  decodedUniqueId: string
  sellTokenToEthRate: string
  buyTokenToEthRate: string
}
