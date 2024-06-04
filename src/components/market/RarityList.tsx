import { Center, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

import { rarityList, colorList } from "@/constants/rarity";

import Base from "@/assets/rarity/base.svg";
import Common from "@/assets/rarity/common.svg";
import Uncommon from "@/assets/rarity/uncommon.svg";
import Rare from "@/assets/rarity/rare.svg";
import Epic from "@/assets/rarity/epic.svg";
import Legendary from "@/assets/rarity/legendary.svg";
import Mythic from "@/assets/rarity/mythic.svg";
import Heirloom from "@/assets/rarity/heirloom.svg";

const RarityItem = ({ rarity }: { rarity: string }) => {
  return (
    <Center
      px={5}
      py={3}
      rounded={"full"}
      bgColor={"#FFFFFF0D"}
      columnGap={"10px"}
      cursor={"pointer"}
    >
      <Image
        alt="rarity"
        src={`/rarity/${rarity}.svg`}
        width={16}
        height={16}
      />
      <Text color={"white"} fontSize={16} fontWeight={500}>
        {rarity}
      </Text>
    </Center>
  );
};

const RarityList = () => {
  return (
    <Flex columnGap={3}>
      {rarityList.map((item, key) => (
        <RarityItem key={key} rarity={item} />
      ))}
    </Flex>
  );
};

export default RarityList;
