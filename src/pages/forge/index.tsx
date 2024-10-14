import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

import ForgingIntroModal from "@/components/modal/ForgingIntroModal";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import GemCard from "@/components/common/GemCard";
import { useGetUserGems } from "@/hooks/useGetUserGems";
import { useFilteredList } from "@/hooks/useFilteredList";
import { GemStandard } from "@/types";

const ForgePage = () => {
  const [storedValue] = useLocalStorage("forge-guide", true);
  const [isGuideModal, setGuideModal] = useState(storedValue);
  const { result: gemListForUser } = useGetUserGems();
  const { activeGemList } = useFilteredList(gemListForUser);

  return (
    <Box>
      <ForgingIntroModal
        isOpen={isGuideModal}
        onClose={() => setGuideModal(false)}
      />

      {/* <ForgeContainer /> */}

      <Flex mt={"72px"} gap={4} flexWrap={"wrap"}>
        {activeGemList && activeGemList.length > 0 &&
          activeGemList.map((item: GemStandard, key: number) => {
            return (
              <GemCard
                mode="forge"
                key={key}
                gemInfo={item}
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
