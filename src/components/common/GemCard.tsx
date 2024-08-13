"use client";
import Image from "next/image";
import { useRouter } from "next/router";
import { Box, Flex, Text, Progress, Center, useTheme } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import PriceContainer from "./PriceContainer";
import HighArrow from "@/assets/icon/higharrow.svg";
import SavedIcon from "./SavedIcon";
import { COOLDOWN } from "@/constants";
import { useRecoilState } from "recoil";
import { miningModalStatus, miningResultStatus } from "@/recoil/mine/atom";
import {
  forgeConfirmModalStatus,
  selectedForgeGem,
  selectedForgeGems,
} from "@/recoil/forge/atom";
import { GemStandard, CardType, RarityType } from "@/types";
import RarityViewer from "./RarityViewer";

import GemIcon from "@/assets/icon/mine.svg";
import GemShape from "./GemShape";
import PreviousMap from "postcss/lib/previous-map";
import { rarityStatus } from "@/recoil/market/atom";

interface GemCardType {
  width?: number;
  height?: number;
  gemWidth?: number;
  gemHeight?: number;
  rarityScore: number;
  staked: number;
  dailyChange: number;
  mode?: CardType;
  gemInfo: GemStandard;
}

const GemCard = ({
  width = 212,
  height = 272,
  gemWidth = 120,
  gemHeight = 120,
  mode = "market",
  rarityScore,
  staked,
  dailyChange,
  gemInfo,
}: GemCardType) => {
  const [isSaved, setSaved] = useState<boolean>(false);
  const [isFlip, setFlip] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isReadyForMine, setReadyForMine] = useState<boolean>(false);
  const [isHoverMine, SetHoverMine] = useState<boolean>(false);
  const [, seMineModalState] = useRecoilState(miningModalStatus);
  const [selectedGems, setSelectedGems] = useRecoilState(selectedForgeGem);

  const [collectGemStatus, setCollectGemStatus] =
    useRecoilState(miningResultStatus);
  const { firstSelectedGem, secondSelectedGem } = selectedGems;

  const [selectedGemsInfo, setSelectedGemsInfo] =
    useRecoilState(selectedForgeGems);
  const { selectedRarity, selectedGemsList } = selectedGemsInfo;
  const [rarityState, setRarityState] = useRecoilState(rarityStatus);
  const [, setForgeConfirm] = useRecoilState(forgeConfirmModalStatus);

  const theme = useTheme();
  const router = useRouter();

  const { id, lastMineTime, gemBgColor, rarity, isMining, quadrants } = gemInfo;

  useEffect(() => {
    const currentTimestamp = Date.now();
    const interval = setInterval(() => {
      if (currentTimestamp / 1000 - lastMineTime > COOLDOWN) {
        setReadyForMine(true);
        setTimeRemaining(0);
      } else {
        setTimeRemaining(
          COOLDOWN + lastMineTime - Math.floor(currentTimestamp / 1000)
        );
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timeRemaining]);

  const handleCardClick = useCallback(() => {
    // if (mode === "forge" && (isForgeActive || isForgeSelected)) {
    //   const selectedGem: GemStandard = {
    //     id: id,
    //     topLeft: pieces.topLeft,
    //     topRight: pieces.topRight,
    //     bottomLeft: pieces.bottomLeft,
    //     bottomRight: pieces.bottomRight,
    //     gemBgColor: gemBgColor,
    //     lastMineTime: lastMineTime,
    //     rarity: rarity,
    //   };

    //   if (firstSelectedGem === null && secondSelectedGem === null) {
    //     setSelectedGems((prev) => ({
    //       ...prev,
    //       ...{ firstSelectedGem: selectedGem },
    //     }));
    //   }

    //   if (firstSelectedGem !== null && secondSelectedGem === null) {
    //     if (firstSelectedGem.id === id) {
    //       setSelectedGems((prev) => ({
    //         ...prev,
    //         ...{ firstSelectedGem: null },
    //       }));
    //     } else {
    //       setSelectedGems((prev) => ({
    //         ...prev,
    //         ...{ secondSelectedGem: selectedGem },
    //       }));
    //     }
    //   }

    //   if (firstSelectedGem === null && secondSelectedGem !== null) {
    //     if (secondSelectedGem.id === id) {
    //       setSelectedGems((prev) => ({
    //         ...prev,
    //         ...{ secondSelectedGem: null },
    //       }));
    //     } else {
    //       setSelectedGems((prev) => ({
    //         ...prev,
    //         ...{ firstSelectedGem: selectedGem },
    //       }));
    //     }
    //   }

    //   if (firstSelectedGem !== null && secondSelectedGem !== null) {
    //     if (firstSelectedGem.id === id) {
    //       setSelectedGems((prev) => ({
    //         ...prev,
    //         ...{ firstSelectedGem: null },
    //       }));
    //     }
    //     if (secondSelectedGem.id === id) {
    //       setSelectedGems((prev) => ({
    //         ...prev,
    //         ...{ secondSelectedGem: null },
    //       }));
    //     }
    //   }
    // }

    if (mode === "forge") {
      setSelectedGemsInfo((prev) => ({
        ...prev,
        selectedRarity: gemInfo.rarity,
      }));
      if (selectedGemsList.length === 0) {
        setSelectedGemsInfo({
          selectedRarity: gemInfo.rarity,
          selectedGemsList: [gemInfo],
        });
        setRarityState(() => ({
          ...{
            base: false,
            common: false,
            rare: false,
            unique: false,
            epic: false,
            legendary: false,
            mythic: false,
            heirloom: false,
          },
          ...{ [gemInfo.rarity.toLocaleLowerCase()]: true },
        }));
      } else {
        let filterList = selectedGemsList.filter((item) => item.id === id);

        if (filterList.length > 0) {
          if (selectedGemsList.length === 1) {
            setSelectedGemsInfo({
              selectedRarity: RarityType.NONE,
              selectedGemsList: [],
            });
            return;
          }
          let resultList = selectedGemsList.filter((item) => item.id !== id);
          setSelectedGemsInfo((prev) => ({
            selectedRarity: gemInfo.rarity,
            selectedGemsList: [...resultList],
          }));
          return;
        }
        if (
          Object.keys(RarityType).indexOf(selectedRarity) + 1 >
          selectedGemsList.length
        ) {
          if (
            Object.keys(RarityType).indexOf(selectedRarity) ===
            selectedGemsList.length
          ) {
            setForgeConfirm(true);
          }
          let newList = [...selectedGemsList, gemInfo];
          setSelectedGemsInfo(() => ({
            selectedRarity: gemInfo.rarity,
            selectedGemsList: newList,
          }));
        } else {
          return;
        }
      }
    }
    if (mode === "market") {
      router.push(`/market?asset=${gemInfo.id}`);
    } else if (mode === "chest") {
      router.push(`/chest?asset=${gemInfo.id}`);
    }
  }, [selectedGemsList, selectedRarity, selectedGemsInfo, gemInfo]);

  // const isForgeActive = useMemo(() => {
  //   if (firstSelectedGem === null && secondSelectedGem === null) return true;
  //   else {
  //     if (firstSelectedGem !== null && secondSelectedGem !== null) return false;
  //     if (
  //       rarity === firstSelectedGem?.rarity ||
  //       rarity === secondSelectedGem?.rarity
  //     )
  //       return true;
  //   }
  // }, [firstSelectedGem, secondSelectedGem]);

  // const isForgeSelected = useMemo(() => {
  //   return id === firstSelectedGem?.id || id === secondSelectedGem?.id;
  // }, [firstSelectedGem, secondSelectedGem]);

  const isForgeSelected = useMemo(() => {
    const selected = selectedGemsList.filter((item) => item.id === id);
    return selected.length > 0 ? true : false;
  }, [selectedGemsList, selectedRarity]);

  return (
    <Box
      pos={"relative"}
      w={width}
      h={height}
      minW={width}
      bgGradient={"radial(#6F97FF, #1F25A4)"}
      sx={{ perspective: "1000px" }}
      cursor={"pointer"}
      onClick={handleCardClick}
      rounded={mode === "normal" ? 17 : 8}
      // opacity={
      //   mode === "forge" ? (isForgeActive || isForgeSelected ? 1 : 0.25) : 1
      // }
      boxShadow={
        (isForgeSelected && mode === "forge") || mode === "common"
          ? "0px 0px 25px 0px #0068FF"
          : ""
      }
      border={
        (isForgeSelected && mode === "forge") || mode === "common"
          ? "1px solid #FFFFFF"
          : ""
      }
      transition={"0.2s"}
    >
      {isForgeSelected && mode === "forge" && (
        <>
          <Center
            w={"fit-content"}
            h={"24px"}
            px={4}
            pos={"absolute"}
            top={0}
            left={0}
            rounded={"8px 0px 8px 0px"}
            bgColor={"#FFFFFF"}
            fontWeight={700}
            fontSize={12}
            textAlign={"center"}
            fontFamily={theme.fonts.Quicksand}
            color={"#000000"}
          >
            {`selected ${selectedGemsList.indexOf(gemInfo) + 1} of ${
              Object.keys(RarityType).indexOf(selectedRarity) + 1
            }`}
          </Center>

          {/* <Center
            w={"81px"}
            h={"24px"}
            pos={"absolute"}
            top={0}
            right={0}
            rounded={"8px 0px 8px 0px"}
            bgColor={"#FFFFFF"}
            fontWeight={700}
            fontSize={12}
            textAlign={"center"}
            fontFamily={theme.fonts.Quicksand}
            color={"#000000"}
          >
            {`${selectedGemsList.indexOf(gemInfo) + 1} of ${
              Object.keys(RarityType).indexOf(selectedRarity) + 1
            }`}
          </Center> */}
        </>
      )}
      <Box
        w={"100%"}
        h={"100%"}
        transition={"transform 0.8s"}
        sx={{
          transformStyle: "preserve-3d",
        }}
        // transform={isFlip ? "rotateY(180deg)" : ""}
        pos={"relative"}
      >
        <Flex
          pos={"absolute"}
          w={"100%"}
          h={"100%"}
          flexDir={"column"}
          rounded={8}
          overflow={"hidden"}
          sx={{
            backfaceVisibility: "hidden",
          }}
        >
          {(mode === "mine" || mode === "market" || mode === "normal") && (
            <Box
              pos={"absolute"}
              top={"10px"}
              right={"10px"}
              cursor={"pointer"}
              zIndex={10}
              onClick={(e) => {
                setSaved((prev) => !prev);
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <SavedIcon
                width={mode === "normal" ? 34 : 16}
                height={mode === "normal" ? 28 : 13}
                isFill={isSaved}
              />
            </Box>
          )}

          <Center w={"full"} h={"full"} bg={""}>
            <GemShape
              gradient="linear"
              quadrants={quadrants}
              gemBgColor={gemBgColor}
              width={gemWidth}
              height={gemHeight}
            />
          </Center>

          {mode === "mine" && (
            <Progress
              value={((COOLDOWN - timeRemaining) / COOLDOWN) * 100}
              colorScheme="green"
              h={"2px"}
            />
          )}

          {mode !== "normal" && (
            <Flex
              pos={"relative"}
              w={"full"}
              h={53}
              bgColor={"#00000080"}
              justify={"space-between"}
              align={"center"}
            >
              {mode === "mine" && isReadyForMine && isMining === true ? (
                <Flex
                  w={"full"}
                  justify={"center"}
                  align={"end"}
                  columnGap={1}
                  p={"20px"}
                >
                  <Text fontSize={18} textAlign={"center"}>
                    Mining...{" "}
                  </Text>
                  <Text
                    fontSize={12}
                    textAlign={"center"}
                    opacity={0.5}
                    lineHeight={"23px"}
                  >
                    21:34:12
                  </Text>
                </Flex>
              ) : mode === "mine" && isReadyForMine && isMining === false ? (
                <Flex
                  w={"full"}
                  h={"full"}
                  justify={"center"}
                  align={"center"}
                  bgColor={"#0380FF"}
                  p={"20px"}
                  onClick={() => {
                    setCollectGemStatus({ isOpen: true, minedGemId: id });
                  }}
                >
                  <Text fontSize={18}>Collect Gem</Text>
                  <Image alt="gem" src={GemIcon} />
                </Flex>
              ) : (
                <Flex flexDir={"column"} justify={"space-between"} p={"10px"}>
                  <Text
                    fontSize={14}
                    fontWeight={600}
                    textTransform={"capitalize"}
                  >
                    {rarity.toLowerCase()} {rarityScore}%
                  </Text>
                  <Flex columnGap={1} align={"center"}>
                    <Text fontSize={10} fontWeight={400} opacity={0.5}>
                      Staked ${staked}{" "}
                    </Text>
                    <Image alt="arrow" src={HighArrow} />
                    <Text color={"#61FF00"} fontSize={10} fontWeight={400}>
                      {dailyChange}%
                    </Text>
                  </Flex>
                </Flex>
              )}

              {mode === "market" && <PriceContainer price={100} />}
              {isMining === null && mode === "mine" && isReadyForMine ? (
                <Center
                  pos={"absolute"}
                  h={53}
                  top={0}
                  left={0}
                  w={"full"}
                  bg={"#191A22D9"}
                  columnGap={"6px"}
                  transition={"0.5s"}
                  _hover={{ bgColor: "#004422", fontSize: 24 }}
                  onMouseEnter={() => SetHoverMine(true)}
                  onMouseLeave={() => SetHoverMine(false)}
                  onClick={() => {
                    seMineModalState({ isOpen: true, mineTime: 2342347 });
                  }}
                >
                  <Text>{isHoverMine ? "Mine" : "Ready to mine"}</Text>
                  <Image alt="gem" src={GemIcon} width={16} height={16}></Image>
                </Center>
              ) : mode === "mine" && !isReadyForMine ? (
                <Box pos={"absolute"} w={"50px"} top={2} right={2}>
                  <Text fontSize={10}>
                    {`${Math.floor(timeRemaining / 3600)} : ${Math.floor(
                      (timeRemaining % 3600) / 60
                    )} : ${Math.floor((timeRemaining % 3600) % 60)}`}
                  </Text>
                </Box>
              ) : (
                ""
              )}
              {(mode === "forge" || mode === "common") && (
                <RarityViewer quadrants={quadrants} />
              )}
            </Flex>
          )}
        </Flex>

        <Box
          pos={"absolute"}
          bgColor={"blue"}
          w={"100%"}
          h={"100%"}
          rounded={8}
          sx={{
            backfaceVisibility: "hidden",
          }}
          transform={"rotateY(180deg)"}
        ></Box>
      </Box>
    </Box>
  );
};

export default GemCard;
