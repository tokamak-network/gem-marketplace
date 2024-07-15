import { atom } from "recoil";

type LeaderboardStatusType = {
  [overall: string]: boolean;
  mine: boolean;
  forge: boolean;
  value: boolean;
  myself: boolean;
};

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