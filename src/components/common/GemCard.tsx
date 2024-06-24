"use client";
import Image from "next/image";
import {
  Box,
  Flex,
  Text,
  Progress,
  Center,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PriceContainer from "./PriceContainer";
import HighArrow from "@/assets/icon/higharrow.svg";
import SavedIcon from "./SavedIcon";
import { COOLDOWN } from "@/constants";
import { useRecoilState } from "recoil";
import { miningModalStatus } from "@/recoil/mine/atom";
import { selectedForgeGem } from "@/recoil/forge/atom";
import { GemStandard } from "@/types";

import GemIcon from "@/assets/icon/mine.svg";
import GemShape from "./GemShape";
import { PieceInfo, PieceDir } from "@/types";

interface GemCardType {
  rarity: string;
  rarityScore: number;
  staked: number;
  dailyChange: number;
  mode?: "market" | "forge" | "mine";
  gemInfo: GemStandard;
}

const GemCard = ({
  mode = "market",
  rarity,
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
  const { firstSelectedGem, secondSelectedGem } = selectedGems;

  const { id, lastMineTime, gemBgColor } = gemInfo;
  const pieces = {
    topLeft: gemInfo.topLeft,
    topRight: gemInfo.topRight,
    bottomLeft: gemInfo.bottomLeft,
    bottomRight: gemInfo.bottomRight,
  };

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

  const handleCardClick = () => {
    if (mode === "forge") {
      const selectedGem: GemStandard = {
        id: id,
        topLeft: pieces.topLeft,
        topRight: pieces.topRight,
        bottomLeft: pieces.bottomLeft,
        bottomRight: pieces.bottomRight,
        gemBgColor: gemBgColor,
        lastMineTime: lastMineTime
      };

      if (firstSelectedGem === null && secondSelectedGem === null) {
        setSelectedGems((prev) => ({
          ...prev,
          ...{ firstSelectedGem: selectedGem },
        }));
      }

      if (firstSelectedGem !== null && secondSelectedGem === null) {
        if (firstSelectedGem.id === id) {
          setSelectedGems((prev) => ({
            ...prev,
            ...{ firstSelectedGem: null },
          }));
        } else {
          setSelectedGems((prev) => ({
            ...prev,
            ...{ secondSelectedGem: selectedGem },
          }));
        }
      }

      if (firstSelectedGem === null && secondSelectedGem !== null) {
        if (secondSelectedGem.id === id) {
          setSelectedGems((prev) => ({
            ...prev,
            ...{ secondSelectedGem: null },
          }));
        } else {
          setSelectedGems((prev) => ({
            ...prev,
            ...{ firstSelectedGem: selectedGem },
          }));
        }
      }

      if (firstSelectedGem !== null && secondSelectedGem !== null) {
        if (firstSelectedGem.id === id) {
          setSelectedGems((prev) => ({
            ...prev,
            ...{ firstSelectedGem: null },
          }));
        }
        if (secondSelectedGem.id === id) {
          setSelectedGems((prev) => ({
            ...prev,
            ...{ secondSelectedGem: null },
          }));
        }
      }
    }
  };

  return (
    <Box
      w={212}
      h={272}
      bgGradient={"radial(#6F97FF, #1F25A4)"}
      sx={{ perspective: "1000px" }}
      cursor={"pointer"}
      onClick={handleCardClick}
      rounded={8}
    >
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
            <SavedIcon isFill={isSaved} />
          </Box>

          <Center w={"full"} h={"full"} bg={""}>
            <GemShape
              gradient="linear"
              pieces={pieces}
              gemBgColor={gemBgColor}
            />
          </Center>

          {mode === "mine" && (
            <Progress
              value={((COOLDOWN - timeRemaining) / COOLDOWN) * 100}
              colorScheme="green"
              h={"2px"}
            />
          )}

          <Flex
            pos={"relative"}
            w={"full"}
            h={53}
            bgColor={"#00000080"}
            justify={"space-between"}
            align={"center"}
            p={"10px"}
          >
            <Flex flexDir={"column"} justify={"space-between"}>
              <Text fontSize={14} fontWeight={600} textTransform={"capitalize"}>
                {rarity} {rarityScore}%
              </Text>
              <Flex columnGap={1} align={"center"}>
                <Text fontSize={10} fontWeight={400}>
                  Staked ${staked}{" "}
                </Text>
                <Image alt="arrow" src={HighArrow} />
                <Text color={"#61FF00"} fontSize={10} fontWeight={400}>
                  {dailyChange}%
                </Text>
              </Flex>
            </Flex>

            {mode === "market" && <PriceContainer price={100} />}
            {mode === "mine" && isReadyForMine ? (
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
                  console.log("heyhey");
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
            {mode === "forge" && (
              <Grid
                pos={"absolute"}
                top={0}
                right={0}
                w={53}
                h={"full"}
                bg={"#00000080"}
                fontSize={16}
                templateColumns={"repeat(2, 1fr)"}
              >
                <GridItem
                  textAlign={"center"}
                  borderBottom={"1px solid #164355"}
                  borderRight={"1px solid #164355"}
                  w={"100%"}
                >
                  {pieces.topLeft}
                </GridItem>
                <GridItem
                  textAlign={"center"}
                  borderBottom={"1px solid #164355"}
                  w={"100%"}
                >
                  {pieces.topRight}
                </GridItem>
                <GridItem
                  textAlign={"center"}
                  borderRight={"1px solid #164355"}
                  w={"100%"}
                >
                  {pieces.bottomLeft}
                </GridItem>
                <GridItem w={"100%"} textAlign={"center"}>
                  {pieces.bottomRight}
                </GridItem>
              </Grid>
            )}
          </Flex>
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
