import { BuildTxInput, OptimalRate, constructSimpleSDK } from '@paraswap/sdk'
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

enum SwapSide {
  BUY = 'BUY',
  SELL = 'SELL',
}

export type SwapTransactionParams = SwapRateParams & {
  swapCallData: string
}

function increaseByPercentage(amount: BigNumber, percentageIncrease: number, decimals: number): string {
  const increaseFactor = utils.parseUnits((1 + percentageIncrease / 100).toString(), decimals)

  const increasedAmount = amount.mul(increaseFactor).div(BigNumber.from(10).pow(decimals))

  return increasedAmount.toString()
}

function decreaseByPercentage(amount: BigNumber, percentageDecrease: number, decimals: number): string {
  const decreaseFactor = utils.parseUnits((1 - percentageDecrease / 100).toString(), decimals)

  const decreasedAmount = amount.mul(decreaseFactor).div(BigNumber.from(10).pow(decimals))

  return decreasedAmount.toString()
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
    expectedOutput: string
  }>
}

const ExactOutSwapper = (network: Network) => {
  const version = network === Network.Binance ? '5' : '6.2'
  const paraswap = constructSimpleSDK({
    chainId: NETWORK_TO_CHAIN_ID[network],
    axios,
    version,
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
        excludeDEXS: ['ParaSwapPool', 'ParaSwapLimitOrders', 'Cables'],
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
        expectedOutput: priceRoute.destAmount,
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

const ExactInSwapper = (network: Network) => {
  const version = network === Network.Binance ? '5' : '6.2'
  const paraswap = constructSimpleSDK({
    chainId: NETWORK_TO_CHAIN_ID[network],
    axios,
    version,
  })

  const getRate: Swapper['getRate'] = async ({
    srcToken,
    srcDecimals,
    destToken,
    destDecimals,
    amount,
    userAddress,
  }) => {
    const excludeDEXS =
      network === Network.Polygon
        ? { includeDEXS: ['Uniswap', 'Balancer', 'UniswapV2', 'UniswapV3', 'QuickSwap'] }
        : { excludeDEXS: ['ParaSwapPool', 'ParaSwapLimitOrders'] }
    const config = {
      srcToken,
      destToken,
      amount,
      userAddress,
      side: SwapSide.SELL,
      options: {
        partner: PARTNER,
        ...excludeDEXS,
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
    const destAmountWithSlippage = decreaseByPercentage(BigNumber.from(priceRoute.destAmount), maxSlippage, srcDecimals)

    const config = {
      srcToken,
      destToken,
      srcAmount: priceRoute.srcAmount,
      destAmount: destAmountWithSlippage,
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
        requiredInput: priceRoute.srcAmount,
        expectedOutput: destAmountWithSlippage,
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

async function fetchExactInTxParams(
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
  const swapper = ExactInSwapper(network)
  const { swapCallData, requiredInput, expectedOutput } = await swapper.getTransactionParams({
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
    outputAmount: expectedOutput,
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

async function fetchExactInRate(
  amount: string,
  srcToken: string,
  srcDecimals: number,
  destToken: string,
  destDecimals: number,
  network: Network,
  userAddress: string,
): Promise<OptimalRate> {
  const swapper = ExactInSwapper(network)

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

export async function getParaswapExactInTransactionData({
  amountIn,
  srcToken,
  srcDecimals,
  destToken,
  destDecimals,
  network,
  userAddress,
  deadline,
  maxSlippage = MAX_SLIPPAGE,
}: {
  amountIn: string
  srcToken: string
  srcDecimals: number
  destToken: string
  destDecimals: number
  network: Network
  userAddress: string
  deadline: number
  maxSlippage?: number
}) {
  const route = await fetchExactInRate(amountIn, srcToken, srcDecimals, destToken, destDecimals, network, userAddress)
  return fetchExactInTxParams(
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
