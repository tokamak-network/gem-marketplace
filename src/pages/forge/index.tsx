import Image from "next/image";
import { useState } from "react";
import { Box, Button, Center, Flex } from "@chakra-ui/react";
import ForgingIntroModal from "@/components/modal/ForgingIntroModal";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import GemCard from "@/components/common/GemCard";
import ForgeIcon from "@/assets/icon/forge.svg";
import mergeImages from "merge-images";

const ForgePage = () => {
  const [storedValue] = useLocalStorage("forge-guide", true);
  const [isGuideModal, setGuideModal] = useState(storedValue);

  return (
    <Box>
      <ForgingIntroModal
        isOpen={isGuideModal}
        onClose={() => setGuideModal(false)}
      />

      <Center mt={100} columnGap={6}>
        <Box w={212} h={272} border={"1px solid white"} rounded={8}></Box>

        <Box w={212} h={272} border={"1px solid white"} rounded={8}></Box>
      </Center>
      <Center mt={34}>
        <Button
          p={4}
          bgColor={"#191A22"}
          color={"white"}
          _hover={{bgColor: "#222222"}}
          columnGap={"6px"}
          rounded={"full"}
        >
          <Image alt="forge" src={ForgeIcon} width={24} height={24} /> Forge
        </Button>
      </Center>

      <Flex mt={"72px"} gap={4} flexWrap={"wrap"}>
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
