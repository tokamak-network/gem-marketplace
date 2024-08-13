import { Box } from "@chakra-ui/react";
import Carousel from "react-multi-carousel";
import GemCard from "./GemCard";
import { GemList } from "@/constants";
import "react-multi-carousel/lib/styles.css";
import { useRecoilValue } from "recoil";
import { forgeResultSelector } from "@/recoil/forge/atom";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const GemcardCarousel = () => {
  const { forgeResultQuadrant, colorCombo, forgedRarity } =
    useRecoilValue(forgeResultSelector);

  return (
    <Box h={"350px"}>
      {colorCombo && colorCombo.length > 0 && (
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          autoPlaySpeed={1000}
          keyBoardControl={true}
          transitionDuration={500}
          containerClass="carousel-container"
          itemClass="carousel-item"
          dotListClass="carousel-dot-list"
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {colorCombo.map((item: any, key: number) => (
            <GemCard
              mode="forgeFinal"
              key={key}
              gemInfo={{
                id: -1,
                quadrants: forgeResultQuadrant,
                gemColor: item,
                lastMineTime: 0,
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
