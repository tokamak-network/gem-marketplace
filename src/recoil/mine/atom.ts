import { atom } from "recoil";

type MiningModalStatus = {
  isOpen: boolean;
  mineTime?: number;
}

type MiningResultStatus = {
  isOpen: boolean;
  minedGemId?: number;
};

type CooldownPeriods = {
  [rareCooldown: string]: number;
  epicCooldown: number;
  uniqueCooldown: number;
  legendaryCooldown: number;
  mythicCooldown: number;
}

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

export const cooldownStatus = atom<CooldownPeriods>({
  key: "cooldownStatus",
  default: {
    rareCooldown: 0,
    epicCooldown: 0,
    uniqueCooldown: 0,
    legendaryCooldown: 0,
    mythicCooldown: 0
  }
})