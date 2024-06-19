import { atom } from "recoil";

type MiningModalStatus = {
  isOpen: boolean;
  mineTime?: number;
}

export const miningModalStatus = atom<MiningModalStatus>({
  key: "mineModalStatus",
  default: {
    isOpen: false,
    mineTime: 0
  }
});

export const miningResultStatus = atom<MiningModalStatus>({
  key: "mineResultStatus",
  default: {
    isOpen: false,
    mineTime: 0
  }
});