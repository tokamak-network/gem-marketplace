import { Box, Text, useTheme } from "@chakra-ui/react";

const GemMiningAlert = () => {
  const theme = useTheme();
  return (
    <Text fontFamily={theme.fonts.Inter} color={"#FFFFFF80"} fontSize={14} p={6} >
      This gem is currently Mining. You may sell this gem once mining is
      complete or cancelled.
    </Text>
  );
};

export default GemMiningAlert;
