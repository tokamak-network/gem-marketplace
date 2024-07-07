import { Center, Flex, useTheme } from "@chakra-ui/react";

const ActivityFilterItem = ({
  isActive,
  title,
}: {
  isActive?: boolean;
  title: string;
}) => {
  const theme = useTheme();

  return (
    <Center
      minW={62}
      h={30}
      p={3}
      border={"1px solid"}
      borderColor={isActive ? "#FFFFFF" : "transparent"}
      textTransform={"capitalize"}
      opacity={isActive ? 1 : 0.5}
      rounded={"full"}
      bgColor={"#2A2C3A"}
      fontFamily={theme.fonts.Inter}
      fontSize={12}
      fontWeight={400}
      cursor={"pointer"}
    >
      {title}
    </Center>
  );
};

const ActivityFilterBar = () => {
  return (
    <Flex w={"100%"} justify={"space-between"} mt={"30px"}>
      <ActivityFilterItem isActive title="all" />
      <ActivityFilterItem title="mine" />
      <ActivityFilterItem title="forge" />
      <ActivityFilterItem title="buy/sell" />
    </Flex>
  );
};

export default ActivityFilterBar;
