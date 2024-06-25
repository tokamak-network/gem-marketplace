'use client';

import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import MiningIntroModal from "@/components/modal/MiningIntroModal";
import GemCard from "@/components/common/GemCard";
import { GemList } from "@/constants";

const MinePage = () => {
  const [storedValue] = useLocalStorage("mine-guide", true);
  const [isGuideModal, setGuideModal] = useState(storedValue);

  const handleGuideModal = () => {
    setGuideModal(false);
  };
  return (
    <>
      <MiningIntroModal isOpen={isGuideModal} onClose={handleGuideModal} />

      <Flex mt={4} gap={4} flexWrap={"wrap"}>
        {GemList.map((item, key) => {
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
