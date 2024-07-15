import { atom } from "recoil";

export const settingsContainerStatus = atom<boolean>({
  key: "settingsContainerStatus",
  default: false
})
