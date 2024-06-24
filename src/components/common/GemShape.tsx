import Image from "next/image";
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import mergeImages from "merge-images";
import { PieceDir, PieceInfo, GradientType } from "@/types";

interface GemProps {
  pieces: PieceInfo;
  bgColor: string[];
  gradient: GradientType;
}

const GemShape = ({
  pieces,
  bgColor = ["#0000FF"],
  gradient = "solid",
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
          x: 60,
          y: 0,
        },
        {
          src: `/assets/gem_pieces/${pieces[PieceDir.bottomLeft]}_3.svg`,
          x: 0,
          y: 60,
        },
        {
          src: `/assets/gem_pieces/${pieces[PieceDir.bottomRight]}_4.svg`,
          x: 60,
          y: 60,
        },
      ],
      {
        width: 120,
        height: 120,
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
          x: 60,
          y: 0,
        },
        {
          src: `/assets/gem_pieces/${pieces[PieceDir.bottomLeft]}_3 copy.svg`,
          x: 0,
          y: 60,
        },
        {
          src: `/assets/gem_pieces/${pieces[PieceDir.bottomRight]}_4 copy.svg`,
          x: 60,
          y: 60,
        },
      ],
      {
        width: 120,
        height: 120,
      }
    ).then((blob) => {
      setBgGemShape(blob);
    });
  }, []);

  return (
    <Box pos={"relative"} w={120} h={120}>
      <Box
        style={{
          maskImage: `url("${bgGemShape}")`,
          background:
            bgColor.length === 1
              ? bgColor[0]
              : `linear-gradient(${bgColor[0]}, ${bgColor[1]})`,
        }}
        pos={"absolute"}
        zIndex={-1}
        left={0}
        top={0}
        w={120}
        h={120}
      />
      <Box pos={"absolute"} left={0}>
        {combinedGem && (
          <Image width={120} height={120} alt="" src={combinedGem} />
        )}
      </Box>
    </Box>
  );
};

export default GemShape;
