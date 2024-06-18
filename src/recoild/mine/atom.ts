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