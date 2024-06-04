import Image from "next/image";
import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";

import { rarityStatus } from "@/recoild/market/atom";

import { colorList } from "@/constants/rarity";
import { color } from "framer-motion";

const ColorItem = ({ color }: { color: string }) => {
//   const [rarityState, setRarityState] = useRecoilState(rarityStatus);
//   const handleRarity = (rarity: string) => {
//     setRarityState((prev) => ({...prev, ...{[rarity] : !prev[rarity]}}));
//   }

  return (
    <Center
      px={5}
      h={"30px"}
      rounded={"full"}
      bgColor={colorList[color]}
      columnGap={"10px"}
      cursor={"pointer"}
      // onClick={() => handleRarity(rarity)}
    >
      <Text textTransform={"capitalize"} color={"white"} fontSize={12} fontWeight={500}>
        {color}
      </Text>
    </Center>
  );
};

const ColorList = () => {
  return (
    <Flex columnGap={3} align={"center"}>
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
        color
      </Text>
      {Object.keys(colorList).map((item, key) => (
        <ColorItem key={key} color={item}/>
      ))}
    </Flex>
  );
};

export default ColorList;
