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
  "1y": boolean;
  "1m": boolean;
  "7d": boolean;
  "24h": boolean;
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
    "1y": false,
    "1m": false,
    "7d": false,
    "24h": false,
  },
});