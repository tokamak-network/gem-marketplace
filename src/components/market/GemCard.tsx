import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import PriceContainer from "../common/PriceContainer";
import HighArrow from "@/assets/icon/higharrow.svg";
import Image from "next/image";
import SavedIcon from "../common/SavedIcon";

interface GemCardType {
  rarity: string;
  rarityScore: number;
  staked: number;
  dailyChange: number;
}

const GemCard = ({ rarity, rarityScore, staked, dailyChange }: GemCardType) => {
  const [isSaved, setSaved] = useState<boolean>(false);
  const [isHover, setHover] = useState<boolean>(false);

  return (
    <Box
      w={212}
      h={272}
      bgColor={"transparent"}
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Box
        w={"100%"}
        h={"100%"}
        transition={"transform 0.8s"}
        style={{
          transformStyle: "preserve-3d",
          transform: isHover ? "rotateY(180deg)" : "",
        }}
        pos={"relative"}
      >
        <Flex
          pos={"absolute"}
          w={"100%"}
          h={"100%"}
          flexDir={"column"}
          rounded={8}
          overflow={"hidden"}
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <Box
            pos={"absolute"}
            top={"10px"}
            right={"10px"}
            cursor={"pointer"}
            zIndex={10}
            onClick={() => setSaved((prev) => !prev)}
          >
            <SavedIcon isFill={isSaved} />
          </Box>

          <Box w={"full"} h={"full"} bg={"white"} opacity={0.05}></Box>
          <Flex
            w={"full"}
            h={53}
            bgColor={"#00000080"}
            justify={"space-between"}
            p={"10px"}
          >
            <Flex flexDir={"column"} justify={"space-between"}>
              <Text fontSize={14} fontWeight={600}>
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

            <PriceContainer price={100} />
          </Flex>
        </Flex>

        <Box
          pos={"absolute"}
          bgColor={"blue"}
          w={"100%"}
          h={"100%"}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export default GemCard;
