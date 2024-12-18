import { useMemo } from "react";
import { Center, Flex, Text, useTheme } from "@chakra-ui/react";
import { useRecoilState } from "recoil";

import { colorStatus } from "@/recoil/market/atom";

import { colorList, colorBorderList } from "@/constants/rarity";

export const ColorItem = ({
  color,
  active = false,
  readOnly = false,
}: {
  color: string;
  active?: boolean;
  readOnly?: boolean;
}) => {
  const [colorState, setColorState] = useRecoilState(colorStatus);
  const handleColor = (color: string) => {
    !readOnly &&
      setColorState((prev) => ({ ...prev, ...{ [color]: !prev[color] } }));
  };
  const theme = useTheme();

  const defaultState = useMemo(() => {
    for (let item of Object.keys(colorList)) {
      if (colorState[item] !== false) return false;
    }
    return true;
  }, [colorState]);

  return (
    <Center
      px={5}
      h={"30px"}
      rounded={"full"}
      bgColor={colorList[color]}
      columnGap={"10px"}
      cursor={readOnly ? "auto" : "pointer"}
      onClick={() => handleColor(color)}
      opacity={defaultState || colorState[color] || readOnly ? 1 : 0.5}
      border={"1px solid"}
      borderColor={
        (colorState[color] || active) && !readOnly
          ? colorBorderList[color]
          : "transparent"
      }
    >
      <Text
        fontFamily={theme.fonts.Inter}
        textTransform={"capitalize"}
        color={"white"}
        fontSize={12}
        fontWeight={500}
      >
        {color}
      </Text>
    </Center>
  );
};

const ColorList = () => {
  return (
    <Flex columnGap={3} align={"center"}>
      <Text
        bgGradient={"linear(to-r, #FF0099, #FF7A00)"}
        letterSpacing={"0.3em"}
        fontSize={12}
        fontWeight={600}
        bgClip={"text"}
        color={"transparent"}
        textTransform={"uppercase"}
        my={4}
      >
        color
      </Text>
      {Object.keys(colorList).map((item, key) => (
        <ColorItem key={key} color={item} />
      ))}
    </Flex>
  );
};

export default ColorList;
