import Image from "next/image";
import { cloneElement, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import mergeImages from "merge-images";
import { PieceDir, PieceInfo, GradientType } from "@/types";

interface GemProps {
  quadrants: number[];
  gemBgColor?: string[];
  gradient?: GradientType;
  width?: number;
  height?: number;
  isOnlyFrame?: boolean;
}

const GemShape = ({
  quadrants,
  gemBgColor = ["#0000FF"],
  gradient = "solid",
  width = 120,
  height = 120,
  isOnlyFrame = false,
}: GemProps) => {
  const [combinedGem, setCombinedGem] = useState<string>("");
  const [bgGemShape, setBgGemShape] = useState<string>("");

  useEffect(() => {
    mergeImages(
      [
        {
          src: `/assets/gem_pieces/${quadrants[0]}_1.svg`,
          x: 0,
          y: 0,
        },
        {
          src: `/assets/gem_pieces/${quadrants[1]}_2.svg`,
          x: 160,
          y: 0,
        },
        {
          src: `/assets/gem_pieces/${quadrants[2]}_3.svg`,
          x: 0,
          y: 160,
        },
        {
          src: `/assets/gem_pieces/${quadrants[3]}_4.svg`,
          x: 160,
          y: 160,
        },
      ],
      {
        width: 320,
        height: 320,
      }
    ).then((blob) => {
      setCombinedGem(blob);
    });

    mergeImages(
      [
        {
          src: `/assets/gem_pieces/${quadrants[0]}_1 copy.svg`,
          x: 0,
          y: 0,
        },
        {
          src: `/assets/gem_pieces/${quadrants[1]}_2 copy.svg`,
          x: 160,
          y: 0,
        },
        {
          src: `/assets/gem_pieces/${quadrants[2]}_3 copy.svg`,
          x: 0,
          y: 160,
        },
        {
          src: `/assets/gem_pieces/${quadrants[3]}_4 copy.svg`,
          x: 160,
          y: 160,
        },
      ],
      {
        width: 320,
        height: 320,
      }
    ).then((blob) => {
      setBgGemShape(blob);
    });
  }, [quadrants]);

  return (
    <Box pos={"relative"} w={width} h={height}>
      {!isOnlyFrame && (
        <Box
          style={{
            maskImage: `url("${bgGemShape}")`,
            background:
              gemBgColor.length === 1
                ? gemBgColor[0]
                : `linear-gradient(${gemBgColor[0]}, ${gemBgColor[1]})`,
            maskSize: "100% 100%",
          }}
          pos={"absolute"}
          zIndex={-1}
          left={0}
          top={0}
          w={width}
          h={height}
        />
      )}
      <Box pos={"absolute"} left={0}>
        {combinedGem && (
          <Image width={width} height={height} alt="" src={combinedGem} />
        )}
      </Box>
    </Box>
  );
};

export default GemShape;
