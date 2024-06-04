import { Box, Flex, Text, useTheme } from "@chakra-ui/react";
import RarityList from "@/components/market/RarityList";
import ColorList from "@/components/market/ColorList";
import PriceContainer from "@/components/common/PriceContainer";

import GEM from "@/assets/images/sample_gem.png"
import Image from "next/image";

const MarketPage = () => {
  const theme = useTheme();

  return (
    <Box w={"100%"} p={"30px"}>
      <RarityList />
      <ColorList />

      <Flex columnGap={4} mt={73}>
        <Flex pos={"relative"} w={212} h={272} bgImage={"/image/gempack.png"} flexDir={"column"} justify={"end"}>
          <Box pos={"absolute"} transform={"translateX(-50%)"} left={"calc(50%)"} top={"-70px"} width={200} height={200}>
            <Image alt="gem" src={GEM}/>
          </Box>

          <Text fontSize={24} fontWeight={700} px={17}>GEM PACK</Text>
          <Text fontFamily={theme.fonts.Inter} fontSize={14} fontWeight={400} px={17} mt={4} mb={5}>Obtain 1 Gem ranging from Base up to Legendary!</Text>

          <Flex w={"full"} h={53} bg={"#00000080"} justify={"end"} px={"9px"} align={"center"}>
            <PriceContainer price={10}/>
          </Flex>
        </Flex>

        <Flex pos={"relative"} w={668} h={272} flexDir={"column"} pt={"30px"} pb={"20px"} px={"30px"} >
          <Box pos={"absolute"} top={0} left={0}>
            <Image alt="halloween" width={668} height={272} src={"/image/halloween.png"}></Image>
          </Box>
          <Box pos={"absolute"} top={0} left={0} zIndex={10} bgGradient={"radial-gradient(#00000000, #000000D9)"} w={"full"} h={272}></Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default MarketPage;
