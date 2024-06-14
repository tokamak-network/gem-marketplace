import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import MiningIntroModal from "@/components/modal/MiningIntroModal";
import GemCard from "@/components/common/GemCard";

const MinePage = () => {
  const [storedValue,] = useLocalStorage("mineIntro", true);
  const [isGuideModal, setGuideModal] = useState(storedValue);

  const handleGuideModal = () => {
    setGuideModal(false);
  }
  return (
    <Box>
      <MiningIntroModal isOpen={isGuideModal} onClose={handleGuideModal}/>

      <Flex mt={4} gap={4} flexWrap={"wrap"}>
        {Array(12)
          .fill("")
          .map((item, key) => {
            return (
              <GemCard
                key={key}
                rarity="Mythic"
                rarityScore={1}
                staked={253.2}
                dailyChange={16.7}
                lastMineTime={1718315453}
                mode="mine"
              />
            );
          })}
      </Flex>
    </Box>
  )
}

export default MinePage;