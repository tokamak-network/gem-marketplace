import { Flex, Image, Text, useTheme } from "@chakra-ui/react";

const Sidebar = () => {
  const theme = useTheme();

  return (
    <Flex
      flexDir={"column"}
      p={9}
      bg={"#0D0E16"}
      w={"243px"}
      h={"100vh"}
      borderRight={"2px solid #1E2033"}
    >
      <Flex align={"center"} columnGap={"10px"}>
        <Image alt="logo" src="/assets/icon/symbol.svg" w={9} h={9} />
        <Text
          fontFamily={theme.fonts.OpenSans}
          fontSize={20}
          fontWeight={700}
          color={"white"}
        >
          Project Opal
        </Text>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
