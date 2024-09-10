import { atom, selector } from "recoil";
import { GemList } from "@/constants";
import { GemStandard } from "@/types";

type RarityStatusType = {
  [common: string]: boolean | "";
  rare: boolean | "";
  unique: boolean | "";
  epic: boolean | "";
  legendary: boolean | "";
  mythic: boolean | "";
  heirloom: boolean | "";
};

export const rarityStatus = atom<RarityStatusType>({
  key: "rarityStatus",
  default: {
    common: false,
    rare: false,
    unique: false,
    epic: false,
    legendary: false,
    mythic: false,
    heirloom: false,
  },
});

type ColorStatusType = {
  [ruby: string]: boolean;
  amber: boolean;
  topaz: boolean;
  emerald: boolean;
  turquoise: boolean;
  sapphire: boolean;
  amethyst: boolean;
  garnet: boolean;
  diamond: boolean;
  onyx: boolean;
};

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
  },
});

export const gemPackModalStatus = atom<boolean>({
  key: "gemPackModalStatus",
  default: false,
});

type ObtainModalStatusType = {
  isOpen: boolean;
  gemId?: number;
}

export const obtainModalStatus = atom<ObtainModalStatusType>({
  key: "obtainModalStatus",
  default: {
    isOpen: false,
    gemId: 0,
  },
});

export const activeRarityListSelector = selector<{
  activeRarityList: GemStandard[];
}>({
  key: "activeRarityListSelector",
  get: ({ get }) => {
    const raritySelected = get(rarityStatus);
    const activeRarityList = GemList.filter(
      (item) => raritySelected[item.rarity.toLocaleLowerCase()] === true
    );
    for (let item in raritySelected) {
      if (raritySelected[item] === true) return { activeRarityList };
    }
    return { activeRarityList: GemList };
  },
});
