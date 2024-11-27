import { Flex, Box, Text, useTheme } from "@chakra-ui/react";
import { useMemo } from "react";
import { useRecoilState } from "recoil";
import { numberOfRarityUsers } from "@/recoil/market/atom";
import { rarityList } from "@/constants/rarity";

const MineProbability = ({ rarity }: { rarity: number }) => {
  const theme = useTheme();
  const [numberOfUsers] = useRecoilState(numberOfRarityUsers);

  const activeMiners = useMemo(() => {
    let sum = 0;
    for (let i = 0; i <= rarity; i++) {
      console.log(numberOfUsers[rarityList[i]]);
      sum += Number(numberOfUsers[rarityList[i]]);
    }
    return sum;
  }, [numberOfUsers]);

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
        <Text>1,259</Text>
        <Text fontSize={12} fontWeight={400} color={"#FFFFFF80"}>
          Gems Vailable
        </Text>
      </Box>
      <Box textAlign={"center"} pb={3}>
        <Text fontSize={16} fontWeight={600}>
          =
        </Text>
        <Text fontSize={24} fontWeight={700}>
          99.9%
        </Text>
      </Box>
    </Flex>
  );
};

export default MineProbability;
