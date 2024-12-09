import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

import ForgingIntroModal from "@/components/modal/ForgingIntroModal";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import GemCard from "@/components/common/GemCard";
import { useGetUserGems } from "@/hooks/useGetUserGems";
import { useFilteredList } from "@/hooks/useFilteredList";
import { GemStandard } from "@/types";
import BuyRecommendModal from "@/components/modal/BuyRecommendModal";
import { selectedForgeGems } from "@/recoil/forge/atom";
import { colorStatus, rarityStatus } from "@/recoil/market/atom";
import { RarityType } from "@/types";
import { useRecoilState } from "recoil";

const ForgePage = () => {
  const [storedValue] = useLocalStorage("forge-guide", true);
  const [isGuideModal, setGuideModal] = useState(storedValue);
  const { result: gemListForUser } = useGetUserGems();
  const { activeGemList } = useFilteredList(gemListForUser);
  const [isBuyRecommendModal, setBuyRecommendModal] = useState<boolean>(false);
  const [, setSelectedGemsInfo] = useRecoilState(selectedForgeGems);
  const [, setRarityState] = useRecoilState(rarityStatus);
  const [, setColorState] = useRecoilState(colorStatus);
  
  useEffect(() => {
    gemListForUser && gemListForUser.length && gemListForUser.length > 0
      ? setBuyRecommendModal(false)
      : setBuyRecommendModal(true);
  }, [gemListForUser]);

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

  return (
    <Box>
      <ForgingIntroModal
        isOpen={isGuideModal && gemListForUser && gemListForUser.length > 0}
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
