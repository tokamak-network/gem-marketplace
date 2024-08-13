import { GemStandard, RarityType } from "@/types";
import TON from "@/assets/icon/ton.svg";
import Thanos from "@/assets/icon/network/thanos_circle.svg";
import { TON_ADDRESS_BY_CHAINID, WSWTON_ADDRESS_BY_CHAINID } from "./tokens";

export const GemList: GemStandard[] = [
  { id: 1, rarity: RarityType.EPIC, quadrants:[5,5,5,5], gemBgColor: ["#05E0FE", "#0D6CFA"], lastMineTime: 1721245218, isMining: null },
  { id: 2, rarity: RarityType.UNIQUE, quadrants:[4,4,4,4], gemBgColor: ["#0075FF", "#AD00FF"], lastMineTime: 1721245218, isMining: null  },
  { id: 3, rarity: RarityType.RARE, quadrants:[3,3,3,4], gemBgColor: ["#428EFF", "#012AFF"], lastMineTime: 1721245218, isMining: false  },
  { id: 4, rarity: RarityType.RARE, quadrants:[3,4,3,4], gemBgColor: ["#0094FF"], lastMineTime: 1719447784, isMining: true  },
  { id: 5, rarity: RarityType.UNIQUE, quadrants:[5,5,4,5], gemBgColor: ["#FF008A"], lastMineTime: 1721245218, isMining: false   },
  { id: 6, rarity: RarityType.LEGENDARY, quadrants:[6,6,6,7], gemBgColor: ["#0094FF"], lastMineTime: 1719447784, isMining: false  },
  { id: 7, rarity: RarityType.EPIC, quadrants:[6,6,5,5], gemBgColor: ["#05E0FE", "#0D6CFA"], lastMineTime: 1719447784, isMining: null   },
  { id: 8, rarity: RarityType.COMMON, quadrants:[3,2,2,2], gemBgColor: ["#05FED1", "#0DFA88"], lastMineTime: 1719447784, isMining: true   },
  { id: 9, rarity: RarityType.BASE, quadrants:[1,1,1,1], gemBgColor: ["#0094FF"], lastMineTime: 1719982751, isMining: true   },
  { id: 10, rarity: RarityType.MYTHIC, quadrants:[7,7,7,7], gemBgColor: ["#FFB801", "#AE01FF"], lastMineTime: 1719982751, isMining: true  },
  { id: 11, rarity: RarityType.UNIQUE, quadrants:[4,4,4,5], gemBgColor: ["#05E0FE", "#0D6CFA"], lastMineTime: 1719982751, isMining: true  },
  { id: 12, rarity: RarityType.COMMON, quadrants:[2,3,3,3], gemBgColor: ["#05E0FE", "#0D6CFA"], lastMineTime: 1719982751, isMining: false  },
  { id: 13, rarity: RarityType.UNIQUE, quadrants:[4,5,4,4], gemBgColor: ["#05E0FE", "#0D6CFA"], lastMineTime: 1721245218, isMining: false  },
  { id: 14, rarity: RarityType.RARE, quadrants:[3,3,4,4], gemBgColor: ["#61FF00", "#4299FF"], lastMineTime: 1719208712, isMining: true  },
  { id: 15, rarity: RarityType.RARE, quadrants:[3,3,4,4], gemBgColor: ["#61FF00", "#4299FF"], lastMineTime: 1719208712, isMining: true  },
  { id: 16, rarity: RarityType.RARE, quadrants:[3,3,4,4], gemBgColor: ["#61FF00", "#4299FF"], lastMineTime: 1719208712, isMining: true  },
  { id: 17, rarity: RarityType.RARE, quadrants:[3,3,4,4], gemBgColor: ["#61FF00", "#4299FF"], lastMineTime: 1719208712, isMining: true  },
  { id: 18, rarity: RarityType.RARE, quadrants:[3,3,4,4], gemBgColor: ["#61FF00", "#4299FF"], lastMineTime: 1719208712, isMining: true  },
  { id: 19, rarity: RarityType.RARE, quadrants:[3,3,4,4], gemBgColor: ["#61FF00", "#4299FF"], lastMineTime: 1719208712, isMining: true  },
  { id: 20, rarity: RarityType.RARE, quadrants:[3,3,4,4], gemBgColor: ["#61FF00", "#4299FF"], lastMineTime: 1719208712, isMining: true  },
  { id: 21, rarity: RarityType.RARE, quadrants:[3,3,4,4], gemBgColor: ["#61FF00", "#4299FF"], lastMineTime: 1719208712, isMining: true  },
  { id: 22, rarity: RarityType.RARE, quadrants:[3,3,4,4], gemBgColor: ["#61FF00", "#4299FF"], lastMineTime: 1719208712, isMining: true  },
  { id: 23, rarity: RarityType.COMMON, quadrants:[3,2,2,3], gemBgColor: ["#05FED1", "#0DFA88"], lastMineTime: 1719447784, isMining: true   },
];

export const COOLDOWN = 60 * 60 * 24;

export const tokenList = [
  {
    symbol: "TON",
    address: [],
    icon: TON
  },
  {
    symbol: "WSWTON",
    address: WSWTON_ADDRESS_BY_CHAINID,
    icon: Thanos
  },
]