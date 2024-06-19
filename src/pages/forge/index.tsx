import GemCard from "@/components/common/GemCard";
import ForgingIntroModal from "@/components/modal/ForgingIntroModal";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";

const ForgePage = () => {
  const [storedValue] = useLocalStorage("forge-guide", true);
  const [isGuideModal, setGuideModal] = useState(storedValue);

  return (
    <Box>
      <ForgingIntroModal
        isOpen={isGuideModal}
        onClose={() => setGuideModal(false)}
      />
      <Flex mt={4} gap={4} flexWrap={"wrap"}>
        {Array(12)
          .fill("")
          .map((item, key) => {
            return (
              <GemCard
              mode="forge"
                key={key}
                rarity="Mythic"
                rarityScore={1}
                staked={253.2}
                dailyChange={16.7}
              />
            );
          })}
      </Flex>
    </Box>
  );
};

export default ForgePage;
