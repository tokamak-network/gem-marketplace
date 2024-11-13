import { Box } from "@chakra-ui/react";
import Carousel from "react-multi-carousel";
import GemCard from "./GemCard";
import { useRecoilValue } from "recoil";
import { forgeResultSelector } from "@/recoil/forge/atom";

import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";
import { getValueOfRarity } from "@/utils";
import { rarityList } from "@/constants/rarity";
import { FACTORY_ADDRESS } from "@/constants/tokens";
import { useAccount } from "wagmi";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 2,
  },
};

const GemcardCarousel = () => {
  const { chain } = useAccount();
  const { forgeResultQuadrant, colorCombo, forgedRarity } =
    useRecoilValue(forgeResultSelector);
  const [gemValue, setGemValue] = useState();

  useEffect(() => {
    const fetchValue = async () => {
      const value = await getValueOfRarity(
        FACTORY_ADDRESS[chain?.id!] as `0x${string}`,
        rarityList.indexOf(forgedRarity)
      );
      setGemValue(value);
    };
    fetchValue();
  }, []);
  return (
    <Box h={"350px"}>
      {colorCombo && colorCombo.length > 0 && (
        <Carousel
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          keyBoardControl={true}
          transitionDuration={500}
          containerClass="carousel-container"
          itemClass="carousel-item"
          dotListClass="carousel-dot-list"
          partialVisible
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {colorCombo.map((item: any, key: number) => (
            <GemCard
              mode="forgeFinal"
              key={key}
              gemInfo={{
                tokenID: -1,
                quadrants: forgeResultQuadrant,
                color: item,
                rarity: forgedRarity,
                creationDate: 0,
                value: gemValue
              }}
              rarityScore={1}
              staked={253.2}
              dailyChange={16.7}
            />
          ))}
        </Carousel>
      )}
    </Box>
  );
};

export default GemcardCarousel;
