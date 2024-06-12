import { Center, Text } from "@chakra-ui/react";
import Image from "next/image";
import TON from "@/assets/icon/ton.svg";

const PriceContainer = ({
  price,
  onClick,
}: {
  price: number;
  onClick?: () => void;
}) => {
  return (
    <Center
      w={61}
      h={"32px"}
      columnGap={"6px"}
      rounded={"full"}
      bgColor={"#0380FF"}
      cursor={"pointer"}
      onClick={onClick ? onClick : () => {}}
    >
      <Image alt="ton" src={TON} width={16} height={16} />
      <Text fontSize={14} fontWeight={600}>
        {price}
      </Text>
    </Center>
  );
};

export default PriceContainer;
