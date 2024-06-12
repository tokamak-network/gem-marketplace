import { atom, selector } from "recoil";

type RarityStatusType = {
  [base: string]: boolean | "",
  common: boolean | "",
  uncommon: boolean | "",
  rare: boolean | "",
  epic: boolean | "",
  legendary: boolean | "",
  mythic: boolean | "",
  heirloom: boolean | ""
}

export const rarityStatus = atom<RarityStatusType>({
  key: "rarityStatus",
  default: {
    base: false,
    common: false,
    uncommon: false,
    rare: false,
    epic: false,
    legendary: false,
    mythic: false,
    heirloom: false
  }
})

type ColorStatusType = {
  [ruby: string]: boolean;
  amber: boolean,
  topaz: boolean,
  emerald: boolean,
  turquoise: boolean,
  sapphire: boolean,
  amethyst: boolean,
  garnet: boolean,
  diamond: boolean,
  onyx: boolean,
}

export const colorStatus = atom<ColorStatusType>({
  key: "colorStatus",
  default: {
    ruby: false,
    amber: false,
    topaz: false,
    emerald: false,
    turquoise: false,
    sapphire: false,
    amethyst: false,
    garnet: false,
    diamond: false,
    onyx: false,
  }
})

export const gemPackModalStatus = atom<boolean>({
  key: "gemPackModalStatus",
  default: false
})