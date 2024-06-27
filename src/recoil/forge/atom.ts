import { atom } from "recoil";
import { GemStandard } from "@/types";

export type SelectedForgeGemType = {  
  firstSelectedGem: GemStandard | null,
  secondSelectedGem: GemStandard | null
}

export const selectedForgeGem = atom<SelectedForgeGemType>({
  key: "selectedForgeGem",
  default: {
    firstSelectedGem: null,
    secondSelectedGem: null
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