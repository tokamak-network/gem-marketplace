import { http, createConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { titan, thanos_sepolia } from './tokamakProvider'
import { injected, metaMask, safe } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, titan, thanos_sepolia],
  connectors: [
    injected(),
    // metaMask(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [titan.id]: http(),
    [thanos_sepolia.id] : http()
  },
})