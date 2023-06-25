import { BigNumberZeroDecimal } from '@aave/math-utils'
import { utils } from 'ethers'
import { NetworkID, ParaSwap } from 'paraswap'
import { OptimalRate, SwapSide } from 'paraswap-core'
import { NETWORK_TO_CHAIN_ID, Network } from '../../networks'

const PARTNER = 'spritzfinance'
const MAX_SLIPPAGE = 0.5 // 0.5%

type SwapRateParams = {
  inputAmount: string
  outputAmount: string
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
  const paraswap = new ParaSwap(NETWORK_TO_CHAIN_ID[network] as NetworkID)

  const getRate: Swapper['getRate'] = async ({
    srcToken,
    srcDecimals,
    destToken,
    destDecimals,
    amount,
    userAddress,
  }) => {
    const priceRouteOrError = await paraswap.getRate(
      srcToken,
      destToken,
      amount,
      userAddress,
      SwapSide.BUY,
      { partner: PARTNER },
      srcDecimals,
      destDecimals,
    )

    if ('message' in priceRouteOrError) {
      throw new Error(priceRouteOrError.message)
    }

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
    const srcAmountWithSlippage = new BigNumberZeroDecimal(priceRoute.srcAmount)
      .multipliedBy(100 + maxSlippage)
      .dividedBy(100)
      .toFixed(0)

    const transactionRequestOrError = await paraswap.buildTx(
      srcToken,
      destToken,
      srcAmountWithSlippage,
      priceRoute.destAmount,
      priceRoute,
      user,
      PARTNER,
      undefined,
      undefined,
      undefined,
      { ignoreChecks: true },
      srcDecimals,
      destDecimals,
      undefined,
      deadline.toString(),
    )

    if ('message' in transactionRequestOrError) {
      throw new Error(transactionRequestOrError.message)
    }

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
