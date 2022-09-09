import { ethers } from 'ethers'
import { SupportedNetwork } from '../networks'
import { isAcceptedPaymentToken, USDC_POLYGON } from '../supportedTokens'
import { getPaymentToken } from '../tokens'
import { fiatString } from '../utils/format'
import { formatPaymentReference } from '../utils/reference'
import { UniswapV2Quoter } from '../quotes/uniswap/uniswapV2Quoter'
import { SpritzPayMethod } from '../contracts/contracts'

export class SpritzPaySDK {
  constructor(public network: SupportedNetwork, public provider: ethers.providers.BaseProvider) {}

  public contractMethod(tokenAddress: string): SpritzPayMethod {
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
    const result = await uniswapQuoter.getPayWithSwapArgs(sourceTokenAddress, fiatAmount)
    return result
  }

  public async getPaymentArgs(
    tokenAddress: string,
    fiatAmount: string | number,
    reference: string,
  ): Promise<{ method: any; args: any }> {
    const method = this.contractMethod(tokenAddress)

    let args

    if (method == 'payWithToken') {
      args = this.tokenPaymentArgs(tokenAddress, fiatAmount, reference)
    } else if (method === 'payWithSwap') {
      args = await this.swapPaymentArgs(tokenAddress, fiatAmount, reference)
    } else {
      throw new Error('cant')
    }

    return {
      method,
      args,
    }
  }
}
