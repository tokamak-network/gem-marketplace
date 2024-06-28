export enum PieceDir {
  topLeft = "topLeft",
  topRight = "topRight",
  bottomLeft = "bottomLeft",
  bottomRight = "bottomRight",
}

export enum RarityType {
  BASE = "base",
  COMMON = "common",
  RARE = "rare",
  UNIQUE = "unique",
  EPIC = "epic",
  LEGENDARY = "legendary",
  MYTHIC = "mythic",
  HEIRLOOM = "heirloom",
}

export type PieceInfo = {
  [PieceDir.topLeft]: number;
  [PieceDir.topRight]: number;
  [PieceDir.bottomLeft]: number;
  [PieceDir.bottomRight]: number;
};

export type GradientType = "solid" | "linear" | "gradient";

export type GemStandard = {
  id: number;
  topLeft: number;
  topRight: number;
  bottomLeft: number;
  bottomRight: number;
  gemBgColor: string[];
  lastMineTime: number;
  rarity: RarityType;
};
