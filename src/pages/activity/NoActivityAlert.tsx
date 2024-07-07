import Image from "next/image";
import { Flex, Text } from "@chakra-ui/react";
import NoActivityImage from "@/assets/images/noactivity.png";

const NoActivityContainer = () => {
  return (
    <Flex
      flexDir={"column"}
      justify={"center"}
      align={"center"}
      rowGap={"24px"}
      h={"100%"}
    >
      <Image alt="no activity" src={NoActivityImage} />
      <Text fontWeight={500} fontSize={16} textAlign={"center"}>
        No activity yet
      </Text>
      <Text
        fontWeight={400}
        fontSize={11}
        textAlign={"center"}
        color={"#7B7F8F"}
      >
        Your market, mine and forge transactions will appear here
      </Text>
    </Flex>
  );
};

export default NoActivityContainer;
