import { Box, Center, Flex } from "@chakra-ui/react";

const SaleAlert = ({
  isMining,
  miningTry,
}: {
  isMining?: boolean;
  miningTry?: number;
}) => {
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
      cursor={"not-allowed"}
    >
      <Center
        pos={"absolute"}
        bgColor={"black"}
        w={"150px"}
        h={"24px"}
        rounded={"8px 0px"}
        fontSize={12}
        fontWeight={700}
      >
        {isMining
          ? "Currently Mining"
          : miningTry === 0
            ? "Maximum attempts exceeded"
            : "Currently For Sale"}
      </Center>
    </Box>
  );
};

export default SaleAlert;
