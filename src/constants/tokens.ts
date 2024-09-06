import { SupportedChainId } from "@/types/network/supportedNetworks";
import { MAINNET_CONTRACTS, TITAN_SEPOLIA_CONTRACTS, TOKAMAK_CONTRACTS } from "./contracts";

export const TON_ADDRESS_BY_CHAINID: Record<number, string> = {
  [SupportedChainId.MAINNET]: MAINNET_CONTRACTS.TON_ADDRESS,
  [SupportedChainId.TITAN]: TOKAMAK_CONTRACTS.TON_ADDRESS,
  [SupportedChainId.TITAN_SEPOLIA]: TITAN_SEPOLIA_CONTRACTS.TON_ADDRESS,
};

export const WSWTON_ADDRESS_BY_CHAINID:Record<number, string> = {
  [SupportedChainId.MAINNET]: "",
  [SupportedChainId.TITAN_SEPOLIA]: TITAN_SEPOLIA_CONTRACTS.WSTON_ADDRESS,
  [SupportedChainId.THANOS_SEPOLIA]: ""
}

export const FACTORY_ADDRESS:Record<number, string> = {
  [SupportedChainId.TITAN_SEPOLIA] : TITAN_SEPOLIA_CONTRACTS.GEMFACTORY,
}

export const MARKETPLACE_ADDRESS:Record<number, string> = {
  [SupportedChainId.TITAN_SEPOLIA] : TITAN_SEPOLIA_CONTRACTS.MARKETPLACE,
}