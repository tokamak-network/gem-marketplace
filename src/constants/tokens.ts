import { SupportedChainId } from "@/types/network/supportedNetworks";
import { MAINNET_CONTRACTS, TITAN_SEPOLIA_CONTRACTS, TOKAMAK_CONTRACTS } from "./contracts";

export const TON_ADDRESS_BY_CHAINID: Record<number, string> = {
  [SupportedChainId.MAINNET]: MAINNET_CONTRACTS.TON_ADDRESS,
  [SupportedChainId.TITAN]: TOKAMAK_CONTRACTS.TON_ADDRESS,
  [SupportedChainId.TITAN_SEPOLIA]: TITAN_SEPOLIA_CONTRACTS.TON_ADDRESS,
};

export const WSWTON_ADDRESS_BY_CHAINID:Record<number, string> = {
  [SupportedChainId.MAINNET]: "",
  [SupportedChainId.TITAN_SEPOLIA]: "0x256Cf034962292C111436F43e5d92a9EC24dcD3C",
  [SupportedChainId.THANOS_SEPOLIA]: ""
}