import { BackgroundColorType } from "@/types";

export function getGemCardBackground(backgroundColor: BackgroundColorType) {
  const { r, g, b, blur, dropShadow } = backgroundColor;
  function rgbToHex([r, g, b]: number[]) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
  }
  const gradient = `linear-gradient(to bottom right, ${rgbToHex([r[0], g[0], b[0]])}, ${rgbToHex([r[1], g[1], b[1]])})`;
  return {
    gradient,
    dropShadow,
    blur,
  };
}
