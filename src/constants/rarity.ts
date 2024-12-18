export const rarityList = [
  "common",
  "rare",
  "unique",
  "epic",
  "legendary",
  "mythic",
];

export const colorNameList = [
  "ruby",
  "amber",
  "topaz",
  "emerald",
  "turquoise",
  "sapphire",
  "amethyst",
  "garnet",
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
};

export const gemColorList: ColorListType = {
  ruby: "#FF001A",
  amber: "#FF5100",
  topaz: "#D9C300",
  emerald: "#00B53F",
  turquoise: "#00DCD1",
  sapphire: "#001EFF",
  amethyst: "#9D00DC",
  garnet: "#FF008A",
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
};