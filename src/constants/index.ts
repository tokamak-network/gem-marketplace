import { GemStandard, RarityType } from "@/types";
import TON from "@/assets/icon/ton.svg";
import Thanos from "@/assets/icon/network/thanos_circle.svg";
import ETHIcon from "@/assets/icon/network/ethereum_circle.svg"
import { TON_ADDRESS_BY_CHAINID, WSWTON_ADDRESS_BY_CHAINID } from "./tokens";

export const GemList: GemStandard[] = [
  // { id: 1, rarity: RarityType.EPIC, quadrants:[5,5,5,5], color: ["#05E0FE", "#0D6CFA"], lastMineTime: 1721245218, isMining: null },
  // { id: 2, rarity: RarityType.UNIQUE, quadrants:[4,4,4,4], color: ["#0075FF", "#AD00FF"], lastMineTime: 1721245218, isMining: null  },
  // { id: 3, rarity: RarityType.RARE, quadrants:[3,3,3,4], color: ["#428EFF", "#012AFF"], lastMineTime: 1721245218, isMining: false  },
  // { id: 4, rarity: RarityType.RARE, quadrants:[3,4,3,4], color: ["#0094FF"], lastMineTime: 1719447784, isMining: true  },
  // { id: 5, rarity: RarityType.UNIQUE, quadrants:[5,5,4,5], color: ["#FF008A"], lastMineTime: 1721245218, isMining: false   },
  // { id: 6, rarity: RarityType.LEGENDARY, quadrants:[6,6,6,7], color: ["#0094FF"], lastMineTime: 1719447784, isMining: false  },
  // { id: 7, rarity: RarityType.EPIC, quadrants:[6,6,5,5], color: ["#05E0FE", "#0D6CFA"], lastMineTime: 1719447784, isMining: null   },
  // { id: 8, rarity: RarityType.COMMON, quadrants:[3,2,2,2], color: ["#05FED1", "#0DFA88"], lastMineTime: 1719447784, isMining: true   },
  // { id: 12, rarity: RarityType.COMMON, quadrants:[2,3,3,3], color: ["#05E0FE", "#0D6CFA"], lastMineTime: 1719982751, isMining: false  },
  // { id: 23, rarity: RarityType.COMMON, quadrants:[3,2,2,3], color: ["#4299FF", "#FFB801"], lastMineTime: 1719447784, isMining: true   },
  // { id: 10, rarity: RarityType.MYTHIC, quadrants:[7,7,7,7], color: ["#FFB801", "#AE01FF"], lastMineTime: 1719982751, isMining: true  },
  // { id: 11, rarity: RarityType.UNIQUE, quadrants:[4,4,4,5], color: ["#05E0FE", "#0D6CFA"], lastMineTime: 1719982751, isMining: true  },
  // { id: 13, rarity: RarityType.UNIQUE, quadrants:[4,5,4,4], color: ["#05E0FE", "#0D6CFA"], lastMineTime: 1721245218, isMining: false  },
  // { id: 14, rarity: RarityType.RARE, quadrants:[3,3,4,4], color: ["#61FF00", "#4299FF"], lastMineTime: 1719208712, isMining: true  },
  // { id: 15, rarity: RarityType.RARE, quadrants:[3,3,4,4], color: ["#61FF00", "#4299FF"], lastMineTime: 1719208712, isMining: true  },
  // { id: 16, rarity: RarityType.RARE, quadrants:[3,3,4,4], color: ["#61FF00", "#4299FF"], lastMineTime: 1719208712, isMining: true  },
  // { id: 17, rarity: RarityType.RARE, quadrants:[3,3,4,4], color: ["#61FF00", "#4299FF"], lastMineTime: 1719208712, isMining: true  },
  // { id: 18, rarity: RarityType.RARE, quadrants:[3,3,4,4], color: ["#61FF00", "#4299FF"], lastMineTime: 1719208712, isMining: true  },
  // { id: 19, rarity: RarityType.RARE, quadrants:[3,3,4,4], color: ["#61FF00", "#4299FF"], lastMineTime: 1719208712, isMining: true  },
  // { id: 20, rarity: RarityType.RARE, quadrants:[3,3,4,4], color: ["#61FF00", "#4299FF"], lastMineTime: 1719208712, isMining: true  },
  // { id: 21, rarity: RarityType.RARE, quadrants:[3,3,4,4], color: ["#61FF00", "#4299FF"], lastMineTime: 1719208712, isMining: true  },
  // { id: 22, rarity: RarityType.RARE, quadrants:[3,3,4,4], color: ["#61FF00", "#4299FF"], lastMineTime: 1719208712, isMining: true  },
];

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
    symbol: "TITANWSTON",
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