import { ethers } from 'ethers'
import { Network, SupportedNetwork } from './networks'
import { SpritzPayV3__factory } from './contracts'
import { getContractAddress } from './addresses'

const V3_SWAP_NETWORKS = [Network.Ethereum]

export const isV3SwapNetwork = (network: Network) => V3_SWAP_NETWORKS.includes(network)

export async function getSwapModuleAddress(
  network: SupportedNetwork,
  provider: ethers.providers.BaseProvider,
  staging: boolean,
) {
  const address = getContractAddress(network, staging)

  const contract = SpritzPayV3__factory.connect(address, provider)

  const contractAddress = await contract.swapModule()

  return contractAddress
}
