"use client";

import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import MiningIntroModal from "@/components/modal/MiningIntroModal";
import GemCard from "@/components/common/GemCard";
import { useGetUserMineGems } from "@/hooks/useGetUserGems";
import { GemStandard, RarityType } from "@/types";
import { useFilteredList } from "@/hooks/useFilteredList";
import BuyRecommendModal from "@/components/modal/BuyRecommendModal";
import { useRecoilState } from "recoil";
import { selectedForgeGems } from "@/recoil/forge/atom";
import { colorStatus, rarityStatus } from "@/recoil/market/atom";

const MinePage = () => {
  const [storedValue] = useLocalStorage("mine-guide", true);
  const [isGuideModal, setGuideModal] = useState(storedValue);
  const gemsList = useGetUserMineGems();
  const { activeGemList } = useFilteredList(gemsList);
  const [isBuyRecommendModal, setBuyRecommendModal] = useState<boolean>(false);
  const [, setSelectedGemsInfo] = useRecoilState(selectedForgeGems);
  const [, setRarityState] = useRecoilState(rarityStatus);
  const [, setColorState] = useRecoilState(colorStatus);

  useEffect(() => {
    gemsList && gemsList.length && gemsList.length > 0
      ? setBuyRecommendModal(false)
      : setBuyRecommendModal(true);
  }, [gemsList]);

  useEffect(() => {
    setSelectedGemsInfo({
      selectedRarity: RarityType.none,
      selectedGemsList: [],
    });
    setRarityState({
      common: false,
      rare: false,
      unique: false,
      epic: false,
      legendary: false,
      mythic: false,
    });
    setColorState({
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
    })
  }, []);

  const handleGuideModal = () => {
    setGuideModal(false);
  };
  return (
    <>
      <MiningIntroModal
        isOpen={isGuideModal && gemsList && gemsList.length > 0}
        onClose={handleGuideModal}
      />

      <BuyRecommendModal
        mode={"mining"}
        isOpen={isBuyRecommendModal}
        onClose={() => setBuyRecommendModal(false)}
      />

      <Flex mt={4} gap={4} flexWrap={"wrap"}>
        {activeGemList &&
          activeGemList.length > 0 &&
          activeGemList.map((item: GemStandard, key: number) => {
            return <GemCard mode="mine" key={key} gemInfo={item} />;
          })}
      </Flex>
    </>
  );
};

export default MinePage;
