import { Box, Button, Center } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import GemCard from "@/components/common/GemCard";
import { selectedForgeGem, SelectedForgeGemType } from "@/recoil/forge/atom";
import CloseIcon from "@/assets/icon/close.svg";
import Image from "next/image";
import ForgeIcon from "@/assets/icon/forge.svg";
import { forgeConfirmModalStatus } from "@/recoil/forge/atom";

const ForgeContainer = () => {
  const [selectedGems, setSelectedGems] =
    useRecoilState<SelectedForgeGemType>(selectedForgeGem);
  const { firstSelectedGem, secondSelectedGem } = selectedGems;
  const [, setForgeConfirm] = useRecoilState(forgeConfirmModalStatus);
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
    <Box>
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
              mode="common"
              gemInfo={firstSelectedGem}
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
              mode="common"
              gemInfo={secondSelectedGem}
            />
          )}
        </Center>
      </Center>

      <Center mt={34}>
        <Button
          w={196}
          h={65}
          p={4}
          bgColor={"#0380FF"}
          colorScheme={
            selectedGems.firstSelectedGem === null &&
            selectedGems.secondSelectedGem === null
              ? ""
              : "blue"
          }
          color={"white"}
          columnGap={"6px"}
          rounded={"8px"}
          isDisabled={
            selectedGems.firstSelectedGem === null &&
            selectedGems.secondSelectedGem === null
          }
          _disabled={{
            backgroundColor: "#5C5C5C",
            opacity: 0.5,
            cursor: "not-allowed",
          }}
          fontSize={24}
          onClick={() => setForgeConfirm(true)}
        >
          <Image alt="forge" src={ForgeIcon} width={24} height={24} /> Forge
        </Button>
      </Center>
    </Box>
  );
};

export default ForgeContainer;
