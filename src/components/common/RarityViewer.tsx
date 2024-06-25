import { Grid, GridItem } from "@chakra-ui/react";
import { PieceInfo } from "@/types";

const RarityViewer = ({ pieces }: { pieces: PieceInfo }) => {
  return (
    <Grid
      pos={"absolute"}
      top={0}
      right={0}
      w={53}
      h={"full"}
      bg={"#00000080"}
      fontSize={16}
      templateColumns={"repeat(2, 1fr)"}
    >
      <GridItem
        textAlign={"center"}
        borderBottom={"1px solid #164355"}
        borderRight={"1px solid #164355"}
        w={"100%"}
      >
        {pieces.topLeft}
      </GridItem>
      <GridItem
        textAlign={"center"}
        borderBottom={"1px solid #164355"}
        w={"100%"}
      >
        {pieces.topRight}
      </GridItem>
      <GridItem
        textAlign={"center"}
        borderRight={"1px solid #164355"}
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
