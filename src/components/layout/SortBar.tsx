import { filterItemList } from "@/constants";
import {
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { sortFilterStatus } from "@/recoil/settings/atoms";
import { useRecoilState } from "recoil";

const SortBar = () => {
  const [currentFilter, setFilterStatus] = useRecoilState(sortFilterStatus);
  return (
    <Flex w={270} align={"start"} mt={2}>
      <Text
        bgGradient="linear(to-r, #FF0099, #FF7A00)"
        bgClip="text"
        fontSize={12}
        fontWeight={600}
        letterSpacing={4}
      >
        SORT BY :
      </Text>

      <Menu size={""}>
        <MenuButton
          h={5}
          fontSize={12}
          letterSpacing={1}
          as={Button}
          bg={"transparent"}
          rightIcon={<ChevronDownIcon />}
          _hover={{ bgColor: "transparent" }}
          color={"white"}
          _active={{ bgColor: "transparent" }}
        >
          {currentFilter}
        </MenuButton>
        <MenuList
          minW={150}
          bg={"#191A22"}
          borderColor={"#313442"}
          fontSize={12}
          letterSpacing={1}
        >
          {filterItemList.map((item, key) => (
            <MenuItem
              bg={"#191A22"}
              key={key}
              _hover={{ bgColor: "#2A2C3A" }}
              onClick={() => {setFilterStatus(item)}}
            >
              {item}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default SortBar;
