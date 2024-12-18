import { atom, selector } from "recoil";

type RarityStatusType = {
  [common: string]: boolean | "";
  rare: boolean | "";
  unique: boolean | "";
  epic: boolean | "";
  legendary: boolean | "";
  mythic: boolean | "";
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

export const StakingIndex = atom<number>({
  key: "stakingIndex",
  default: 1
})

type PriceList = {
  eth_price: number,
  ton_price: number
}

export const priceListStatus = atom<PriceList>({
  key: "PriceStatus",
  default: {
    eth_price: 0,
    ton_price: 0
  }
})

type UserNumbers = {
  [common: string]: number,
  rare: number,
  unique: number,
  epic: number,
  legendary: number,
  mythic: number
}

export const numberOfRarityUsers = atom<UserNumbers>({
  key: "numberOfUsers",
  default: {
    "common": 0,
    "rare": 0, 
    "unique": 0,
    "epic": 0,
    "legendary": 0,
    "mythic": 0
  }
})

export const numberOfRarityGemsAvailable = atom<UserNumbers>({
  key: "numberOfRarityGemsAvailable",
  default: {
    "common": 0,
    "rare": 0, 
    "unique": 0,
    "epic": 0,
    "legendary": 0,
    "mythic": 0
  }
})