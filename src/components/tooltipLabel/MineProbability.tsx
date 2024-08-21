import { Flex, Box, Text, useTheme } from "@chakra-ui/react";

const MineProbability = () => {
  const theme = useTheme();

  return (
    <Flex flexDir={"column"} p={"15px"} fontFamily={theme.fonts.Inter}>
      <Box
        textAlign={"center"}
        py={3}
        fontSize={16}
        fontWeight={600}
        borderBottom={"1px solid #FFFFFF40"}
      >
        <Text>823</Text>
        <Text>Active Miners</Text>
      </Box>
      <Box textAlign={"center"} py={3} fontSize={16} fontWeight={600}>
        <Text>1,259</Text>
        <Text>Gems Vailable</Text>
      </Box>
      <Box textAlign={"center"} py={3}>
        <Text fontSize={16} fontWeight={600}>
          =
        </Text>
        <Text mt={"14px"} fontSize={24} fontWeight={700}>
          99.9%
        </Text>
      </Box>
    </Flex>
  );
};

export default MineProbability;
