export enum SupportedChainId {
  // MAINNET = 1,
  // TITAN = 55004,
  SEPOLIA = 11155111,
  // THANOS_SEPOLIA = 111551118080,
  TITAN_SEPOLIA = 55007,
}

export type Network = {
  id: number;
  name: string;
  icon: string;
}