import { Box, Text, useTheme } from "@chakra-ui/react";

const GemMiningAlert = ({ text }: { text?: string }) => {
  const theme = useTheme();
  return (
    <Text
      fontFamily={theme.fonts.Inter}
      color={"#FFFFFF80"}
      fontSize={14}
      p={6}
    >
      {`${text ? text : "This gem is currently Mining. You may sell this gem once mining is complete or cancelled."}`}
    </Text>
  );
};

export default GemMiningAlert;
