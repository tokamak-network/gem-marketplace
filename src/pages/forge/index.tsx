import Image from "next/image";
import { useState } from "react";
import { Box, Button, Center, Flex } from "@chakra-ui/react";
import { useRecoilState } from "recoil";

import ForgingIntroModal from "@/components/modal/ForgingIntroModal";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import GemCard from "@/components/common/GemCard";
import ForgeIcon from "@/assets/icon/forge.svg";
import { GemList } from "@/constants";
import { selectedForgeGem, SelectedForgeGemType } from "@/recoil/forge/atom";
import GemShape from "@/components/common/GemShape";

const ForgePage = () => {
  const [storedValue] = useLocalStorage("forge-guide", true);
  const [isGuideModal, setGuideModal] = useState(storedValue);
  const [selectedGems] = useRecoilState<SelectedForgeGemType>(selectedForgeGem);
  const { firstSelectedGem, secondSelectedGem } = selectedGems;

  return (
    <Box>
      <ForgingIntroModal
        isOpen={isGuideModal}
        onClose={() => setGuideModal(false)}
      />

      <Center mt={100} columnGap={6}>
        <Center w={212} h={272} border={"1px solid white"} rounded={8}>
          {firstSelectedGem !== null && (
            <GemShape
              pieces={{
                topLeft: firstSelectedGem?.topLeft,
                topRight: firstSelectedGem?.topRight,
                bottomLeft: firstSelectedGem?.bottomLeft,
                bottomRight: firstSelectedGem?.bottomRight,
              }}
              gemBgColor={firstSelectedGem.gemBgColor}
            />
          )}
        </Center>

        <Center w={212} h={272} border={"1px solid white"} rounded={8}>
          {secondSelectedGem !== null && (
            <GemShape
              pieces={{
                topLeft: secondSelectedGem?.topLeft,
                topRight: secondSelectedGem?.topRight,
                bottomLeft: secondSelectedGem?.bottomLeft,
                bottomRight: secondSelectedGem?.bottomRight,
              }}
              gemBgColor={secondSelectedGem.gemBgColor}
            />
          )}
        </Center>
      </Center>
      <Center mt={34}>
        <Button
          p={4}
          bgColor={"#191A22"}
          color={"white"}
          _hover={{ bgColor: "#222222" }}
          columnGap={"6px"}
          rounded={"full"}
          isDisabled={
            selectedGems.firstSelectedGem === null &&
            selectedGems.secondSelectedGem === null
          }
          _disabled={{
            backgroundColor: "#5C5C5C",
            opacity: 0.5,
            cursor: "not-allowed",
          }}
        >
          <Image alt="forge" src={ForgeIcon} width={24} height={24} /> Forge
        </Button>
      </Center>

      <Flex mt={"72px"} gap={4} flexWrap={"wrap"}>
        {GemList.map((item, key) => {
          return (
            <GemCard
              mode="forge"
              key={key}
              gemInfo={item}
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
