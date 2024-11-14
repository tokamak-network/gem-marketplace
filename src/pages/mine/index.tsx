"use client";

import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import MiningIntroModal from "@/components/modal/MiningIntroModal";
import GemCard from "@/components/common/GemCard";
import { useGetUserMineGems } from "@/hooks/useGetUserGems";
import { GemStandard } from "@/types";
import { useFilteredList } from "@/hooks/useFilteredList";
import BuyRecommendModal from "@/components/modal/BuyRecommendModal";

const MinePage = () => {
  const [storedValue] = useLocalStorage("mine-guide", true);
  const [isGuideModal, setGuideModal] = useState(storedValue);
  const gemsList = useGetUserMineGems();
  const { activeGemList } = useFilteredList(gemsList);
  const [isBuyRecommendModal, setBuyRecommendModal] = useState<boolean>(false);

  useEffect(() => {
    gemsList && gemsList.length && gemsList.length > 0
      ? setBuyRecommendModal(false)
      : setBuyRecommendModal(true);
  }, [gemsList]);

  const handleGuideModal = () => {
    setGuideModal(false);
  };
  return (
    <>
      <MiningIntroModal isOpen={isGuideModal && gemsList && gemsList.length > 0} onClose={handleGuideModal} />

      <BuyRecommendModal
        mode={"mining"}
        isOpen={isBuyRecommendModal}
        onClose={() => setBuyRecommendModal(false)}
      />

      <Flex mt={4} gap={4} flexWrap={"wrap"}>
        {activeGemList &&
          activeGemList.length > 0 &&
          activeGemList.map((item: GemStandard, key: number) => {
            return (
              <GemCard
                mode="mine"
                key={key}
                gemInfo={item}
              />
            );
          })}
      </Flex>
    </>
  );
};

export default MinePage;
