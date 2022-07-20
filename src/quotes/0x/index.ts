import { Token } from '@uniswap/sdk-core'
import axios from 'axios'
import { BigNumber } from 'ethers'
import { getPaymentWalletAddress } from '../../addresses'
import { PayWithSwapV2Args } from '../../contracts'
import { Network, SupportedNetwork } from '../../networks'
import { isNativeAddress } from '../../tokens'
import { fiatString, FiatValue, fiatValueToBigNumber } from '../../utils/format'
import { formatPaymentReference } from '../../utils/reference'
import { ZeroExQuoteResponse } from './types'

export class ZeroExQuoter {
  private network: SupportedNetwork
  private paymentToken: Token

  constructor(paymentToken: Token, network: SupportedNetwork) {
    this.network = network
    this.paymentToken = paymentToken
  }

  public async getAggregatedSwapQuote(
    sourceTokenAddress: string,
    paymentAmount: FiatValue,
    paymentReference: string,
  ): Promise<PayWithSwapV2Args> {
    const data = await this.getQuote(paymentAmount, sourceTokenAddress)

    //TODO: figure out how much to actually transfer
    const guaranteedSellAmount = BigNumber.from(data.sellAmount).div(100).mul(102).toString()

    const args: PayWithSwapV2Args = [
      getPaymentWalletAddress(this.network),
      sourceTokenAddress,
      guaranteedSellAmount,
      this.paymentToken.address,
      data.buyAmount,
      data.allowanceTarget,
      data.to,
      data.data,
      formatPaymentReference(paymentReference),
      {
        gasPrice: data.gasPrice as string,
        value: data.value,
        // gasLimit: ethers.BigNumber.from(data.gas).mul(50).div(10).toString(),
      },
    ]

    return args
  }

  private async getQuote(fiatAmount: FiatValue, sourceTokenAddress: string) {
    let nativeToken = 'ETH'
    let domain = ''
    const buyAmount = fiatValueToBigNumber(fiatString(fiatAmount), this.paymentToken.decimals)
    const isNative = isNativeAddress(sourceTokenAddress)

    switch (this.network) {
      case Network.Polygon:
        nativeToken = 'MATIC'
        domain = 'polygon'
        break
      // case ChainId.Ropsten:
      //   domain = 'ropsten'
      //   break
      //   case Network.Ethereum:
      //     domain = 'api'
      //     break
    }

    const { data } = await axios.get<ZeroExQuoteResponse>(`https://${domain}.api.0x.org/swap/v1/quote`, {
      params: {
        buyToken: this.paymentToken.address,
        buyAmount: buyAmount.toString(),
        sellToken: isNative ? nativeToken : sourceTokenAddress,
      },
    })

    return data
  }
}
