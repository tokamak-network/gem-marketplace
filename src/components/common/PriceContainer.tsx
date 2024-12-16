import { Center, Text } from "@chakra-ui/react";
import Image from "next/image";
// import TON from "@/assets/icon/ton.svg";
import TON from "@/assets/icon/ton2.svg";
// import { StakingIndex } from "@/recoil/market/atom";
// import { useRecoilState } from "recoil";
// import { useEffect, useMemo, useState } from "react";
// import { formatUnits } from "viem";
// import { TON_FEES_RATE_DIVIDER } from "@/constants";
// import { getTonFeesRate } from "@/utils";
// import { MARKETPLACE_ADDRESS } from "@/constants/tokens";
import { useAccount } from "wagmi";
import { useCheckChain } from "@/hooks/useCheckChain";

const PriceContainer = ({
  price,
  onClick,
  isGemPack
}: {
  price: number;
  isGemPack?: boolean;
  onClick?: () => void;
}) => {
  // const [stakingIndex] = useRecoilState(StakingIndex);
  const { chain } = useAccount();
  // const [tonFeesRate, setTonFeesRate] = useState<number>(1);
  const {isSupportedChain} = useCheckChain();

  // useEffect(() => {
  //   const fetchTonFeesRate = async () => {
  //   const value = await getTonFeesRate(
  //       MARKETPLACE_ADDRESS[chain?.id!] as `0x${string}`
  //     );
  //     setTonFeesRate(Number(formatUnits(value, 0)));
  //   };
  //   isSupportedChain && fetchTonFeesRate();
  // }, []);

  // const priceAsTON = useMemo(
  //   () =>isGemPack ? price :
  //     price * stakingIndex +
  //     (price * stakingIndex * tonFeesRate!) / TON_FEES_RATE_DIVIDER,
  //   [stakingIndex, tonFeesRate, TON_FEES_RATE_DIVIDER, price]
  // );

  return (
    <Center
      w={61}
      mr={"10px"}
      h={"32px"}
      columnGap={"6px"}
      rounded={"full"}
      bgColor={"#191A22"}
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
