import { SpritzPaySDK } from './index'
import { Network } from '../networks'
import { ethers } from 'ethers'

import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path'
import { NATIVE_ZERO_ADDRESS } from '../supportedTokens'
import { ChainId } from '../quotes/uniswap/uniswap-v2-sdk'

dotenvConfig({ path: resolve(__dirname, '../../.env') })

describe('SpritzPaySDK', () => {
  describe('Polygon', () => {
    const WBTC_POLYGON_ADDRESS = '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6'
    const AAVE_POLYGON_ADDRESS = '0xD6DF932A45C0f255f85145f286eA0b292B21C90B'

    const sdk = new SpritzPaySDK({
      network: Network.Polygon,
      provider: new ethers.providers.JsonRpcProvider(
        `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_POLYGON_MAINNET_KEY}`,
        ChainId.POLYGON,
      ),
      staging: true,
    })

    it('should provide swap quote', async () => {
      const args = await sdk.getPaymentArgs(WBTC_POLYGON_ADDRESS, 100, 'abcdef1234')
      console.log(args)
    })

    it('should provide multihop swap quote', async () => {
      const args = await sdk.getPaymentArgs(AAVE_POLYGON_ADDRESS, 100, 'abcdef1234')
      console.log(args)
    })

    it('should provide native swap quote', async () => {
      const args = await sdk.getPaymentArgs(NATIVE_ZERO_ADDRESS, 100, 'abcdef1234')
      console.log(args)
    })
  })

  describe('Binance', () => {
    const CAKE_BSC_ADDRESS = '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82'

    const sdk = new SpritzPaySDK({
      network: Network.Binance,
      provider: new ethers.providers.JsonRpcProvider(
        `https://alien-multi-field.bsc.quiknode.pro/${process.env.QUICKNODE_BSC_KEY}/`,
        ChainId.BINANCE,
      ),
      staging: true,
    })

    it('should provide multihop swap quote', async () => {
      const args = await sdk.getPaymentArgs(CAKE_BSC_ADDRESS, 100, 'abcdef1234')
      console.log(args)
    })

    it('should provide native swap quote', async () => {
      const args = await sdk.getPaymentArgs(NATIVE_ZERO_ADDRESS, 100, 'abcdef1234')
      console.log(args)
    })
  })
})
