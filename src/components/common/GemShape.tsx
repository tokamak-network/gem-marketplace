import Image from "next/image";
import { cloneElement, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import mergeImages from "merge-images";
import { PieceDir, PieceInfo, GradientType } from "@/types";

interface GemProps {
  pieces: PieceInfo;
  gemBgColor: string[];
  gradient?: GradientType;
  width?: number;
  height?: number;
}

const GemShape = ({
  pieces,
  gemBgColor = ["#0000FF"],
  gradient = "solid",
  width = 120,
  height = 120,
}: GemProps) => {
  const [combinedGem, setCombinedGem] = useState<string>("");
  const [bgGemShape, setBgGemShape] = useState<string>("");

  useEffect(() => {
    mergeImages(
      [
        {
          src: `/assets/gem_pieces/${pieces[PieceDir.topLeft]}_1.svg`,
          x: 0,
          y: 0,
        },
        {
          src: `/assets/gem_pieces/${pieces[PieceDir.topRight]}_2.svg`,
          x: 160,
          y: 0,
        },
        {
          src: `/assets/gem_pieces/${pieces[PieceDir.bottomLeft]}_3.svg`,
          x: 0,
          y: 160,
        },
        {
          src: `/assets/gem_pieces/${pieces[PieceDir.bottomRight]}_4.svg`,
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
          src: `/assets/gem_pieces/${pieces[PieceDir.topLeft]}_1 copy.svg`,
          x: 0,
          y: 0,
        },
        {
          src: `/assets/gem_pieces/${pieces[PieceDir.topRight]}_2 copy.svg`,
          x: 160,
          y: 0,
        },
        {
          src: `/assets/gem_pieces/${pieces[PieceDir.bottomLeft]}_3 copy.svg`,
          x: 0,
          y: 160,
        },
        {
          src: `/assets/gem_pieces/${pieces[PieceDir.bottomRight]}_4 copy.svg`,
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
  }, []);

  return (
    <Box pos={"relative"} w={width} h={height}>
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
      <Box pos={"absolute"} left={0}>
        {combinedGem && (
          <Image width={width} height={height} alt="" src={combinedGem} />
        )}
      </Box>
    </Box>
  );
};

export default GemShape;
