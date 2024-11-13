import { Box, Center, Flex } from "@chakra-ui/react";

const SaleAlert = ({ isMining }: { isMining?: boolean }) => {
  return (
    <Box
      pos={"absolute"}
      left={0}
      top={0}
      w={"212px"}
      h={"272px"}
      bgColor={"#00000080"}
      rounded={"8px"}
      zIndex={1}
    >
      <Center
        pos={"absolute"}
        bgColor={"black"}
        w={"132px"}
        h={"24px"}
        rounded={"8px 0px"}
        fontSize={12}
        fontWeight={700}
      >
        {isMining ? "Currently Mining" : "Currently For Sale"}
      </Center>
    </Box>
  );
};

export default SaleAlert;