import { atom } from "recoil";
import { SortFilterItems } from "@/constants";

export const settingsContainerStatus = atom<boolean>({
  key: "settingsContainerStatus",
  default: false
})

export const sortFilterStatus = atom<SortFilterItems>({
  key: "sortFilterStatus",
  default: SortFilterItems.DATE
})