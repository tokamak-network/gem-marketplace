import TON from "@/assets/icon/ton.svg";
import Thanos from "@/assets/icon/network/thanos_circle.svg";
import ETHIcon from "@/assets/icon/network/ethereum_circle.svg"
import { TON_ADDRESS_BY_CHAINID, WSWTON_ADDRESS_BY_CHAINID } from "./tokens";

export const tokenList = [
  {
    symbol: "ETH",
    address: "",
    icon: ETHIcon
  },
  {
    symbol: "TON",
    address: TON_ADDRESS_BY_CHAINID,
    icon: TON
  },
  {
    symbol: "ThanosWSTON",
    address: WSWTON_ADDRESS_BY_CHAINID,
    icon: Thanos
  },
]

export const cooldownIndex: string[] = [
  "",
  "rareCooldown",
  "uniqueCooldown",
  "epicCooldown",
  "legendaryCooldown",
  "mythicCooldown",
];

export const miningPeriodIndex: string[] = [
  "",
  "rareMiningPeriod",
  "uniqueMiningPeriod",
  "epicMiningPeriod",
  "legendaryMiningPeriod",
  "mythicMiningPeriod",
];


export enum SortFilterItems {
  DATE_DES = "Newest",
  DATE_ASC = "Oldest",
  RARITY_DES = "Rarity Low - High",
  RARITY_ASC = "Rarity High - Low",
  PRICE_DES = "Price Low - High",
  PRICE_ASC = "Price High - Low",
  // SAVED = "Saved"
}

export const filterItemList = [
  SortFilterItems.DATE_DES,
  SortFilterItems.DATE_ASC,
  SortFilterItems.RARITY_DES,
  SortFilterItems.RARITY_ASC,
  SortFilterItems.PRICE_DES,
  SortFilterItems.PRICE_ASC,
  // SortFilterItems.SAVED,
]

export const TON_FEES_RATE_DIVIDER = 10000;
export const GemContractAddress = "0x38C36199174fD7CAf762a63Fc455D83c00790492";