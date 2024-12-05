import { Chain } from "wagmi/chains";

export const titan = {
  id: 55004,
  name: "Titan",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: [process.env.NEXT_PUBLIC_TITAN_RPC as string] },
    default: { http: [process.env.NEXT_PUBLIC_TITAN_RPC as string] },
  },
  blockExplorers: {
    etherscan: {
      name: "Titan Mainnet Explorer",
      url: process.env.NEXT_PUBLIC_TITAN_BLOCKEXPLORER as string,
    },
    default: {
      name: "Titan Mainnet Explorer",
      url: process.env.NEXT_PUBLIC_TITAN_BLOCKEXPLORER as string,
    },
  },
} as const satisfies Chain;

export const titan_sepolia = {
  id: 55007,
  name: "Titan Sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: [process.env.NEXT_PUBLIC_TITAN_SEPOLIA_RPC as string] },
    default: { http: [process.env.NEXT_PUBLIC_TITAN_SEPOLIA_RPC as string] },
  },
  blockExplorers: {
    etherscan: {
      name: "BlockScout",
      url: "https://explorer.titan-sepolia.tokamak.network",
    },
    default: {
      name: "BlockScout",
      url: "https://explorer.titan-sepolia.tokamak.network",
    },
  },
} as const satisfies Chain;

export const thanos_sepolia = {
  id: 111551119090,
  name: "Thanos Sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "TON",
    symbol: "TON",
  },
  rpcUrls: {
    public: { http: [process.env.NEXT_PUBLIC_THANOS_SEPOLIA_RPC as string] },
    default: { http: [process.env.NEXT_PUBLIC_THANOS_SEPOLIA_RPC as string] },
  },
  blockExplorers: {
    etherscan: {
      name: "BlockScout",
      url: "https://explorer.thanos-sepolia.tokamak.network",
    },
    default: {
      name: "BlockScout",
      url: "https://explorer.thanos-sepolia.tokamak.network",
    },
  },
} as const satisfies Chain;

export const mainnet = {
  id: 1,
  name: "Ethereum",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: [process.env.NEXT_PUBLIC_ETHEREUM_RPC as string] },
    default: { http: [process.env.NEXT_PUBLIC_ETHEREUM_RPC as string] },
  },
  blockExplorers: {
    etherscan: {
      name: "Etherscan",
      url: "https://etherscan.io",
    },
    default: {
      name: "Etherscan",
      url: "https://etherscan.io",
    },
  },
} as const satisfies Chain;

export const sepolia = {
  id: 11155111,
  name: "Sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: [process.env.NEXT_PUBLIC_SEPOLIA_RPC as string] },
    default: { http: [process.env.NEXT_PUBLIC_SEPOLIA_RPC as string] },
  },
  blockExplorers: {
    etherscan: {
      name: "Etherscan-Sepolia",
      url: "https://sepolia.etherscan.io/",
    },
    default: {
      name: "Etherscan-Sepolia",
      url: "https://sepolia.etherscan.io/",
    },
  },
} as const satisfies Chain;
