import { ethers } from 'ethers'
import { getContractAddress } from '../addresses'
import { getSpritzContract, SpritzPayMethod } from '../contracts'
import { SupportedNetwork } from '../networks'
import { PayWithSwapArgsResult, UniswapV2Quoter } from '../quotes/uniswap/uniswapV2Quoter'
import { UniswapV3Quoter } from '../quotes/uniswapv3'
import { isAcceptedPaymentToken } from '../supportedTokens'
import { getPaymentToken } from '../tokens'
import { fiatString } from '../utils/format'
import { formatPaymentReference } from '../utils/reference'

interface SpritzPaySDKConstructorArgs {
  network: SupportedNetwork
  provider: ethers.providers.BaseProvider
  staging?: boolean
}

export class SpritzPaySDK {
  private network: SupportedNetwork
  provider: ethers.providers.BaseProvider
  staging: boolean

  constructor({ network, provider, staging = false }: SpritzPaySDKConstructorArgs) {
    if (!network) throw new Error(`Network must be provided`)
    if (!provider) throw new Error(`Provider missing`)
    this.network = network
    this.provider = provider
    this.staging = staging
  }

  public getContractAddress(): string {
    return getContractAddress(this.network, this.staging)
  }

  public getContract() {
    return getSpritzContract(this.network, this.staging)
  }

  public getContractMethodForPayment(tokenAddress: string): SpritzPayMethod {
    if (isAcceptedPaymentToken(tokenAddress, this.network)) return 'payWithToken'
    // if (isV3SwapNetwork(this.network)) return 'payWithV3Swap'
    return 'payWithSwap'
  }

  public getTokenPaymentData(tokenAddress: string, fiatAmount: string | number, reference: string): any {
    const token = getPaymentToken(this.network, tokenAddress)
    const amount = ethers.utils.parseUnits(fiatString(fiatAmount), token.decimals)
    return { args: [tokenAddress, amount, formatPaymentReference(reference)] }
  }

  public getSwapPaymentData(
    sourceTokenAddress: string,
    fiatAmount: string | number,
    reference: string,
  ): Promise<PayWithSwapArgsResult> {
    const uniswapQuoter = new UniswapV2Quoter(this.network, this.provider)
    return uniswapQuoter.getPayWithSwapArgs(sourceTokenAddress, fiatAmount, reference)
  }

  public getV3SwapPaymentData(sourceTokenAddress: string, fiatAmount: string | number, reference: string) {
    const uniswapQuoter = new UniswapV3Quoter(this.network, this.provider)
    return uniswapQuoter.getPayWithSwapArgs(sourceTokenAddress, fiatAmount, reference)
  }

  public async getPaymentArgs(
    tokenAddress: string,
    fiatAmount: string | number,
    reference: string,
  ): Promise<{ method: SpritzPayMethod; args: any[]; data?: any }> {
    let result: { method: SpritzPayMethod; args: any[]; data?: any } = {
      method: this.getContractMethodForPayment(tokenAddress),
      args: [],
    }

    if (result.method == 'payWithToken') {
      const data = this.getTokenPaymentData(tokenAddress, fiatAmount, reference)
      result = { ...result, ...data }
    } else if (result.method === 'payWithSwap') {
      const data = await this.getSwapPaymentData(tokenAddress, fiatAmount, reference)
      result = { ...result, ...data }
    } else {
      throw new Error('Unable to construct payment call')
    }

    return result
  }
}
