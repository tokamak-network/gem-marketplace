import Image from "next/image";
import { Flex, Text, useTheme } from "@chakra-ui/react";
import { RarityItem } from "../common/RarityList";
import { RarityType } from "@/types";
import StarIcon from "@/assets/icon/star.svg";
import GemIcon from "@/assets/icon/mine.svg";
import { rarityList } from "@/constants/rarity";

const MinePreview = ({ rarity }: { rarity: RarityType }) => {
  const theme = useTheme();

  return (
    <Flex height={"130px"} p={4} flexDir={"column"} justify={"space-between"} fontFamily={theme.fonts.Inter}>
      <Flex justify={"space-between"} align={"center"}>
        <Flex columnGap={"6px"}>
          <Image alt="star" src={StarIcon} width={14} height={14} />
          <Text  color={"#FFFFFF80"}>
            Rarity:
          </Text>
        </Flex>

        <RarityItem rarity={rarityList[Number(rarity)]} />
      </Flex>

      <Flex justify={"space-between"} align={"center"}>
        <Flex columnGap={"6px"}>
          <Image alt="star" src={GemIcon} width={14} height={14} />
          <Text color={"#FFFFFF80"}>
            Power:
          </Text>
        </Flex>

        <Text fontSize={14} fontWeight={500}>
          Common - Rare
        </Text>
      </Flex>

      <Flex justify={"space-between"} align={"center"}>
        <Text color={"#FFFFFF80"}>Mines Remaining:</Text>
        <Text fontWeight={500}>10</Text>
      </Flex>
    </Flex>
  );
};

export default MinePreview;
