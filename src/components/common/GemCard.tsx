"use client";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Text,
  Progress,
  Center,
  useTheme,
  Tooltip,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";

import { miningModalStatus, miningResultStatus } from "@/recoil/mine/atom";
import { rarityStatus } from "@/recoil/market/atom";
import {
  forgeConfirmModalStatus,
  selectedForgeGems,
  selectedFinalForge,
} from "@/recoil/forge/atom";
import GemShape from "./GemShape";
import { GemStandard, CardType, RarityType } from "@/types";
import { useStartMiningGem } from "@/hooks/useMineGem";

import PriceContainer from "./PriceContainer";
import RarityViewer from "./RarityViewer";
import MinePreview from "../tooltipLabel/MinePreview";
import MineProbability from "../tooltipLabel/MineProbability";

import GemIcon from "@/assets/icon/mine.svg";
import HighArrow from "@/assets/icon/higharrow.svg";
import SavedIcon from "./SavedIcon";
import InfoIcon from "@/assets/icon/info.svg";
import { rarityList } from "@/constants/rarity";
import { arraysEqual } from "@/utils";
import { formatUnits } from "viem";

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
  customGemColor?: number[];
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
  customGemColor,
}: GemCardType) => {
  const [isSaved, setSaved] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isReadyForStartMine, setReadyForStartMine] = useState<boolean>(false);
  const [isHoverMine, SetHoverMine] = useState<boolean>(false);
  const [isHoverCooldown, SetHoverCooldown] = useState<boolean>(false);
  const [, seMineModalState] = useRecoilState(miningModalStatus);

  const [, setCollectGemStatus] = useRecoilState(miningResultStatus);

  const [selectedGemsInfo, setSelectedGemsInfo] =
    useRecoilState(selectedForgeGems);
  const { selectedRarity, selectedGemsList } = selectedGemsInfo;
  const [, setRarityState] = useRecoilState(rarityStatus);
  const [, setForgeConfirm] = useRecoilState(forgeConfirmModalStatus);
  const [finalForgeItem, setFinalForgeGem] = useRecoilState(selectedFinalForge);

  const theme = useTheme();
  const router = useRouter();

  const {
    tokenID,
    cooldownDueDate,
    color,
    rarity,
    isMining,
    quadrants,
    gemCooldownInitTime,
  } = gemInfo;

  const { callStartMining, isPending: isStartMiningPending } =
    useStartMiningGem(tokenID);

  useEffect(() => {
    const currentTimestamp = Date.now();
    const interval = setInterval(() => {
      if (currentTimestamp / 1000 > Number(cooldownDueDate)) {
        setReadyForStartMine(true);
        setTimeRemaining(0);
      } else {
        setReadyForStartMine(false);
        setTimeRemaining(
          Number(cooldownDueDate) - Math.floor(currentTimestamp / 1000)
        );
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timeRemaining]);

  const handleCardClick = useCallback(() => {
    if (mode === "forge") {
      setSelectedGemsInfo((prev) => ({
        ...prev,
        selectedRarity: rarity,
      }));
      if (selectedGemsList.length === 0) {
        setSelectedGemsInfo({
          selectedRarity: rarity,
          selectedGemsList: [gemInfo],
        });
        setRarityState(() => ({
          ...{
            common: false,
            rare: false,
            unique: false,
            epic: false,
            legendary: false,
            mythic: false,
            heirloom: false,
          },
          ...{ [rarityList[Number(gemInfo.rarity)]]: true },
        }));
      } else {
        let filterList = selectedGemsList.filter(
          (item) => Number(item.tokenID) === Number(tokenID)
        );

        if (filterList.length > 0) {
          if (selectedGemsList.length === 1) {
            setSelectedGemsInfo({
              selectedRarity: RarityType.none,
              selectedGemsList: [],
            });
            return;
          }
          let resultList = selectedGemsList.filter(
            (item) => Number(item.tokenID) !== Number(tokenID)
          );
          setSelectedGemsInfo((prev) => ({
            selectedRarity: gemInfo.rarity,
            selectedGemsList: [...resultList],
          }));
          return;
        }
        if (
          Object.keys(RarityType).indexOf(rarityList[Number(selectedRarity)]) +
            2 >
          selectedGemsList.length
        ) {
          if (
            Object.keys(RarityType).indexOf(
              rarityList[Number(selectedRarity)]
            ) +
              1 ===
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
    } else if (mode === "market") {
      router.push(`/market?asset=${gemInfo.tokenID}`);
    } else if (mode === "chest") {
      router.push(`/chest?asset=${gemInfo.tokenID}`);
    } else if (mode === "forgeFinal") {
      setFinalForgeGem({ color: [...color] });
    }
  }, [selectedGemsList, selectedRarity, selectedGemsInfo, gemInfo]);

  const isForgeSelected = useMemo(() => {
    const selected = selectedGemsList.filter(
      (item) => Number(item.tokenID) === Number(tokenID)
    );
    return selected.length > 0 ? true : false;
  }, [selectedGemsList, selectedRarity]);

  const isFinalForgeItemSelected = useMemo(() => {
    return arraysEqual(color, finalForgeItem.color);
  }, [finalForgeItem, color]);

  return (
    <Box
      pos={"relative"}
      w={width}
      h={height}
      minW={width}
      bgColor={"#191A22"}
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
        (isForgeSelected && mode === "forge") ||
        mode === "common" ||
        (isFinalForgeItemSelected && mode === "forgeFinal")
          ? "1px solid #FFFFFF"
          : ""
      }
      transition={"0.2s"}
    >
      {((isForgeSelected && mode === "forge") ||
        (isFinalForgeItemSelected && mode === "forgeFinal")) && (
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
            {isForgeSelected && mode === "forge"
              ? `selected ${selectedGemsList.indexOf(gemInfo) + 1} of ${
                  Object.keys(RarityType).indexOf(
                    rarityList[Number(selectedRarity)]
                  ) + 2
                }`
              : isFinalForgeItemSelected && mode === "forgeFinal"
                ? "Selected"
                : ""}
          </Center>
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
          {mode === "market" || mode === "normal" ? (
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
          ) : mode === "mine" ? (
            <Tooltip bg={"#000000E5"} label={<MineProbability />} hasArrow>
              <Flex
                columnGap={1}
                pos={"absolute"}
                top={"10px"}
                right={"10px"}
                opacity={0.5}
              >
                <Text fontSize={10}>Probability:</Text>
                <Image alt="info" src={InfoIcon} width={8} height={8} />
              </Flex>
            </Tooltip>
          ) : (
            <></>
          )}

          <Center w={"full"} h={"full"} bg={""}>
            <GemShape
              gradient="linear"
              quadrants={quadrants}
              gemColor={customGemColor ? customGemColor : color}
              width={gemWidth}
              height={gemHeight}
            />
          </Center>

          {(mode === "mine" && isMining) ||
            (mode === "mine" && !isReadyForStartMine && (
              <>
                <Center justifyContent={"space-between"} px={2}>
                  <Text fontSize={10} color="#FFFFFF80">
                    Time Remaining
                  </Text>
                  <Text fontSize={12} minW={"74px"}>
                    {`${Math.floor(timeRemaining / (3600 * 24))} : ${Math.floor(((timeRemaining % 3600) * 24) / 3600)} : ${Math.floor(
                      (timeRemaining % 3600) / 60
                    )} : ${Math.floor((timeRemaining % 3600) % 60)}`}
                  </Text>
                </Center>
                <Progress
                  value={
                    ((Math.floor(Date.now() / 1000) -
                      Number(gemCooldownInitTime)) /
                      Number(cooldownDueDate)) *
                    100
                  }
                  colorScheme="pink"
                  h={"2px"}
                />
              </>
            ))}

          {mode !== "normal" && (
            <Flex
              pos={"relative"}
              w={"full"}
              h={53}
              bgColor={"#00000080"}
              justify={"space-between"}
              align={"center"}
            >
              {mode === "mine" ? (
                isReadyForStartMine && !isMining ? (
                  <Tooltip
                    w={"232px"}
                    hasArrow
                    bg={"#000000E5"}
                    label={<MinePreview rarity={rarity} />}
                    placement={"top"}
                  >
                    <Center
                      h={53}
                      top={0}
                      left={0}
                      w={"full"}
                      bg={"#00000080"}
                      columnGap={"6px"}
                      transition={"0.5s"}
                      _hover={{ bgColor: "#000000" }}
                      onMouseEnter={() => SetHoverMine(true)}
                      onMouseLeave={() => SetHoverMine(false)}
                      border={"1px solid #FFFFFF40"}
                      rounded={"0px 0px 8px 8px"}
                      onClick={() => {
                        seMineModalState({ isOpen: true, mineTime: 2342347 });
                        callStartMining();
                      }}
                    >
                      <Text>{isHoverMine ? "Mine Gem" : "Ready to mine"}</Text>
                      <Image
                        alt="gem"
                        src={GemIcon}
                        width={16}
                        height={16}
                      ></Image>
                    </Center>
                  </Tooltip>
                ) : !isReadyForStartMine ? (
                  <Center
                    h={53}
                    top={0}
                    left={0}
                    w={"full"}
                    bg={"#00000080"}
                    columnGap={"6px"}
                    transition={"0.5s"}
                    _hover={{ bgColor: "#000000" }}
                    onMouseEnter={() => SetHoverCooldown(true)}
                    onMouseLeave={() => SetHoverCooldown(false)}
                    border={"1px solid #FFFFFF40"}
                    textColor={isHoverCooldown ? "#FFFFFF" : "#FFFFFF80"}
                    rounded={"0px 0px 8px 8px"}
                  >
                    <Text>{isHoverCooldown ? "Speed Up" : "Cooldown..."}</Text>
                  </Center>
                ) : isReadyForStartMine === true && isMining === true ? (
                  <Flex
                    w={"full"}
                    justify={"center"}
                    align={"center"}
                    columnGap={1}
                    h={"53px"}
                    bgColor={"#00000080"}
                    color={"#FFFFFF80"}
                    _hover={{ bgColor: "#000000", color: "#FFFFFF" }}
                    rounded={"0px 0px 8px 8px"}
                    border={"1px solid #FFFFFF40"}
                    transition={"0.2s"}
                  >
                    <Text fontSize={18} textAlign={"center"}>
                      Cancel Mine
                    </Text>
                  </Flex>
                ) : (
                  // :isReadyForStartMine === true && isMining === false ?
                  //                 <Flex
                  //   w={"full"}
                  //   h={"full"}
                  //   justify={"center"}
                  //   align={"center"}
                  //   bgColor={"#0380FF"}
                  //   p={"20px"}
                  //   columnGap={"6px"}
                  //   onClick={() => {
                  //     setCollectGemStatus({ isOpen: true, minedGemId: tokenID });
                  //   }}
                  // >
                  //   <Text fontSize={18}>Collect Gem</Text>
                  //   <Image alt="gem" src={GemIcon} width={16} height={16} />
                  // </Flex>
                  ""
                )
              ) : mode === "forgeFinal" ? (
                <Flex p={"10px"} flexDir={"column"}>
                  <Text
                    fontSize={10}
                    opacity={0.5}
                  >{`Staked Value $${staked}`}</Text>
                  <Text fontSize={14} fontWeight={600}>
                    6 TITANWSTON
                  </Text>
                </Flex>
              ) : (
                <Flex flexDir={"column"} justify={"space-between"} p={"10px"}>
                  <Text
                    fontSize={14}
                    fontWeight={600}
                    textTransform={"capitalize"}
                  >
                    {rarityList[Number(rarity)]} #{tokenID}
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
              {mode === "mine" && isReadyForStartMine && isMining === true ? (
                <Flex
                  w={"full"}
                  justify={"center"}
                  align={"center"}
                  columnGap={1}
                  h={"53px"}
                  bgColor={"#00000080"}
                  color={"#FFFFFF80"}
                  _hover={{ bgColor: "#000000", color: "#FFFFFF" }}
                  rounded={"0px 0px 8px 8px"}
                  border={"1px solid #FFFFFF40"}
                  transition={"0.2s"}
                >
                  <Text fontSize={18} textAlign={"center"}>
                    Cancel Mine
                  </Text>
                </Flex>
              ) : (
                // : mode === "mine" && isMining === false ? (
                //   <Flex
                //     w={"full"}
                //     h={"full"}
                //     justify={"center"}
                //     align={"center"}
                //     bgColor={"#0380FF"}
                //     p={"20px"}
                //     columnGap={"6px"}
                //     onClick={() => {
                //       setCollectGemStatus({ isOpen: true, minedGemId: tokenID });
                //     }}
                //   >
                //     <Text fontSize={18}>Collect Gem</Text>
                //     <Image alt="gem" src={GemIcon} width={16} height={16} />
                //   </Flex>
                // )
                <></>
              )}

              {mode === "market" && <PriceContainer price={Number(formatUnits(gemInfo.price!, 27))} />}

              {(mode === "forge" ||
                mode === "common" ||
                mode === "forgeFinal") && (
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
