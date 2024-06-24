export enum PieceDir {
  topLeft = "topLeft",
  topRight = "topRight",
  bottomLeft = "bottomLeft",
  bottomRight = "bottomRight"
};

export type PieceInfo = {
  [PieceDir.topLeft]: number,
  [PieceDir.topRight]: number,
  [PieceDir.bottomLeft]: number,
  [PieceDir.bottomRight]: number,
}

export type GradientType = "solid" | "linear" | "gradient";