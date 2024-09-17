import { atom } from "recoil";

export const sellGemModalStatus = atom<{
  isOpen: boolean,
  tokenID: number
}>({
  key: "sellGemModalStatus",
  default: {
    isOpen: false,
    tokenID: 0
  },
});

export const burnGemModalStatus = atom<boolean>({
  key: "burnModalStatus",
  default: false,
});