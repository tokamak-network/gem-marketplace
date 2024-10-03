'use client';

import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import MiningIntroModal from "@/components/modal/MiningIntroModal";
import GemCard from "@/components/common/GemCard";
import { useGetUserMineGems } from "@/hooks/useGetUserGems";
import { GemStandard } from "@/types";
import { useFilteredList } from "@/hooks/useFilteredList";

const MinePage = () => {
  const [storedValue] = useLocalStorage("mine-guide", true);
  const [isGuideModal, setGuideModal] = useState(storedValue);
  const gemsList = useGetUserMineGems();
  const { activeGemList } = useFilteredList(gemsList);

  const handleGuideModal = () => {
    setGuideModal(false);
  };
  return (
    <>
      <MiningIntroModal isOpen={isGuideModal} onClose={handleGuideModal} />

      <Flex mt={4} gap={4} flexWrap={"wrap"}>
        {activeGemList?.map((item: GemStandard, key: number) => {
          return (
            <GemCard
              mode="mine"
              key={key}
              rarityScore={1}
              staked={253.2}
              dailyChange={16.7}
              gemInfo={item}
              
            />
          );
        })}
      </Flex>
    </>
  );
};

export default MinePage;
