import { atom } from "recoil";
import { GemStandard } from "@/types";
import { RarityType } from "@/types";

export type SelectedForgeGemType = {  
  firstSelectedGem: GemStandard | null,
  secondSelectedGem: GemStandard | null
}

type SelectedGemsType = {
  selectedRarity: RarityType;
  selectedGemsList: GemStandard[];
}

export const selectedForgeGem = atom<SelectedForgeGemType>({
  key: "selectedForgeGem",
  default: {
    firstSelectedGem: null,
    secondSelectedGem: null
  }
})

export const selectedForgeGems = atom<SelectedGemsType>({
  key: "selectedForgeGems",
  default: {
    selectedRarity: RarityType.NONE,
    selectedGemsList: []
  }
})

export const forgeConfirmModalStatus = atom<boolean>({
  key: "forgeConfirmModalStatus",
  default: false
})

export const forgeSuccessModalStatus = atom<boolean>({
  key: "forgeSuccessModalStatus",
  default: false
})