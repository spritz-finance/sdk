import { BuildTxInput, constructSimpleSDK } from '@paraswap/sdk'
import { GetRateInput } from '@paraswap/sdk/dist/methods/swap/rates'
import axios from 'axios'
import { BigNumber, utils } from 'ethers'
import { NETWORK_TO_CHAIN_ID, Network } from '../../networks'

export class SwapRateError extends Error {
  public details: GetRateInput | undefined

  constructor(message?: string, details?: GetRateInput) {
    super(message)
    this.details = details

    Object.setPrototypeOf(this, SwapRateError.prototype)
  }
}

export class TransactionError extends Error {
  public details: BuildTxInput | undefined

  constructor(message?: string, details?: BuildTxInput) {
    super(message)
    this.details = details

    Object.setPrototypeOf(this, TransactionError.prototype)
  }
}

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

function increaseByPercentage(amount: BigNumber, percentageIncrease: number, decimals: number): string {
  const increaseFactor = utils.parseUnits((1 + percentageIncrease / 100).toString(), decimals)

  const increasedAmount = amount.mul(increaseFactor).div(BigNumber.from(10).pow(decimals))

  return increasedAmount.toString()
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
  const paraswap = constructSimpleSDK({
    chainId: NETWORK_TO_CHAIN_ID[network],
    axios,
    apiURL: 'https://apiv5.paraswap.io',
  })

  const getRate: Swapper['getRate'] = async ({
    srcToken,
    srcDecimals,
    destToken,
    destDecimals,
    amount,
    userAddress,
  }) => {
    const config = {
      srcToken,
      destToken,
      amount,
      userAddress,
      side: SwapSide.BUY,
      options: {
        partner: PARTNER,
        includeDexes: [
          'Uniswap',
          'Kyber',
          '0x',
          'MultiPath',
          'MegaPath',
          'Curve',
          'Curve3',
          'Saddle',
          'UniswapV2',
          'Balancer',
          'SushiSwap',
          'PancakeSwap',
          'PancakeSwapV2',
          'QuickSwap',
          'UniswapV3',
          'OneInchLP',
          'CurveV2',
        ],
        excludeDEXS: ['ParaSwapPool', 'ParaSwapLimitOrders', 'Hashflow'],
      },
      srcDecimals,
      destDecimals,
    }

    try {
      const priceRouteOrError = await paraswap.swap.getRate(config)
      return priceRouteOrError
    } catch (e: any) {
      const error = e.message
      const message = error ? `Failed to get swap rate with error: ${error}` : 'Failed to get swap rate'
      throw new SwapRateError(message, config)
    }
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
    const srcAmountWithSlippage = increaseByPercentage(BigNumber.from(priceRoute.srcAmount), maxSlippage, srcDecimals)
    console.log({ src: priceRoute.srcAmount, srcAmountWithSlippage })

    const config = {
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
    }

    try {
      const transactionRequestOrError = await paraswap.swap.buildTx(config, { ignoreChecks: true })

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
    } catch (e: any) {
      console.log(e)
      const error = e.message
      const message = error ? `Failed to build transaction with error: ${error}` : 'Failed to build transaction'
      throw new TransactionError(message, config)
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
