import { config as dotenvConfig } from 'dotenv'
import { ethers } from 'ethers'
import { resolve } from 'path'
import { Network, getChainId } from '../networks'
import { NATIVE_ZERO_ADDRESS } from '../supportedTokens'
import { SpritzPaySDK } from './index'

dotenvConfig({ path: resolve(__dirname, '../../.env') })

describe('SpritzPaySDK', () => {
  describe('Polygon', () => {
    const WBTC_POLYGON_ADDRESS = '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6'
    const AAVE_POLYGON_ADDRESS = '0xD6DF932A45C0f255f85145f286eA0b292B21C90B'

    const sdk = new SpritzPaySDK({
      network: Network.Polygon,
      provider: new ethers.providers.JsonRpcProvider(
        `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_POLYGON_MAINNET_KEY}`,
        getChainId(Network.Polygon),
      ),
      staging: true,
    })

    it('should provide swap quote', async () => {
      const args = await sdk.getPaymentArgs('payWithSwap', WBTC_POLYGON_ADDRESS, 100, 'abcdef1234')
      console.log(args)
    })

    it('should provide multihop swap quote', async () => {
      const args = await sdk.getPaymentArgs('payWithSwap', AAVE_POLYGON_ADDRESS, 100, 'abcdef1234')
      console.log(args)
    })

    it('should provide native swap quote', async () => {
      const args = await sdk.getPaymentArgs('payWithNativeSwap', NATIVE_ZERO_ADDRESS, 100, 'abcdef1234')
      console.log(args)
    })
  })

  describe('Binance', () => {
    const CAKE_BSC_ADDRESS = '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82'

    const sdk = new SpritzPaySDK({
      network: Network.Binance,
      provider: new ethers.providers.JsonRpcProvider(
        `https://alien-multi-field.bsc.quiknode.pro/${process.env.QUICKNODE_BSC_KEY}/`,
        getChainId(Network.Binance),
      ),
      staging: true,
    })

    it('should provide multihop swap quote', async () => {
      const args = await sdk.getPaymentArgs('payWithSwap', CAKE_BSC_ADDRESS, 100, 'abcdef1234')
      console.log(args)
    })

    it('should provide native swap quote', async () => {
      const args = await sdk.getPaymentArgs('payWithNativeSwap', NATIVE_ZERO_ADDRESS, 100, 'abcdef1234')
      console.log(args)
    })
  })

  describe('Mainnet', () => {
    const WBTC_ADDRESS = '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'

    const sdk = new SpritzPaySDK({
      network: Network.Ethereum,
      provider: new ethers.providers.JsonRpcProvider(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_MAINNET_KEY}`,
        getChainId(Network.Ethereum),
      ),
      staging: true,
    })

    it('should provide swap quote', async () => {
      const args = await sdk.getPaymentArgs('payWithSwap', WBTC_ADDRESS, 100, 'abcdef1234')
      console.log(args)
    })

    it('should provide native swap quote', async () => {
      const args = await sdk.getPaymentArgs('payWithNativeSwap', NATIVE_ZERO_ADDRESS, 100, 'abcdef1234')
      console.log(args)
    })
  })

  describe('Avalanche', () => {
    const EGG_AVALANCHE_ADDRESS = '0x7761e2338b35bceb6bda6ce477ef012bde7ae611'

    const sdk = new SpritzPaySDK({
      network: Network.Avalanche,
      provider: new ethers.providers.JsonRpcProvider(
        `https://avalanche-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
        getChainId(Network.Avalanche),
      ),
      staging: true,
    })

    it('should provide swap quote', async () => {
      const args = await sdk.getPaymentArgs('payWithSwap', EGG_AVALANCHE_ADDRESS, 100, 'abcdef1234')
      console.log(args)
    })

    it('should provide multihop swap quote', async () => {
      const args = await sdk.getPaymentArgs(
        'payWithSwap',
        '0x130966628846bfd36ff31a822705796e8cb8c18d',
        100,
        'abcdef1234',
      )
      console.log(args)
    })

    it('should provide native swap quote', async () => {
      const args = await sdk.getPaymentArgs('payWithNativeSwap', NATIVE_ZERO_ADDRESS, 100, 'abcdef1234')
      console.log(args)
    })
  })
})
