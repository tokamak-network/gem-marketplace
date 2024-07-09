import { Box, Grid, GridItem } from "@chakra-ui/react";
import { PieceInfo } from "@/types";
import GemShape from "./GemShape";

const RarityViewer = ({ pieces }: { pieces: PieceInfo }) => {
  return (
    <Grid
      pos={"absolute"}
      top={0}
      right={0}
      w={53}
      h={"full"}
      bg={"#00000060"}
      fontSize={16}
      templateColumns={"repeat(2, 1fr)"}
    >
      <Box
        pos={"absolute"}
        left={0}
        top={0}
        zIndex={-1}
        bgColor={"transparent"}
      >
        <GemShape pieces={pieces} isOnlyFrame width={52} height={52} />
      </Box>
      <GridItem
        zIndex={2}
        textAlign={"center"}
        borderBottom={"2px solid #00000080"}
        borderRight={"2px solid #00000080"}
        w={"100%"}
      >
        {pieces.topLeft}
      </GridItem>
      <GridItem
        textAlign={"center"}
        borderBottom={"2px solid #00000080"}
        w={"100%"}
      >
        {pieces.topRight}
      </GridItem>
      <GridItem
        textAlign={"center"}
        borderRight={"2px solid #00000080"}
        w={"100%"}
      >
        {pieces.bottomLeft}
      </GridItem>
      <GridItem w={"100%"} textAlign={"center"}>
        {pieces.bottomRight}
      </GridItem>
    </Grid>
  );
};

export default RarityViewer;
