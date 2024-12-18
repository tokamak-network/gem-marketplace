import { atom } from "recoil";

export const sellGemModalStatus = atom<{
  isOpen: boolean;
  tokenID: number;
}>({
  key: "sellGemModalStatus",
  default: {
    isOpen: false,
    tokenID: 0,
  },
});

export const burnGemModalStatus = atom<{
  isOpen: boolean;
  tokenID: number;
}>({
  key: "burnModalStatus",
  default: {
    isOpen: false,
    tokenID: 0,
  },
});

export const sellSuccessModalStatus = atom<boolean>({
  key: "SellSuccessModalStatus",
  default: false,
});

type MeltSuccessModal = {
  isOpen: boolean;
  txLink: string;
}
export const meltSuccessModalStatus = atom<MeltSuccessModal>({
  key: "MeltSuccessModalStatus",
  default: {
    isOpen: false,
    txLink: ""
  },
});
