import { useRecoilState } from "recoil";
import { rarityStatus, colorStatus, sortParams } from "@/recoil/market/atom";
import { rarityList, colorNameList } from "@/constants/rarity";
import { useMemo } from "react";
import { GemStandard } from "@/types";
import { sortFilterStatus } from "@/recoil/settings/atoms";
import { SortFilterItems } from "@/constants";
import { formatEther } from "viem";

export const useFilteredList = (gemList: GemStandard[]) => {
  const [raritySelected] = useRecoilState(rarityStatus);
  const [colorSelected] = useRecoilState(colorStatus);
  const [sortItem] = useRecoilState(sortFilterStatus);
  const [, setSortParam] = useRecoilState(sortParams);

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

  const sortParam = useMemo(
    () =>
      sortItem === SortFilterItems.DATE_DES
        ? {orderDir: "desc", orderBy: "creationDate"}
        : sortItem === SortFilterItems.DATE_ASC
          ? {orderDir: "asc", orderBy: "creationDate"}
          : sortItem === SortFilterItems.RARITY_DES
            ? {orderDir: "desc", orderBy: "rarity"}
            : sortItem === SortFilterItems.RARITY_ASC
              ? {orderDir: "asc", orderBy: "rarity"}
              : sortItem === SortFilterItems.PRICE_DES
                ? {orderDir: "desc", orderBy: "price"}
                : sortItem === SortFilterItems.PRICE_ASC
                  ? {orderDir: "asc", orderBy: "rarity"}
                  : activeList,
    [tempList, sortItem]
  );

  return { activeGemList: tempList };
};
