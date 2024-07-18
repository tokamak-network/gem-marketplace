import { atom } from "recoil";

type MiningModalStatus = {
  isOpen: boolean;
  mineTime?: number;
}

type MiningResultStatus = {
  isOpen: boolean;
  minedGemId?: number;
};

export const miningModalStatus = atom<MiningModalStatus>({
  key: "mineModalStatus",
  default: {
    isOpen: false,
    mineTime: 0
  }
});

export const miningResultStatus = atom<MiningResultStatus>({
  key: "mineResultStatus",
  default: {
    isOpen: false,
    minedGemId: 0
  }
});