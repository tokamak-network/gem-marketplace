import { useMemo } from "react";
import { useRecoilState } from "recoil";
import { cooldownStatus } from "@/recoil/mine/atom";

import { GemStandard, RarityType } from "@/types";
import { useGetAllGems } from "@/hooks/useGetMarketGems";
import { RarityItem } from "./RarityList";
import { colorNameList, rarityList } from "@/constants/rarity";
import { ColorItem } from "./ColorList";

import GemIcon from "@/assets/icon/mine.svg";
import StarIcon from "@/assets/icon/star.svg";
import ColorIcon from "@/assets/icon/color.svg";
import forgeIcon from "@/assets/icon/forge.svg";
import MiningIcon from "@/assets/icon/mine.svg";
import CooldownIcon from "@/assets/icon/cooldown.svg";
import { cooldownIndex } from "@/constants";
import { Box, Flex, Text, useTheme } from "@chakra-ui/react";
import Image from "next/image";

const GemAttributesView = ({ gemItem }: { gemItem: GemStandard }) => {
  const [cooldowns] = useRecoilState(cooldownStatus);
  const theme = useTheme();

  const nonDupColorList = useMemo(
    () =>
      gemItem.color.filter((value: number, index: number, self: number[]) => {
        return self.indexOf(value) === index;
      }),

    [gemItem]
  );

  const cooldownTime = useMemo(() => {
    const baseValue = cooldowns[cooldownIndex[Number(gemItem?.rarity)]];
    if (Math.floor(baseValue / (3600 * 24)) > 0) {
      if (Math.floor(baseValue % (3600 * 24)) === 0)
        return `${baseValue / (3600 * 24)} days`;
      else {
        return `${Math.floor(baseValue / (3600 * 24))} days ${Math.floor(baseValue % (3600 * 24))} hours`;
      }
    } else {
      return `${Math.floor(baseValue / 3600)} hours ${Math.floor((baseValue % 3600) / 60)} minutes`;
    }
  }, [cooldowns, gemItem, cooldownIndex]);

  return (
    <Flex flexDir={"column"} rowGap={"20px"} my={"36px"}>
      <Flex>
        <Flex minW={173} columnGap={3} align={"center"}>
          <Image alt="rarity" src={StarIcon} width={16} height={16} />
          <Text
            fontFamily={theme.fonts.Inter}
            fontSize={16}
            color={"#FFFFFF80"}
          >
            Rarity:
          </Text>
        </Flex>

        <Box ml={"12px"}>
          <RarityItem
            readOnly
            active
            rarity={rarityList[Number(gemItem?.rarity)]}
          />
        </Box>
      </Flex>

      <Flex>
        <Flex minW={173} columnGap={3} align={"center"}>
          <Image alt="rarity" src={ColorIcon} width={16} height={16} />
          <Text
            fontFamily={theme.fonts.Inter}
            fontSize={16}
            color={"#FFFFFF80"}
          >
            Color:
          </Text>
        </Flex>

        <Flex columnGap={3}>
          {nonDupColorList.map((item, key) => (
            <ColorItem readOnly color={colorNameList[item]} key={key} />
          ))}
        </Flex>
      </Flex>

      <Flex>
        <Flex minW={173} columnGap={3} align={"center"}>
          <Image alt="rarity" src={forgeIcon} width={16} height={16} />
          <Text
            fontFamily={theme.fonts.Inter}
            fontSize={16}
            color={"#FFFFFF80"}
          >
            Forging:
          </Text>
        </Flex>

        {rarityList[Number(gemItem?.rarity)] === RarityType.mythic ? (
          "N/A"
        ) : (
          <Box ml={"12px"}>
            <RarityItem
              active
              readOnly
              rarity={rarityList[Number(gemItem?.rarity) + 1]}
            />
          </Box>
        )}
      </Flex>

      <Flex>
        <Flex minW={173} columnGap={3} align={"center"}>
          <Image alt="rarity" src={MiningIcon} width={16} height={16} />
          <Text
            fontFamily={theme.fonts.Inter}
            fontSize={16}
            color={"#FFFFFF80"}
          >
            Mining:
          </Text>
        </Flex>

        {rarityList[Number(gemItem?.rarity)] === RarityType.common ? (
          "N/A"
        ) : (
          <Box ml={"12px"}>
            <RarityItem
              active
              readOnly
              rarity={rarityList[Number(gemItem?.rarity) - 1]}
            />
          </Box>
        )}
      </Flex>

      <Flex>
        <Flex minW={173} columnGap={3} align={"center"}>
          <Image alt="rarity" src={CooldownIcon} width={16} height={16} />
          <Text
            fontFamily={theme.fonts.Inter}
            fontSize={16}
            color={"#FFFFFF80"}
          >
            Cooldown:
          </Text>
        </Flex>

        <Text fontFamily={theme.fonts.Inter} fontWeight={500} fontSize={16}>
          {Number(gemItem?.rarity) === 0 ? "N/A" : cooldownTime}
        </Text>
      </Flex>

      <Flex>
        <Flex minW={173} columnGap={3} align={"center"}>
          <Text
            fontFamily={theme.fonts.Inter}
            fontSize={14}
            color={"#FFFFFF80"}
          >
            Mines Remaining:
          </Text>
        </Flex>

        <Text fontFamily={theme.fonts.Inter} fontWeight={500} fontSize={16}>
          {gemItem?.miningTry}
        </Text>
      </Flex>
    </Flex>
  );
};

export default GemAttributesView;
