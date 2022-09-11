import { ethers } from 'ethers'
import { SupportedNetwork } from '../networks'
import { isAcceptedPaymentToken } from '../supportedTokens'
import { getPaymentToken } from '../tokens'
import { fiatString } from '../utils/format'
import { formatPaymentReference } from '../utils/reference'
import { UniswapV2Quoter } from '../quotes/uniswap/uniswapV2Quoter'
import { getSpritzContract, SpritzPayMethod } from '../contracts/contracts'
import { getContractAddress } from '../addresses'

interface SpritzPaySDKConstructorArgs {
  network: SupportedNetwork
  provider: ethers.providers.BaseProvider
  staging: boolean
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
    return 'payWithSwap'
  }

  public tokenPaymentArgs(tokenAddress: string, fiatAmount: string | number, reference: string): any {
    const token = getPaymentToken(this.network, tokenAddress)
    const amount = ethers.utils.parseUnits(fiatString(fiatAmount), token.decimals)
    return [tokenAddress, amount, formatPaymentReference(reference)]
  }

  public async swapPaymentArgs(
    sourceTokenAddress: string,
    fiatAmount: string | number,
    reference: string,
  ): Promise<any> {
    const uniswapQuoter = new UniswapV2Quoter(this.network, this.provider)
    const result = await uniswapQuoter.getPayWithSwapArgs(sourceTokenAddress, fiatAmount, reference)
    return result
  }

  public async getPaymentArgs(
    tokenAddress: string,
    fiatAmount: string | number,
    reference: string,
  ): Promise<{ method: any; args: any }> {
    const method = this.getContractMethodForPayment(tokenAddress)

    let args

    if (method == 'payWithToken') {
      args = this.tokenPaymentArgs(tokenAddress, fiatAmount, reference)
    } else if (method === 'payWithSwap') {
      args = await this.swapPaymentArgs(tokenAddress, fiatAmount, reference)
    } else {
      throw new Error('Unable to construct payment call')
    }

    return {
      method,
      args,
    }
  }
}
