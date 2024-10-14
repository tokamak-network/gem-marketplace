import { Box } from "@chakra-ui/react";
import Carousel from "react-multi-carousel";
import GemCard from "./GemCard";
import { useRecoilValue } from "recoil";
import { forgeResultSelector } from "@/recoil/forge/atom";

import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    slidesToSlide: 2
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 2
  },
};

const GemcardCarousel = () => {
  const { forgeResultQuadrant, colorCombo, forgedRarity } =
    useRecoilValue(forgeResultSelector);

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
