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
  Spinner,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";

import {
  cooldownStatus,
  miningModalStatus,
  miningResultStatus,
} from "@/recoil/mine/atom";
import { useAccount } from "wagmi";
import { obtainModalStatus, rarityStatus } from "@/recoil/market/atom";
import {
  forgeConfirmModalStatus,
  selectedForgeGems,
  selectedFinalForge,
} from "@/recoil/forge/atom";
import GemShape from "./GemShape";
import { GemStandard, CardType, RarityType, TokenType } from "@/types";
import {
  collectGem,
  useCollectGem,
  useStartMiningGem,
} from "@/hooks/useMineGem";

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
import { decodeEventLog, formatUnits } from "viem";
import { cooldownIndex } from "@/constants";
import { useWaitForTransaction } from "@/hooks/useWaitTxReceipt";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useBalancePrice } from "@/hooks/useBalancePrice";
import Ribbon from "./Ribbon";
import SaleAlert from "./SaleAlert";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/config/wagmi";
import FactoryMiningABI from "@/abi/gemFactoryMining.json";
import { DRB_ADDRESS, FACTORY_ADDRESS } from "@/constants/tokens";
import { fulfillRandomRequest } from "@/hooks/useGemPack";

interface GemCardType {
  width?: number;
  height?: number;
  gemWidth?: number;
  gemHeight?: number;
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
  gemInfo,
  customGemColor,
}: GemCardType) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [miningTimeRemaining, setMiningTimeRemaining] = useState<number>(0);
  const [isReadyForStartMine, setReadyForStartMine] = useState<boolean>(false);
  const [isReadyForCollectMinedGem, setReadyForCollectMinedGem] =
    useState<boolean>(false);
  const [isHoverMine, SetHoverMine] = useState<boolean>(false);
  const [isHoverCooldown, SetHoverCooldown] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [, seMineModalState] = useRecoilState(miningModalStatus);
  const [, setCollectGemStatus] = useRecoilState(miningResultStatus);
  const [selectedGemsInfo, setSelectedGemsInfo] =
    useRecoilState(selectedForgeGems);
  const { selectedRarity, selectedGemsList } = selectedGemsInfo;
  const [, setRarityState] = useRecoilState(rarityStatus);
  const [, setForgeConfirm] = useRecoilState(forgeConfirmModalStatus);
  const [finalForgeItem, setFinalForgeGem] = useRecoilState(selectedFinalForge);
  const [cooldowns] = useRecoilState(cooldownStatus);
  const [isMineFailed, setMineFailed] = useState<boolean>(false);

  const theme = useTheme();
  const router = useRouter();

  const {
    tokenID,
    cooldownDueDate,
    color,
    rarity,
    isMining,
    quadrants,
    miningStartTime,
    miningPeriod,
    value,
    isForSale,
    miningTry,
  } = gemInfo;

  const { callStartMining } = useStartMiningGem();

  const { callCollectGem } = useCollectGem(tokenID);
  const { chain } = useAccount();
  const [_, setObtainModalStatus] = useRecoilState(obtainModalStatus);

  // const [savedGemList, setValue] = useLocalStorage("savedGemList", []);
  // const isSaved = useMemo(
  //   () => savedGemList.includes(Number(tokenID)),
  //   [savedGemList, tokenID]
  // );

  // const handleSavedClick = useCallback(
  //   (e: any) => {
  //     setValue(() => {
  //       if (savedGemList.includes(Number(tokenID))) {
  //         return savedGemList.filter(
  //           (item: number) => Number(item) !== Number(tokenID)
  //         );
  //       } else {
  //         return [...savedGemList, Number(tokenID)];
  //       }
  //     });
  //     e.preventDefault();
  //     e.stopPropagation();
  //   },
  //   [savedGemList, tokenID]
  // );

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTimestamp = Date.now();
      if (currentTimestamp / 1000 > Number(cooldownDueDate)) {
        setReadyForStartMine(true);
        setTimeRemaining(0);
      } else {
        setReadyForStartMine(false);
        setTimeRemaining(
          Number(cooldownDueDate) - Math.floor(currentTimestamp / 1000)
        );
      }

      if (
        currentTimestamp / 1000 >
          Number(miningStartTime) + Number(miningPeriod!) &&
        miningStartTime
      ) {
        setReadyForCollectMinedGem(true);
      } else if (
        currentTimestamp / 1000 <
          Number(miningStartTime) + Number(miningPeriod!) &&
        miningStartTime
      ) {
        setReadyForCollectMinedGem(false);
        setMiningTimeRemaining(
          Number(miningStartTime) +
            Number(miningPeriod!) -
            Number(currentTimestamp / 1000)
        );
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldownDueDate, miningPeriod, miningStartTime]);

  const cooldownRemainingTime = useMemo(
    () =>
      Math.floor(timeRemaining / (3600 * 24)) > 0
        ? `${Math.floor(timeRemaining / (3600 * 24))} Days`
        : `${Math.floor(timeRemaining / 3600)} : ${Math.floor(
            (timeRemaining % 3600) / 60
          )} : ${Math.floor((timeRemaining % 3600) % 60)}`,
    [timeRemaining]
  );

  const miningRemainingTime = useMemo(
    () =>
      Math.floor(miningTimeRemaining / (3600 * 24)) > 0
        ? `${Math.floor(miningTimeRemaining / (3600 * 24))} Days`
        : `${Math.floor(miningTimeRemaining / 3600)} : ${Math.floor(
            (miningTimeRemaining % 3600) / 60
          )} : ${Math.floor((miningTimeRemaining % 3600) % 60)}`,
    [miningTimeRemaining]
  );

  const handleCardClick = useCallback(() => {
    if (mode === "forge") {
      if (isForSale || isMining) return;
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

  const handleCollectGem = async () => {
    try {
      setLoading(true);
      const tx = await callCollectGem();
      // const tx = await collectGem(
      //   tokenID,
      //   FACTORY_ADDRESS[chain?.id!] as `0x${string}`
      // );
      const logData = await waitForTransactionReceipt(config, {
        hash: tx,
      });

      const topic: any = await decodeEventLog({
        abi: FactoryMiningABI,
        data: logData?.logs[2].data,
        topics: logData?.logs[2].topics,
      });
      const requestId = topic?.args?.requestNumber;

      const fulfillTx = await fulfillRandomRequest(
        DRB_ADDRESS[chain?.id!] as `0x${string}`,
        requestId
      );
      const fulfillLogData = await waitForTransactionReceipt(config, {
        hash: fulfillTx,
      });

      const fulfillTopic: any = await decodeEventLog({
        abi: FactoryMiningABI,
        data: fulfillLogData?.logs[2].data,
        topics: fulfillLogData?.logs[2].topics,
      });
      const tokenId = fulfillTopic?.args?.tokenId;
      setObtainModalStatus({ isOpen: true, gemId: tokenId });
      setLoading(false);
    } catch (e) {
      setMineFailed(true);
      setLoading(false);
      console.log(e);
    }
  };

  const isForgeSelected = useMemo(() => {
    const selected = selectedGemsList.filter(
      (item) => Number(item.tokenID) === Number(tokenID)
    );
    return selected.length > 0 ? true : false;
  }, [selectedGemsList, selectedRarity]);

  const isFinalForgeItemSelected = useMemo(() => {
    return arraysEqual(color, finalForgeItem.color);
  }, [finalForgeItem, color]);

  const valueUSD = useBalancePrice(
    Number(formatUnits(value! ?? "0", 27)),
    TokenType.WSTON
  );
  return (
    <Box
      pos={"relative"}
      w={width}
      h={height}
      minW={width}
      bgColor={"#191A22"}
      sx={{ perspective: "1000px" }}
      cursor={mode !== "normal" ? "pointer" : "default"}
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
      {mode === "chest" && isForSale && <Ribbon />}
      {((mode === "forge" && isForSale) ||
        (mode === "forge" && isMining) ||
        (mode === "mine" && isForSale) ||
        (mode === "mine" && !isMining && miningTry === 0)) && (
        <SaleAlert isMining={isMining!} miningTry={miningTry} />
      )}
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
          {
            // mode === "market" || mode === "normal" ? (
            //   <Box
            //     pos={"absolute"}
            //     top={"10px"}
            //     right={"10px"}
            //     cursor={"pointer"}
            //     zIndex={10}
            //     onClick={(e) => handleSavedClick(e)}
            //   >
            //     <SavedIcon
            //       width={mode === "normal" ? 34 : 16}
            //       height={mode === "normal" ? 28 : 13}
            //       isFill={isSaved}
            //     />
            //   </Box>
            // ) :
            mode === "mine" ? (
              <Tooltip
                bg={"#000000E5"}
                label={<MineProbability rarity={Number(rarity)} />}
                hasArrow
              >
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
            )
          }

          <Center w={"full"} h={"full"} bg={""}>
            <GemShape
              gradient="linear"
              quadrants={quadrants}
              gemColor={customGemColor ? customGemColor : color}
              width={gemWidth}
              height={gemHeight}
            />
          </Center>

          {((mode === "mine" && isMining && !isReadyForCollectMinedGem) ||
            (mode === "mine" && !isReadyForStartMine && !isMining)) &&
            (isMineFailed ? (
              <Text px={2} fontSize={10} color={"#FFFFFF80"}>
                Mining Failed.
              </Text>
            ) : (
              <>
                <Center justifyContent={"space-between"} px={2}>
                  <Text fontSize={10} color="#FFFFFF80">
                    Time Remaining
                  </Text>
                  <Text fontSize={12} minW={"56px"}>
                    {isMining ? miningRemainingTime : cooldownRemainingTime}
                  </Text>
                </Center>
                <Progress
                  value={
                    isMining
                      ? ((miningPeriod! - miningTimeRemaining) /
                          miningPeriod!) *
                        100
                      : ((cooldowns[cooldownIndex[Number(rarity)]] -
                          timeRemaining) /
                          cooldowns[cooldownIndex[Number(rarity)]]) *
                        100
                  }
                  bgColor={"transparent"}
                  colorScheme="gray"
                  h={"3px"}
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
                isMineFailed ? (
                  <Center
                    h={53}
                    w={"full"}
                    bg={"#00000080"}
                    columnGap={"6px"}
                    transition={"0.5s"}
                    _hover={{ bgColor: "#000000" }}
                    onMouseEnter={() => SetHoverMine(true)}
                    onMouseLeave={() => SetHoverMine(false)}
                    border={"1px solid #FFFFFF40"}
                    rounded={"0px 0px 8px 8px"}
                    onClick={() => setMineFailed(false)}
                  >
                    Unlucky.. Try Again
                  </Center>
                ) : isReadyForStartMine && isMining !== true ? (
                  <Tooltip
                    w={"232px"}
                    hasArrow
                    bg={"#000000E5"}
                    label={
                      <MinePreview
                        rarity={rarity}
                        minesRemaining={miningTry!}
                      />
                    }
                    placement={"top"}
                  >
                    <Center
                      h={53}
                      w={"full"}
                      bg={"#00000080"}
                      columnGap={"6px"}
                      transition={"0.5s"}
                      _hover={{ bgColor: "#000000" }}
                      onMouseEnter={() => SetHoverMine(true)}
                      onMouseLeave={() => SetHoverMine(false)}
                      border={"1px solid #FFFFFF40"}
                      rounded={"0px 0px 8px 8px"}
                      onClick={async () => {
                        if (isForSale) return;
                        try {
                          setLoading(true);
                          const txHash = await callStartMining(tokenID);
                          await waitForTransactionReceipt(config, {
                            hash: txHash!,
                          });
                          seMineModalState({
                            isOpen: true,
                            mineTime: miningRemainingTime,
                          });
                          setLoading(false);
                        } catch (e) {
                          setLoading(false);
                        }
                      }}
                    >
                      {isLoading ? (
                        <Spinner
                          thickness="4px"
                          speed="0.65s"
                          emptyColor="gray.200"
                          color="blue.500"
                          size="md"
                        />
                      ) : (
                        <Text>
                          {isHoverMine ? "Mine Gem" : "Ready to mine"}
                        </Text>
                      )}
                    </Center>
                  </Tooltip>
                ) : !isReadyForStartMine ? (
                  <Center
                    h={53}
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
                    <Text>{"Cooldown..."}</Text>
                  </Center>
                ) : isReadyForStartMine === true &&
                  isMining === true &&
                  !isReadyForCollectMinedGem ? (
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
                ) : isReadyForStartMine === true &&
                  isReadyForCollectMinedGem &&
                  isMining === true ? (
                  <Flex
                    w={"full"}
                    h={"full"}
                    justify={"center"}
                    align={"center"}
                    bgColor={"#0380FF"}
                    p={"20px"}
                    columnGap={"6px"}
                    onClick={() => handleCollectGem()}
                  >
                    {isLoading ? (
                      <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="md"
                      />
                    ) : (
                      <>
                        <Text fontSize={18}>Collect Gem</Text>
                        <Image alt="gem" src={GemIcon} width={16} height={16} />
                      </>
                    )}
                  </Flex>
                ) : (
                  ""
                )
              ) : mode === "forgeFinal" ? (
                <Flex p={"10px"} flexDir={"column"}>
                  <Text
                    fontSize={10}
                    opacity={0.5}
                  >{`Staked Value $${valueUSD}`}</Text>
                  <Text fontSize={14} fontWeight={600}>
                    {formatUnits(value! ?? "0", 27)} TITANWSTON
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
                      Staked {formatUnits(value!, 27)}
                      {" TITANWSTON"}
                    </Text>
                  </Flex>
                </Flex>
              )}

              {mode === "market" && (
                <PriceContainer
                  price={Number(formatUnits(gemInfo.price!, 27))}
                />
              )}

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
