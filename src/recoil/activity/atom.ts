import { atom } from "recoil";

import { ActivityFilterType } from "@/types";

export enum ActivityFilter {
  ALL = "all",
  MINE = "mine",
  FORGE = "forge",
  BUYSELL = "buy/sell"
}

export const activityFilterList = [
  ActivityFilter.ALL,
  ActivityFilter.MINE,
  ActivityFilter.FORGE,
  ActivityFilter.BUYSELL,
]

export const activityContainerStatus = atom<boolean>({
  key: "activityContainerStatus",
  default: false
})

export const activityFilterStatus = atom<ActivityFilter>({
  key: "activityFilterStatus",
  default: ActivityFilter.ALL
})