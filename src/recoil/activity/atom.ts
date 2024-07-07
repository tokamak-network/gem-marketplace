import { atom } from "recoil";

export const activityContainerStatus = atom<boolean>({
  key: "activityContainerStatus",
  default: false
})