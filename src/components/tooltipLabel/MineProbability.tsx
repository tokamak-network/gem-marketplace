import { Flex, Box, Text, useTheme } from "@chakra-ui/react";
import { useMemo } from "react";
import { useRecoilState } from "recoil";
import {
  numberOfRarityUsers,
  numberOfRarityGemsAvailable,
} from "@/recoil/market/atom";
import { rarityList } from "@/constants/rarity";

const MineProbability = ({ rarity }: { rarity: number }) => {
  const theme = useTheme();
  const [numberOfUsers] = useRecoilState(numberOfRarityUsers);
  const [numberOfGems] = useRecoilState(numberOfRarityGemsAvailable);

  const activeMiners = useMemo(() => {
    let sum = 0;
    for (let i = 0; i <= rarity; i++) {
      sum += Number(numberOfUsers[rarityList[i]]);
    }
    return sum;
  }, [numberOfUsers]);

  const gemsAvailable = useMemo(() => {
    let sum = 0;
    for (let i = 0; i <= rarity; i++) {
      sum += Number(numberOfGems[rarityList[i]]);
    }
    return sum;
  }, [numberOfGems]);

  const probabilityValue = useMemo(
    () => Math.min(Math.floor((gemsAvailable / activeMiners) * 100), 100),
    [gemsAvailable, activeMiners]
  );

  return (
    <Flex flexDir={"column"} p={"0px 15px"} fontFamily={theme.fonts.Inter}>
      <Box
        textAlign={"center"}
        py={3}
        fontSize={16}
        fontWeight={600}
        borderBottom={"1px solid #FFFFFF40"}
      >
        <Text>{activeMiners}</Text>
        <Text fontSize={12} fontWeight={400} color={"#FFFFFF80"}>
          Active Miners
        </Text>
      </Box>
      <Box textAlign={"center"} py={3} fontSize={16} fontWeight={600}>
        <Text>{gemsAvailable}</Text>
        <Text fontSize={12} fontWeight={400} color={"#FFFFFF80"}>
          Gems Available
        </Text>
      </Box>
      <Box textAlign={"center"} pb={3}>
        <Text fontSize={16} fontWeight={600}>
          =
        </Text>
        <Text fontSize={24} fontWeight={700}>
          {probabilityValue}%
        </Text>
      </Box>
    </Flex>
  );
};

export default MineProbability;
