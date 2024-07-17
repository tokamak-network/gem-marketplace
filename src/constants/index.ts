import { GemStandard, RarityType } from "@/types";

export const COOLDOWN = 60 * 60 * 24; // 1 day

export const GemList: GemStandard[] = [
  { id: 1, rarity: RarityType.EPIC, topLeft: 5, topRight: 5, bottomLeft: 5, bottomRight: 5, gemBgColor: ["#05E0FE", "#0D6CFA"], lastMineTime: 1721180401, isMining: null },
  { id: 2, rarity: RarityType.UNIQUE, topLeft: 4, topRight: 4, bottomLeft: 4, bottomRight: 4, gemBgColor: ["#0075FF", "#AD00FF"], lastMineTime: 1721180401, isMining: null  },
  { id: 3, rarity: RarityType.RARE, topLeft: 3, topRight: 3, bottomLeft: 3, bottomRight: 4, gemBgColor: ["#428EFF", "#012AFF"], lastMineTime: 1721180401, isMining: false  },
  { id: 4, rarity: RarityType.RARE, topLeft: 3, topRight: 4, bottomLeft: 3, bottomRight: 4, gemBgColor: ["#0094FF"], lastMineTime: 1719447784, isMining: true  },
  { id: 5, rarity: RarityType.UNIQUE, topLeft: 5, topRight: 5, bottomLeft: 4, bottomRight: 5, gemBgColor: ["#FF008A"], lastMineTime: 1721180401, isMining: false   },
  { id: 6, rarity: RarityType.LEGENDARY, topLeft: 6, topRight: 6, bottomLeft: 6, bottomRight: 7, gemBgColor: ["#0094FF"], lastMineTime: 1719447784, isMining: false  },
  { id: 7, rarity: RarityType.EPIC, topLeft: 6, topRight: 6, bottomLeft: 5, bottomRight: 5, gemBgColor: ["#05E0FE", "#0D6CFA"], lastMineTime: 1719447784, isMining: null   },
  { id: 8, rarity: RarityType.COMMON, topLeft: 3, topRight: 2, bottomLeft: 2, bottomRight: 2, gemBgColor: ["#05FED1", "#0DFA88"], lastMineTime: 1719447784, isMining: true   },
  { id: 9, rarity: RarityType.BASE, topLeft: 1, topRight: 1, bottomLeft: 1, bottomRight: 1, gemBgColor: ["#0094FF"], lastMineTime: 1719982751, isMining: true   },
  { id: 10, rarity: RarityType.MYTHIC, topLeft: 7, topRight: 7, bottomLeft: 7, bottomRight: 7, gemBgColor: ["#FFB801", "#AE01FF"], lastMineTime: 1719982751, isMining: true  },
  { id: 11, rarity: RarityType.UNIQUE, topLeft: 4, topRight: 4, bottomLeft: 4, bottomRight: 5, gemBgColor: ["#05E0FE", "#0D6CFA"], lastMineTime: 1719982751, isMining: true  },
  { id: 12, rarity: RarityType.COMMON, topLeft: 2, topRight: 3, bottomLeft: 3, bottomRight: 3, gemBgColor: ["#05E0FE", "#0D6CFA"], lastMineTime: 1719982751, isMining: false  },
  { id: 13, rarity: RarityType.UNIQUE, topLeft: 4, topRight: 5, bottomLeft: 4, bottomRight: 4, gemBgColor: ["#05E0FE", "#0D6CFA"], lastMineTime: 1721180401, isMining: false  },
  { id: 14, rarity: RarityType.RARE, topLeft: 3, topRight: 3, bottomLeft: 4, bottomRight: 4, gemBgColor: ["#61FF00", "#4299FF"], lastMineTime: 1719208712, isMining: true  },
];
