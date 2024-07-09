import { Box, Flex, Text, useTheme } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useSearchParams } from "next/navigation";
import { activeRarityListSelector, gemPackModalStatus } from "@/recoil/market/atom";

import PriceContainer from "@/components/common/PriceContainer";
import GemPackModal from "@/components/modal/GemPackModal";

import GEM from "@/assets/images/sample_gem.png";
import Image from "next/image";
import GemCard from "@/components/common/GemCard";
import GemItem from "./GemItem";

import { GemList } from "@/constants";

const MarketPage = () => {
  const theme = useTheme();
  const [gemPackModalState, setGemPackModalState] =
    useRecoilState(gemPackModalStatus);
  const searchParams = useSearchParams();
  const search = searchParams.get("asset");
  const {activeRarityList} = useRecoilValue(activeRarityListSelector);

  return (
    search ? <GemItem id={Number(search)}/> :
    <>
      <Flex columnGap={4} mt={73}>
        <Flex
          pos={"relative"}
          w={212}
          h={272}
          bgImage={"/assets/images/gempack.png"}
          flexDir={"column"}
          justify={"end"}
        >
          <Box
            pos={"absolute"}
            transform={"translateX(-50%)"}
            left={"calc(50%)"}
            top={"-70px"}
            width={200}
            height={200}
          >
            <Image alt="gem" src={GEM} />
          </Box>

          <Text fontSize={24} fontWeight={700} px={17}>
            GEM PACK
          </Text>
          <Text
            fontFamily={theme.fonts.Inter}
            fontSize={14}
            fontWeight={400}
            px={17}
            mt={4}
            mb={5}
          >
            Obtain 1 Gem ranging from Base up to Legendary!
          </Text>

          <Flex
            w={"full"}
            h={53}
            bg={"#00000080"}
            justify={"end"}
            px={"9px"}
            align={"center"}
          >
            <PriceContainer
              price={10}
              onClick={() => setGemPackModalState(true)}
            />
          </Flex>
        </Flex>
        <GemPackModal
          isOpen={gemPackModalState}
          onOpen={() => setGemPackModalState(true)}
          onClose={() => setGemPackModalState(false)}
        />

        <Flex
          pos={"relative"}
          w={668}
          h={272}
          flexDir={"column"}
          pt={"30px"}
          pb={"20px"}
          px={"30px"}
        >
          <Box pos={"absolute"} top={0} left={0}>
            <Image
              alt="halloween"
              width={668}
              height={272}
              src={"/assets/images/halloween.png"}
            ></Image>
          </Box>
          <Box
            pos={"absolute"}
            top={0}
            left={0}
            zIndex={10}
            bgGradient={"radial-gradient(#00000000, #000000D9)"}
            w={"full"}
            h={272}
          ></Box>
        </Flex>
      </Flex>

      <Flex mt={4} gap={4} flexWrap={"wrap"}>
        {activeRarityList.map((item, key) => {
          return (
            <GemCard
              key={key}
              rarityScore={1}
              staked={253.2}
              dailyChange={16.7}
              gemInfo={item}
            />
          );
        })}
      </Flex>
    </>
  );
};

export default MarketPage;
