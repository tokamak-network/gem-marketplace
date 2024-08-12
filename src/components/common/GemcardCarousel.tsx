import { Box } from "@chakra-ui/react";
import Carousel from "react-multi-carousel";
import GemCard from "./GemCard";
import { GemList } from "@/constants";
import "react-multi-carousel/lib/styles.css";

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
  return (
    <Box h={"350px"}>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        itemClass="carousel-item"
        dotListClass="carousel-dot-list"
        
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {GemList.map((item, key) => (
          key < 5 &&
            <GemCard
              mode="forge"
              key={key}
              gemInfo={item}
              rarityScore={1}
              staked={253.2}
              dailyChange={16.7}
            ></GemCard>
          ))}
        {/* <Box height={"100px"}>Item 1</Box>
        <Box height={"100px"}>Item 2</Box>
        <Box height={"100px"}>Item 3</Box>
        <Box height={"100px"}>Item 4</Box> */}
      </Carousel>
    </Box>
  );
};

export default GemcardCarousel;
