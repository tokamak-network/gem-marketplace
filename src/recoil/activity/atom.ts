import { atom } from "recoil";

import { ActivityFilterType } from "@/types";

export const activityContainerStatus = atom<boolean>({
  key: "activityContainerStatus",
  default: false
})

export const activityFilterStatus = atom<ActivityFilterType>({
  key: "activityFilterStatus",
  default: "all"
})