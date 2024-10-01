import { useRecoilState } from "recoil";
import { rarityStatus, colorStatus } from "@/recoil/market/atom";
import { rarityList, colorNameList } from "@/constants/rarity";
import { useMemo } from "react";
import { GemStandard } from "@/types";

export const useFilteredList = (gemList: GemStandard[]) => {
  const [raritySelected] = useRecoilState(rarityStatus);
  const [colorSelected] = useRecoilState(colorStatus);

  let isRaritySelected = false;
  let isColorSelected = false;
  for (let item in raritySelected) {
    if (raritySelected[item] === true) isRaritySelected = true;
  }
  for (let item in colorSelected) {
    if (colorSelected[item] === true) isColorSelected = true;
  }

  const activeList = useMemo(
    () =>
      !isRaritySelected && !isColorSelected
        ? gemList
        : isRaritySelected && !isColorSelected
          ? gemList?.filter(
              (item: GemStandard) =>
                raritySelected[rarityList[Number(item.rarity)]] === true
            )
          : !isRaritySelected && isColorSelected
            ? gemList?.filter(
                (item: GemStandard) =>
                  colorSelected[colorNameList[item.color[0]]] === true ||
                  colorSelected[colorNameList[item.color[1]]] === true
              )
            : isRaritySelected && isColorSelected
              ? gemList?.filter(
                  (item: GemStandard) =>
                    raritySelected[rarityList[Number(item.rarity)]] === true &&
                    (colorSelected[colorNameList[item.color[0]]] === true ||
                      colorSelected[colorNameList[item.color[1]]] === true)
                )
              : [],
    [gemList, raritySelected, colorSelected]
  );
  return { activeGemList: activeList };
};
