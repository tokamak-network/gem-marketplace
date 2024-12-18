import Image from "next/image";
import { useMemo } from "react";
import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";

import { rarityStatus } from "@/recoil/market/atom";

import { rarityList } from "@/constants/rarity";

export const RarityItem = ({
  rarity,
  active = false,
  readOnly = false,
}: {
  rarity: string;
  active?: boolean;
  readOnly?: boolean;
}) => {
  const [rarityState, setRarityState] = useRecoilState(rarityStatus);
  const handleRarity = (rarity: string) => {
    !readOnly &&
      setRarityState((prev) => ({ ...prev, ...{ [rarity]: !prev[rarity] } }));
  };

  const defaultState = useMemo(() => {
    for (let item of rarityList) {
      if (rarityState[item] !== false) return false;
    }
    return true;
  }, [rarityState]);

  return (
    <Center
      px={5}
      h={"30px"}
      roundedRight={"full"}
      bgColor={"#2A2C3A"}
      columnGap={"10px"}
      cursor={readOnly ? "auto" : "pointer"}
      onClick={() => handleRarity(rarity)}
      pos={"relative"}
      opacity={defaultState || rarityState[rarity] || readOnly ? 1 : 0.5}
      border={"1px solid"}
      borderColor={
        (rarityState[rarity] || active) && !readOnly ? "white" : "transparent"
      }
      transition={"0.1s"}
    >
      <Box pos={"absolute"} top={"-1px"} left={"-16px"}>
        <Image
          alt="rarity"
          src={`/assets/rarity/${rarity}.svg`}
          width={30}
          height={30}
        />
      </Box>
      <Text
        color={"white"}
        fontSize={12}
        fontWeight={500}
        textTransform={"capitalize"}
      >
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
