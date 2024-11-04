import { atom } from "recoil";
import { FilterItems } from "@/constants";

export const settingsContainerStatus = atom<boolean>({
  key: "settingsContainerStatus",
  default: false
})

export const filterStatus = atom<FilterItems>({
  key: "filterStatus",
  default: FilterItems.DATE
})