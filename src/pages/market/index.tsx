import Image from "next/image";
import { Box, Center, Flex, Text, useTheme } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { useSearchParams } from "next/navigation";

import { colorStatus, gemPackModalStatus } from "@/recoil/market/atom";

import PriceContainer from "@/components/common/PriceContainer";
import GemPackModal from "@/components/modal/GemPackModal";
import GemCard from "@/components/common/GemCard";
import GemItemView from "@/components/common/GemItemView";

import GEM from "@/assets/images/sample_gem.png";
// import PumpkinGem from "@/assets/images/pumpkingem.png";
import Link from "next/link";
import { useFilteredList } from "@/hooks/useFilteredList";
import { useGetMarketGems } from "@/hooks/useGetMarketGems";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { selectedForgeGems } from "@/recoil/forge/atom";
import { rarityStatus } from "@/recoil/market/atom";
import { RarityType } from "@/types";

const MarketPage = () => {
  const theme = useTheme();
  const [gemPackModalState, setGemPackModalState] =
    useRecoilState(gemPackModalStatus);
  const searchParams = useSearchParams();
  const search = useMemo(() => searchParams.get("asset"), [searchParams]);
  const gemList = useGetMarketGems();
  const router = useRouter();
  const [, setSelectedGemsInfo] = useRecoilState(selectedForgeGems);
  const [, setRarityState] = useRecoilState(rarityStatus);
  const { activeGemList } = useFilteredList(gemList);
  const [, setColorState] = useRecoilState(colorStatus);

  useEffect(() => {
    setSelectedGemsInfo({
      selectedRarity: RarityType.none,
      selectedGemsList: [],
    });
    setRarityState({
      common: false,
      rare: false,
      unique: false,
      epic: false,
      legendary: false,
      mythic: false,
    });
    setColorState({
      ruby: false,
      amber: false,
      topaz: false,
      emerald: false,
      turquoise: false,
      sapphire: false,
      amethyst: false,
      garnet: false,
      diamond: false,
      onyx: false,
    })
  }, []);

  return search ? (
    <GemItemView id={Number(search)} mode="market" />
  ) : (
    <>
      <Flex columnGap={4} mt={73}>
        <GemPackModal
          isOpen={gemPackModalState}
          onOpen={() => setGemPackModalState(true)}
          onClose={() => setGemPackModalState(false)}
        />

        {/* <Flex
          pos={"relative"}
          w={668}
          h={272}
          flexDir={"column"}
          pt={"30px"}
          pb={"20px"}
          px={"30px"}
        >
          <Center objectPosition={"50% 50%"} zIndex={100}>
            <Image alt="pumpkingem" src={PumpkinGem} />
          </Center>
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
            bgGradient={"radial-gradient(#00000080, #000000FF)"}
            w={"full"}
            h={272}
          ></Box>
        </Flex> */}
      </Flex>

      <Flex
        gap={4}
        flexWrap={"wrap"}
      >
        <Flex
          pos={"relative"}
          w={212}
          h={272}
          bgImage={"/assets/images/gempack.png"}
          flexDir={"column"}
          justify={"end"}
          rounded={"8px"}
          onClick={() => router.push("/market/gempack")}
          cursor={"pointer"}
          // overflow={"hidden"}
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
            Obtain 1 Gem ranging from Rare up to Unique!
          </Text>

          <Flex
            w={"full"}
            h={53}
            bg={"#00000080"}
            justify={"space-between"}
            px={"9px"}
            align={"center"}
          >
            <Flex flexDir={"column"} justify={"space-between"}>
              <Text fontSize={14} color={"#FFFFFFBF"}>
                Gem #????
              </Text>
              <Text fontSize={10} color={"#FFFFFF80"}>
                Staked $10 - $55
              </Text>
            </Flex>

            <Link href={"/market/gempack"} replace>
              <PriceContainer price={15} />
            </Link>
          </Flex>
        </Flex>
        {activeGemList &&
          activeGemList.length > 0 &&
          activeGemList.map((item: any, key: number) => {
            return (
              <GemCard
                key={key}
                gemInfo={item}
              />
            );
          })}
      </Flex>
    </>
  );
};

export default MarketPage;
