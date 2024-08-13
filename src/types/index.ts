export enum PieceDir {
  topLeft = "topLeft",
  topRight = "topRight",
  bottomLeft = "bottomLeft",
  bottomRight = "bottomRight",
}

export enum RarityType {
  BASE = "BASE",
  COMMON = "COMMON",
  RARE = "RARE",
  UNIQUE = "UNIQUE",
  EPIC = "EPIC",
  LEGENDARY = "LEGENDARY",
  MYTHIC = "MYTHIC",
  HEIRLOOM = "HEIRLOOM",
  NONE = "none"
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
  quadrants: number[];
  gemColor: string[];
  lastMineTime: number;
  rarity: RarityType;
  isMining?: boolean | null;
};

export type ActivityFilterType = "all" | "mine" | "forge" | "buysell";

export enum ImageFileType {
  JPEG = ".jpg",
  PNG = ".png",
  SVG = ".svg",
}

export type CardType = "market" | "forge" | "mine" | "common" | "normal" | "chest" | "forgeFinal";