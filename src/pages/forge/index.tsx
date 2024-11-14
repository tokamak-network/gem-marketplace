import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

import ForgingIntroModal from "@/components/modal/ForgingIntroModal";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import GemCard from "@/components/common/GemCard";
import { useGetUserGems } from "@/hooks/useGetUserGems";
import { useFilteredList } from "@/hooks/useFilteredList";
import { GemStandard } from "@/types";
import BuyRecommendModal from "@/components/modal/BuyRecommendModal";

const ForgePage = () => {
  const [storedValue] = useLocalStorage("forge-guide", true);
  const [isGuideModal, setGuideModal] = useState(storedValue);
  const { result: gemListForUser } = useGetUserGems();
  const { activeGemList } = useFilteredList(gemListForUser);
  const [isBuyRecommendModal, setBuyRecommendModal] = useState<boolean>(false);

  useEffect(() => {
    activeGemList.length > 0
      ? setBuyRecommendModal(false)
      : setBuyRecommendModal(true);
  }, [activeGemList]);

  return (
    <Box>
      <ForgingIntroModal
        isOpen={isGuideModal && activeGemList && activeGemList.length > 0}
        onClose={() => setGuideModal(false)}
      />

      <BuyRecommendModal
        mode={"forging"}
        isOpen={isBuyRecommendModal}
        onClose={() => setBuyRecommendModal(false)}
      />

      {/* <ForgeContainer /> */}

      <Flex mt={"72px"} gap={4} flexWrap={"wrap"}>
        {activeGemList &&
          activeGemList.length > 0 &&
          activeGemList.map((item: GemStandard, key: number) => {
            return <GemCard mode="forge" key={key} gemInfo={item} />;
          })}
      </Flex>
    </Box>
  );
};

export default ForgePage;
