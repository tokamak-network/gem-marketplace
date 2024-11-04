import { useRecoilState } from "recoil";
import { rarityStatus, colorStatus } from "@/recoil/market/atom";
import { rarityList, colorNameList } from "@/constants/rarity";
import { useMemo } from "react";
import { GemStandard } from "@/types";
import { sortFilterStatus } from "@/recoil/settings/atoms";
import { SortFilterItems } from "@/constants";

export const useFilteredList = (gemList: GemStandard[]) => {
  const [raritySelected] = useRecoilState(rarityStatus);
  const [colorSelected] = useRecoilState(colorStatus);
  const [sortItem] = useRecoilState(sortFilterStatus);

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

  let tempList = useMemo(
    () => (activeList && activeList.length > 0 ? [...activeList] : []),
    [activeList]
  );

  const sortedList = useMemo(
    () =>
      sortItem === SortFilterItems.DATE
        ? tempList.sort((a, b) => b.creationDate - a.creationDate)
        : activeList,
    [tempList, sortItem]
  );
  tempList?.sort((a, b) => b.creationDate - a.creationDate);
  return { activeGemList: sortedList };
};
