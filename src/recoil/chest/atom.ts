import { atom } from "recoil";

export const sellGemModalStatus = atom<boolean>({
  key: "sellGemModalStatus",
  default: false,
});

export const burnGemModalStatus = atom<boolean>({
  key: "burnModalStatus",
  default: false,
});