export const rarityList = [
  "common",
  "rare",
  "unique",
  "epic",
  "legendary",
  "mythic",
  "heirloom",
];

export const colorNameList = [
  "ruby",
  "amber",
  "topaz",
  "emerald",
  "turquoise",
  "amethyst",
  "garnet",
  "diamond",
  "onyx"
]

type ColorListType = {
  [ruby: string]: string;
  amber: string,
  topaz: string,
  emerald: string,
  turquoise: string,
  sapphire: string,
  amethyst: string,
  garnet: string,
  diamond: string,
  onyx: string,
}

export const colorList: ColorListType = {
  ruby: "#512B2B",
  amber: "#51402B",
  topaz: "#50512B",
  emerald: "#33512B",
  turquoise: "#2B4D51",
  sapphire: "#2B2C51",
  amethyst: "#402B51",
  garnet: "#512B4D",
  diamond: "#FFFFFF26",
  onyx: "#000000",
};

export const colorBorderList: ColorListType = {
  ruby: "#FF0000",
  amber: "#FF8A00",
  topaz: "#FAFF00",
  emerald: "#33FF00",
  turquoise: "#00E0FF",
  sapphire: "#000AFF",
  amethyst: "#8F00FF",
  garnet: "#FF00E5",
  diamond: "#FFFFFF",
  onyx: "#585858",
};