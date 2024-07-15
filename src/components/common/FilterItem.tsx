import { Center, Text } from "@chakra-ui/react";
import React from "react";

interface FilterItemProps {
  handleFilter?: () => void;
  active?: boolean;
  children: React.ReactNode;
  h: number;
}

const FilterItem = ({
  handleFilter,
  active,
  children,
  h = 30,
}: FilterItemProps) =>  {
  return (
    <Center
      p={"12px"}
      h={`${h}px`}
      rounded={"full"}
      bgColor={"#2A2C3A"}
      columnGap={"10px"}
      cursor={"pointer"}
      onClick={handleFilter}
      pos={"relative"}
      opacity={active ? 1 : 0.5}
      border={"1px solid"}
      borderColor={active ? "white" : "transparent"}
      transition={"0.1s"}
      textTransform={"capitalize"}
    >
      <Text
        color={"white"}
        fontSize={12}
        fontWeight={500}
        textTransform={"capitalize"}
      >
        {children}
      </Text>
    </Center>
  )
}

export default FilterItem;