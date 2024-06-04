import { atom, selector } from "recoil";

type RarityType = {
  [base: string]: boolean,
  common: boolean,
  uncommon: boolean,
  rare: boolean,
  epic: boolean,
  legendary: boolean,
  mythic: boolean,
  heirloom: boolean
}

export const rarityStatus = atom<RarityType>({
  key: "rarityStatus",
  default: {
    base: true,
    common: true,
    uncommon: true,
    rare: true,
    epic: true,
    legendary: true,
    mythic: true,
    heirloom: true
  }
})