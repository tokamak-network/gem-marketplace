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
import { miningModalStatus } from "@/recoild/mine/atom";

import GemIcon from "@/assets/icon/mine.svg";
import GemModel from "@/assets/gem/gem_legendary.svg";

interface GemCardType {
  rarity: string;
  rarityScore: number;
  staked: number;
  dailyChange: number;
  mode?: "market" | "forge" | "mine";
  lastMineTime?: number;
}

const GemCard = ({
  mode = "market",
  rarity,
  rarityScore,
  staked,
  dailyChange,
  lastMineTime = Date.now(),
}: GemCardType) => {
  const [isSaved, setSaved] = useState<boolean>(false);
  const [isFlip, setFlip] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isReadyForMine, setReadyForMine] = useState<boolean>(false);
  const [isHoverMine, SetHoverMine] = useState<boolean>(false);
  const [, seMineModalState] = useRecoilState(miningModalStatus);

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

  return (
    <Box
      w={212}
      h={272}
      bgGradient={"radial(#6F97FF, #1F25A4)"}
      sx={{ perspective: "1000px" }}
      cursor={"pointer"}
      onClick={() => setFlip((prev) => !prev)}
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
            <Image alt="gem" src={GemModel}/>
          </Center>

          {mode === "mine" && (
            <Progress
              value={((COOLDOWN - timeRemaining) / COOLDOWN) * 100}
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
          >
            <Flex flexDir={"column"} justify={"space-between"} m={"10px"}>
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
              <Grid w={53} h={"full"} bg={"#00000080"} templateColumns={"repeat(2, 1fr)"}>
                <GridItem
                  borderBottom={"1px solid #164355"}
                  borderRight={"1px solid #164355"}
                  w={"100%"}
                ></GridItem>
                <GridItem
                  borderBottom={"1px solid #164355"}
                  w={"100%"}
                ></GridItem>
                <GridItem
                  borderRight={"1px solid #164355"}
                  w={"100%"}
                ></GridItem>
                <GridItem w={"100%"}></GridItem>
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
