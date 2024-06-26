import Image from "next/image";
import { useState } from "react";
import { Box, Button, Center, Flex } from "@chakra-ui/react";
import { useRecoilState } from "recoil";

import ForgingIntroModal from "@/components/modal/ForgingIntroModal";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import GemCard from "@/components/common/GemCard";
import { GemList } from "@/constants";
import ForgeContainer from "./ForgeContainer";
import {
  selectedForgeGem,
  SelectedForgeGemType,
} from "@/recoil/forge/atom";

const ForgePage = () => {
  const [storedValue] = useLocalStorage("forge-guide", true);
  const [isGuideModal, setGuideModal] = useState(storedValue);
  const [selectedGems] = useRecoilState<SelectedForgeGemType>(selectedForgeGem);

  return (
    <Box>
      <ForgingIntroModal
        isOpen={isGuideModal}
        onClose={() => setGuideModal(false)}
      />

      <ForgeContainer />

      <Flex mt={"72px"} gap={4} flexWrap={"wrap"}>
        {GemList.map((item, key) => {
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
