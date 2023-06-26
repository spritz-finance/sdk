import mathUtils from '@aave/math-utils'
import { utils } from 'ethers'
import { constructSimpleSDK } from '@paraswap/sdk'
import { NETWORK_TO_CHAIN_ID, Network } from '../../networks'
import axios from 'axios'

const PARTNER = 'spritzfinance'
const MAX_SLIPPAGE = 0.5 // 0.5%

type SwapRateParams = {
  inputAmount: string
  outputAmount: string
}

type OptimalSwapExchange<T> = {
  exchange: string
  srcAmount: NumberAsString
  destAmount: NumberAsString
  percent: number
  data?: T
  poolAddresses?: Array<Address>
}

enum SwapSide {
  BUY = 'BUY',
  SELL = 'SELL',
}

type OptimalRoute = {
  percent: number
  swaps: OptimalSwap[]
}
type OptimalSwap = {
  srcToken: Address
  srcDecimals: number
  destToken: Address
  destDecimals: number
  swapExchanges: OptimalSwapExchange<any>[]
}

type OptionalRate = {
  exchange: string
  srcAmount: NumberAsString
  destAmount: NumberAsString
  unit?: NumberAsString
  data?: any
}

type OptimalRate = {
  blockNumber: number
  network: number
  srcToken: Address
  srcDecimals: number
  srcAmount: NumberAsString
  srcUSD: NumberAsString
  destToken: Address
  destDecimals: number
  destAmount: NumberAsString
  destUSD: NumberAsString
  bestRoute: OptimalRoute[]
  gasCostUSD: NumberAsString
  gasCost: NumberAsString
  others?: OptionalRate[]
  side: SwapSide
  contractMethod: string
  tokenTransferProxy: Address
  contractAddress: Address
  maxImpact?: number
  maxUSDImpact?: number
  maxImpactReached?: boolean
  partner?: string
  partnerFee: number
  hmac: string
}

export type SwapTransactionParams = SwapRateParams & {
  swapCallData: string
}

/**
 * @type ethereum address
 */
type Address = string

/**
 * @type number as string
 */
type NumberAsString = string

interface TransactionParams {
  to: Address
  from: Address
  value: NumberAsString
  data: string
  gasPrice: NumberAsString
  gas?: NumberAsString
  chainId: number
}

interface Swapper {
  getRate(params: {
    srcToken: string
    srcDecimals: number
    destToken: string
    destDecimals: number
    amount: NumberAsString
    userAddress: Address
  }): Promise<OptimalRate>
  getTransactionParams(params: {
    srcToken: string
    srcDecimals: number
    destToken: string
    destDecimals: number
    user: string
    priceRoute: OptimalRate
    maxSlippage: number
    deadline: number
  }): Promise<{
    swapCallData: string
    requiredInput: string
  }>
}

const ExactOutSwapper = (network: Network) => {
  const paraswap = constructSimpleSDK({ chainId: NETWORK_TO_CHAIN_ID[network], axios })
  // const paraswap = new Paraswap.ParaSwap( as Paraswap.NetworkID)

  const getRate: Swapper['getRate'] = async ({
    srcToken,
    srcDecimals,
    destToken,
    destDecimals,
    amount,
    userAddress,
  }) => {
    const priceRouteOrError = await paraswap.swap.getRate({
      srcToken,
      destToken,
      amount,
      userAddress,
      side: SwapSide.BUY,
      options: { partner: PARTNER },
      srcDecimals,
      destDecimals,
    })

    return priceRouteOrError
  }

  const getTransactionParams: Swapper['getTransactionParams'] = async ({
    srcToken,
    srcDecimals,
    destToken,
    destDecimals,
    user,
    priceRoute,
    maxSlippage,
    deadline,
  }) => {
    const srcAmountWithSlippage = new mathUtils.BigNumberZeroDecimal(priceRoute.srcAmount)
      .multipliedBy(100 + maxSlippage)
      .dividedBy(100)
      .toFixed(0)

    const transactionRequestOrError = await paraswap.swap.buildTx(
      {
        srcToken,
        destToken,
        srcAmount: srcAmountWithSlippage,
        destAmount: priceRoute.destAmount,
        priceRoute,
        userAddress: user,
        partner: PARTNER,
        srcDecimals,
        destDecimals,
        deadline: deadline.toString(),
      },
      { ignoreChecks: true },
    )

    const callDataEncoded = utils.defaultAbiCoder.encode(
      ['bytes', 'address', 'address', 'address'],
      [
        (transactionRequestOrError as TransactionParams).data,
        (transactionRequestOrError as TransactionParams).to,
        srcToken,
        destToken,
      ],
    )

    return {
      swapCallData: callDataEncoded,
      requiredInput: srcAmountWithSlippage,
    }
  }

  return {
    getRate,
    getTransactionParams,
  }
}

async function fetchExactOutTxParams(
  priceRoute: OptimalRate,
  srcToken: string,
  srcDecimals: number,
  destToken: string,
  destDecimals: number,
  network: Network,
  callerAddress: string,
  maxSlippage: number,
  deadline: number,
): Promise<SwapTransactionParams> {
  const swapper = ExactOutSwapper(network)
  const { swapCallData, requiredInput } = await swapper.getTransactionParams({
    srcToken,
    srcDecimals,
    destToken,
    destDecimals,
    user: callerAddress,
    priceRoute,
    maxSlippage,
    deadline,
  })

  return {
    swapCallData,
    inputAmount: requiredInput,
    outputAmount: priceRoute.destAmount,
  }
}

async function fetchExactOutRate(
  amount: string,
  srcToken: string,
  srcDecimals: number,
  destToken: string,
  destDecimals: number,
  network: Network,
  userAddress: string,
): Promise<OptimalRate> {
  const swapper = ExactOutSwapper(network)

  return await swapper.getRate({
    srcToken,
    srcDecimals,
    destToken,
    destDecimals,
    amount,
    userAddress,
  })
}

export async function getParaswapTransactionData({
  amountOut,
  srcToken,
  srcDecimals,
  destToken,
  destDecimals,
  network,
  userAddress,
  deadline,
  maxSlippage = MAX_SLIPPAGE,
}: {
  amountOut: string
  srcToken: string
  srcDecimals: number
  destToken: string
  destDecimals: number
  network: Network
  userAddress: string
  deadline: number
  maxSlippage?: number
}) {
  const route = await fetchExactOutRate(amountOut, srcToken, srcDecimals, destToken, destDecimals, network, userAddress)
  return fetchExactOutTxParams(
    route,
    srcToken,
    srcDecimals,
    destToken,
    destDecimals,
    network,
    userAddress,
    maxSlippage,
    deadline,
  )
}
