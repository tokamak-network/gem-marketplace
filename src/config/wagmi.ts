import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { titan, thanos_sepolia, titan_sepolia } from "./tokamakProvider";
import { injected, metaMask, safe } from "wagmi/connectors";
import { createPublicClient } from "viem";

export const config = createConfig({
  chains: [titan_sepolia, sepolia],
  connectors: [
    injected(),
    // metaMask(),
    safe(),
  ],
  transports: {
    // [mainnet.id]: http(),
    // [titan.id]: http(),
    [titan_sepolia.id]: http(),
    [sepolia.id]: http(),
    // [thanos_sepolia.id] : http()
  },
});

export const publicClient = createPublicClient({
  chain: titan_sepolia,
  transport: http(),
});
