import { SupportedChainId } from "@/types/network/supportedNetworks";
import { MAINNET_CONTRACTS, TOKAMAK_CONTRACTS } from "./contracts";

export const TON_ADDRESS_BY_CHAINID: Record<number, string> = {
  [SupportedChainId.MAINNET]: MAINNET_CONTRACTS.TON_ADDRESS,
  [SupportedChainId.TITAN]: TOKAMAK_CONTRACTS.TON_ADDRESS,
};

export const WSWTON_ADDRESS_BY_CHAINID:Record<number, string> = {
  [SupportedChainId.MAINNET]: "",
  [SupportedChainId.TITAN]: "",
  [SupportedChainId.THANOS_SEPOLIA]: ""
}