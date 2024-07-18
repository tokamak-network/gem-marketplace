import { atom } from "recoil";

type LeaderboardStatusType = {
  [overall: string]: boolean;
  mine: boolean;
  forge: boolean;
  value: boolean;
  myself: boolean;
};

type EpochStatusType = {
  [all: string]: boolean;
  "1Y": boolean;
  "1M": boolean;
  "7D": boolean;
  "24H": boolean;
}

export const LeaderboardStatus = atom<LeaderboardStatusType>({
  key: "leaderboardStatus",
  default: {
    overall: true,
    mine: false,
    forge: false,
    value: false,
    myself: false,
  },
});

export const epochStatus = atom<EpochStatusType>({
  key: "epochStatus",
  default: {
    all: true,
    "1Y": false,
    "1M": false,
    "7D": false,
    "24H": false,
  },
});