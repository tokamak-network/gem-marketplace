import Image from "next/image";
import { useMemo } from "react";
import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";

import { rarityStatus } from "@/recoild/market/atom";

import { rarityList } from "@/constants/rarity";

// import Base from "@/assets/rarity/base.svg";
// import Common from "@/assets/rarity/common.svg";
// import Uncommon from "@/assets/rarity/uncommon.svg";
// import Rare from "@/assets/rarity/rare.svg";
// import Epic from "@/assets/rarity/epic.svg";
// import Legendary from "@/assets/rarity/legendary.svg";
// import Mythic from "@/assets/rarity/mythic.svg";
// import Heirloom from "@/assets/rarity/heirloom.svg";

const RarityItem = ({ rarity }: { rarity: string }) => {
  const [rarityState, setRarityState] = useRecoilState(rarityStatus);
  const handleRarity = (rarity: string) => {
    setRarityState((prev) => ({ ...prev, ...{ [rarity]: !prev[rarity] } }));
  };

  const defaultState = useMemo(() => {
    for (let item of rarityList) {
      if (rarityState[item] !== "") return false;
    }
    return true;
  }, [rarityState]);

  console.log(defaultState);

  return (
    <Center
      px={5}
      h={"30px"}
      roundedRight={"full"}
      bgColor={"#2A2C3A"}
      columnGap={"10px"}
      cursor={"pointer"}
      onClick={() => handleRarity(rarity)}
      pos={"relative"}
      opacity={defaultState || rarityState[rarity] ? 1 : 0.5}
      border={"1px solid"}
      borderColor={rarityState[rarity] ? "white" : "transparent"}
    >
      <Box pos={"absolute"} top={"-1px"} left={"-16px"}>
        <Image
          alt="rarity"
          src={`/rarity/${rarity}.svg`}
          width={30}
          height={30}
        />
      </Box>
      <Text color={"white"} fontSize={12} fontWeight={500}>
        {rarity}
      </Text>
    </Center>
  );
};

const RarityList = () => {
  return (
    <Flex columnGap={7} align={"center"}>
      <Text
        bgGradient={"linear(to-r, #FF0099, #FF7A00)"}
        letterSpacing={"0.3em"}
        fontSize={12}
        fontWeight={600}
        bgClip={"text"}
        color={"transparent"}
        textTransform={"uppercase"}
        my={4}
      >
        rarity
      </Text>
      {rarityList.map((item, key) => (
        <RarityItem key={key} rarity={item} />
      ))}
    </Flex>
  );
};

export default RarityList;
