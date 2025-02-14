import { gemColorList, rarityList } from "@/constants/rarity";
import { BackgroundColorType, RarityType } from "@/types";

// Helper to convert RGB to hex
export function rgbToHex([r, g, b]: number[]) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

export function getGemCardBackground(backgroundColor: BackgroundColorType) {
  const { r, g, b, blur, dropShadow } = backgroundColor;

  const gradient = `linear-gradient(to bottom right, ${rgbToHex([r[0], g[0], b[0]])}, ${rgbToHex([r[1], g[1], b[1]])})`;
  return {
    gradient,
    dropShadow,
    blur,
  };
}

export function getGemCardBackgroundForForge(
  gemColor: number[],
  rarity: RarityType
) {
  // Validate inputs
  if (!Array.isArray(gemColor) || gemColor.length < 1 || gemColor.length > 2) {
    throw new Error(
      "gemColor must be an array of one or two hex color values."
    );
  }
  if (
    !gemColor.every((color) =>
      /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(
        gemColorList[Object.keys(gemColorList)[gemColor[0]]]
      )
    )
  ) {
    throw new Error("Each gemColor value must be a valid hex color code.");
  }

  // Helper to convert hex to RGB
  function hexToRgb(hex: string) {
    const bigint = parseInt(hex.slice(1), 16);

    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  }

  // Helper to process RGB values
  function processRgb(
    rgb: number[],
    largestValue: number,
    middleRange: number[],
    lowestValue: number
  ) {
    const [r, g, b] = rgb;
    const values = [r, g, b];

    // Identify largest and lowest values
    const largestValueIdx = values.indexOf(Math.max(...values));
    const lowestValueIdx = values.indexOf(Math.min(...values));

    // Handle middle value when there's no clear middle (e.g., 255, 0, 0 or 255, 255, 0)
    const middleValueIdx =
      [0, 1, 2].find((i) => i !== largestValueIdx && i !== lowestValueIdx) ||
      lowestValueIdx;

    const newRgb = [...values];
    newRgb[largestValueIdx] = largestValue;
    newRgb[middleValueIdx] =
      values[middleValueIdx] === values[largestValueIdx]
        ? largestValue
        : values[middleValueIdx] === values[lowestValueIdx]
          ? lowestValue
          : Math.floor(Math.random() * (middleRange[1] - middleRange[0] + 1)) +
            middleRange[0];
    newRgb[lowestValueIdx] = lowestValue;

    return newRgb;
  }

  // Helper for gradients
  function calculateGradient(
    rgb: number[],
    firstLargest: number,
    firstMiddleRange: number[],
    firstLowest: number,
    secondLargest: number,
    secondMiddleRange: number[],
    secondLowest: number
  ) {
    const firstColor = processRgb(
      rgb,
      firstLargest,
      firstMiddleRange,
      firstLowest
    );
    const secondColor = processRgb(
      rgb,
      secondLargest,
      secondMiddleRange,
      secondLowest
    );
    return `linear-gradient(to bottom right, ${rgbToHex(firstColor)}, ${rgbToHex(secondColor)})`;
  }

  // Process gem colors
  function calculateColor(gemColor: number[], rarity: RarityType) {
    const rgb =
      gemColor.length === 2
        ? Number(rarity) === 1 || Number(rarity) === 2
          ? hexToRgb(gemColorList[Object.keys(gemColorList)[gemColor[0]]]).map(
              (value, index) =>
                Number(value) +
                Number(
                  hexToRgb(
                    gemColorList[Object.keys(gemColorList)[gemColor[1]]]
                  )[index]
                )
            )
          : hexToRgb(
              gemColorList[
                Object.keys(gemColorList)[
                  gemColor[Math.floor(Math.random() * 2)]
                ]
              ]
            )
        : hexToRgb(gemColorList[Object.keys(gemColorList)[gemColor[0]]]);

    switch (rarityList[Number(rarity)]) {
      case RarityType.common:
        return {
          gradient: "#191A22",
          dropShadow: false,
          blur: false,
        };
      case RarityType.rare:
        return {
          gradient: rgbToHex(processRgb(rgb, 127, [110, 120], 90)),
          dropShadow: false,
          blur: false,
        };
      case RarityType.unique:
        return {
          gradient: rgbToHex(processRgb(rgb, 150, [80, 120], 50)),
          dropShadow: false,
          blur: false,
        };
      case RarityType.epic:
        return {
          gradient: calculateGradient(
            rgb,
            150,
            [80, 120],
            50,
            100,
            [40, 60],
            0
          ),
          dropShadow: false,
          blur: false,
        };
      case RarityType.legendary:
        return {
          gradient: calculateGradient(
            rgb,
            150,
            [80, 120],
            50,
            100,
            [40, 60],
            0
          ),
          dropShadow: true,
          blur: gemColorList[
            Object.keys(gemColorList)[gemColor[Math.floor(Math.random() * 2)]]
          ],
        };
      case RarityType.mythic:
        const randomGradient = `linear-gradient(to bottom right, ${gemColorList[Object.keys(gemColorList)[gemColor[Math.floor(Math.random() * 2)]]]}, ${rgbToHex(
          [
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 256),
            Math.floor(Math.random() * 256),
          ]
        )})`;
        return {
          gradient: randomGradient,
          dropShadow: true,
          blur: gemColorList[
            Object.keys(gemColorList)[gemColor[Math.floor(Math.random() * 2)]]
          ],
        };
      default:
        return {
          gradient: "#191A22",
          dropShadow: false,
          blur: false,
        };
    }
  }

  return calculateColor(gemColor, rarity);
}
