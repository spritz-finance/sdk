export const networks = {
  polygon: { chainId: 137 as const },
  mainnet: { chainId: 1 as const },
  arbitrum: { chainId: 42161 as const },
  optimism: { chainId: 10 as const },
  avalanche: { chainId: 43114 as const },
  bsc: { chainId: 56 as const },
}

export const CHAIN_ID_TO_NAME: Record<number, keyof typeof networks> = {
  1: 'mainnet',
  10: 'optimism',
  137: 'polygon',
  42161: 'arbitrum',
  43114: 'avalanche',
  56: 'bsc',
}
