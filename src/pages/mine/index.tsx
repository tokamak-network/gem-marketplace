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
      <GemCard
          rarity="Mythic"
          rarityScore={1}
          staked={253.2}
          dailyChange={39}
          lastMineTime={1718349237}
          mode="mine"
        />
        {GemList.map((item, key) => {
          return (
            <GemCard
              mode="mine"
              key={key}
              rarity="Mythic"
              rarityScore={1}
              staked={253.2}
              dailyChange={16.7}
              lastMineTime={1719201869}
              pieces={{
                topLeft: item.topLeft,
                topRight: item.topRight,
                bottomLeft: item.bottomLeft,
                bottomRight: item.bottomRight,
              }}
              gemBgColor={item.gemBgColor}
            />
          );
        })}
      </Flex>
    </>
  );
};

export default MinePage;
