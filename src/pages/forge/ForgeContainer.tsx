import { Box, Center } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import GemCard from "@/components/common/GemCard";
import { selectedForgeGem, SelectedForgeGemType } from "@/recoil/forge/atom";
import CloseIcon from "@/assets/icon/close.svg";
import Image from "next/image";

const ForgeContainer = () => {
  const [selectedGems, setSelectedGems] =
    useRecoilState<SelectedForgeGemType>(selectedForgeGem);
  const { firstSelectedGem, secondSelectedGem } = selectedGems;

  enum SelectedGem {
    FIRST,
    SECOND,
  }

  const handleCancelItem = (selectedItem: SelectedGem) => {
    if (selectedItem === SelectedGem.FIRST) {
      setSelectedGems((prev) => ({ ...prev, ...{ firstSelectedGem: null } }));
    } else if (selectedItem === SelectedGem.SECOND) {
      setSelectedGems((prev) => ({ ...prev, ...{ secondSelectedGem: null } }));
    }
  };

  return (
    <Center mt={100} columnGap={6}>
      <Center
        pos={"relative"}
        bg={""}
        w={212}
        h={274}
        border={"1px solid white"}
        rounded={8}
      >
        {firstSelectedGem !== null && (
          <Box
            pos={"absolute"}
            zIndex={1}
            w={"16px"}
            h={"16px"}
            p={0}
            cursor={"pointer"}
            top={2}
            right={2}
            onClick={() => handleCancelItem(SelectedGem.FIRST)}
          >
            <Image alt="close" src={CloseIcon} />
          </Box>
        )}
        {firstSelectedGem !== null && (
          <GemCard
            mode="forge"
            gemInfo={firstSelectedGem}
            rarity="Mythic"
            rarityScore={1}
            staked={253.2}
            dailyChange={16.7}
          />
        )}
      </Center>

      <Center
        pos={"relative"}
        w={212}
        h={274}
        border={"1px solid white"}
        rounded={8}
      >
        {secondSelectedGem !== null && (
          <Box
            zIndex={1}
            pos={"absolute"}
            w={"16px"}
            h={"16px"}
            p={0}
            cursor={"pointer"}
            top={2}
            right={2}
            onClick={() => handleCancelItem(SelectedGem.SECOND)}
          >
            <Image alt="close" src={CloseIcon} />
          </Box>
        )}
        {secondSelectedGem !== null && (
          <GemCard
            mode="forge"
            gemInfo={secondSelectedGem}
            rarity="Mythic"
            rarityScore={1}
            staked={253.2}
            dailyChange={16.7}
          />
        )}
      </Center>
    </Center>
  );
};

export default ForgeContainer;
