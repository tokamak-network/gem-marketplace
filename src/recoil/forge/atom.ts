import { atom, selector } from "recoil";
import { GemStandard } from "@/types";
import { RarityType } from "@/types";

export type SelectedForgeGemType = {
  firstSelectedGem: GemStandard | null;
  secondSelectedGem: GemStandard | null;
};

type SelectedGemsType = {
  selectedRarity: RarityType;
  selectedGemsList: GemStandard[];
};

export const selectedForgeGem = atom<SelectedForgeGemType>({
  key: "selectedForgeGem",
  default: {
    firstSelectedGem: null,
    secondSelectedGem: null,
  },
});

export const selectedForgeGems = atom<SelectedGemsType>({
  key: "selectedForgeGems",
  default: {
    selectedRarity: RarityType.NONE,
    selectedGemsList: [],
  },
});

export const forgeConfirmModalStatus = atom<boolean>({
  key: "forgeConfirmModalStatus",
  default: false,
});

export const forgeSuccessModalStatus = atom<boolean>({
  key: "forgeSuccessModalStatus",
  default: false,
});

export const forgeResultSelector = selector<{
  forgeResultList: number[];
}>({
  key: "forgeResultSelector",
  get: ({ get }) => {
    const raritySelected = get(selectedForgeGems);
    const { selectedRarity, selectedGemsList } = raritySelected;

    let sumOfQuadrants: number[] = [0,0,0,0];
    let forgedQuadrants: number[] = [0,0,0,0];
    if (
      Object.keys(RarityType).indexOf(selectedRarity) + 1 ===
      selectedGemsList.length
    ) {
      for (let item of selectedGemsList) {
        sumOfQuadrants[0] += item.quadrants[0];
        sumOfQuadrants[1] += item.quadrants[1];
        sumOfQuadrants[2] += item.quadrants[2];
        sumOfQuadrants[3] += item.quadrants[3];
      }
      console.log({sumOfQuadrants});

      sumOfQuadrants[0] %= 2;
      sumOfQuadrants[1] %= 2;
      sumOfQuadrants[2] %= 2;
      sumOfQuadrants[3] %= 2;


      let baseValue = Object.keys(RarityType).indexOf(selectedRarity) + 2;

      if (
        (sumOfQuadrants[0] === 1 &&
          sumOfQuadrants[1] === 1 &&
          sumOfQuadrants[2] === 1 &&
          sumOfQuadrants[3] === 1) ||
        (sumOfQuadrants[0] === 0 &&
          sumOfQuadrants[1] === 0 &&
          sumOfQuadrants[2] === 0 &&
          sumOfQuadrants[3] === 0)
      ) {
        forgedQuadrants[0] = forgedQuadrants[1] = forgedQuadrants[2] = forgedQuadrants[3] = baseValue;
      }
      else {
        for (let i = 0; i < 4; i++) {
          forgedQuadrants[i] = baseValue + sumOfQuadrants[i];
        }
      }
    }
    return { forgeResultList: forgedQuadrants };
  },
});
