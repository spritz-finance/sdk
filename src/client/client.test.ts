import { SpritzPaySDK } from './index'
import { Network } from '../networks'
import { ethers } from 'ethers'

const WBTC_POLYGON_ADDRESS = '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6'
const AAVE_POLYGON_ADDRESS = '0xD6DF932A45C0f255f85145f286eA0b292B21C90B'

describe('SpritzPaySDK', () => {
  const sdk = new SpritzPaySDK({
    network: Network.Polygon,
    provider: new ethers.providers.JsonRpcProvider(
      `https://polygon-mainnet.g.alchemy.com/v2/gl3dK8sSOYbnYkzH-DGSjWG46dCVwCJ5`,
      137,
    ),
    staging: true,
  })

  it('should provide swap quote', async () => {
    const args = await sdk.getPaymentArgs(WBTC_POLYGON_ADDRESS, 20.35, 'abcdef1234')
    console.log(args)
  })

  it('should provide multihop swap quote', async () => {
    const args = await sdk.getPaymentArgs(AAVE_POLYGON_ADDRESS, 20.35, 'abcdef1234')
    console.log(args)
  })
})
