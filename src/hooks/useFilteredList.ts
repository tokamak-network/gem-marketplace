import { useRecoilState } from "recoil";
import { rarityStatus } from "@/recoil/market/atom";
import { useGetMargetGems } from "./useGetMargetGems";

export const useFilteredList = () => {
  const gemList = useGetMargetGems();

  const [raritySelected] = useRecoilState(rarityStatus);
  const activeRarityList = gemList?.filter(
    (item: any) => raritySelected[item.rarity] === true
  );
  for (let item in raritySelected) {
    if (raritySelected[item] === true) return { activeRarityList };
  }
  return { activeGemList: gemList };
}