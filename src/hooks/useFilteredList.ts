import { useRecoilState } from "recoil";
import { rarityStatus } from "@/recoil/market/atom";
import { useGetMargetGems } from "./useGetMargetGems";
import { rarityList } from "@/constants/rarity";
import { useMemo } from "react";
import { GemStandard } from "@/types";

export const useFilteredList = (gemList: GemStandard[]) => {
  const [raritySelected] = useRecoilState(rarityStatus);

  const activeList = useMemo(
    () =>
      gemList?.filter(
        (item: GemStandard) =>
          raritySelected[rarityList[Number(item.rarity)]] === true
      ),
    [gemList, raritySelected]
  );

  for (let item in raritySelected) {
    if (raritySelected[item] === true) return { activeGemList: activeList };
  }

  return { activeGemList: gemList };
};
