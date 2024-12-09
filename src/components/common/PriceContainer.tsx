import { Center, Text } from "@chakra-ui/react";
import Image from "next/image";
import TON from "@/assets/icon/ton.svg";
import { StakingIndex } from "@/recoil/market/atom";
import { useRecoilState } from "recoil";
import { useEffect, useMemo, useState } from "react";
import { formatUnits } from "viem";
import { TON_FEES_RATE_DIVIDER } from "@/constants";
import { getTonFeesRate } from "@/utils";
import { MARKETPLACE_ADDRESS } from "@/constants/tokens";
import { useAccount } from "wagmi";

const PriceContainer = ({
  price,
  onClick,
}: {
  price: number;
  onClick?: () => void;
}) => {
  const [stakingIndex] = useRecoilState(StakingIndex);
  const { chain } = useAccount();
  const [tonFeesRate, setTonFeesRate] = useState<number>();

  useEffect(() => {
    const fetchTonFeesRate = async () => {
      const value = await getTonFeesRate(
        MARKETPLACE_ADDRESS[chain?.id!] as `0x${string}`
      );
      setTonFeesRate(Number(formatUnits(value, 0)));
    };
    fetchTonFeesRate();
  }, []);

  const priceAsTON = useMemo(
    () =>
      price * stakingIndex +
      (price * stakingIndex * tonFeesRate!) / TON_FEES_RATE_DIVIDER,
    [stakingIndex, tonFeesRate, TON_FEES_RATE_DIVIDER, price]
  );

  return (
    <Center
      w={61}
      mr={"10px"}
      h={"32px"}
      columnGap={"6px"}
      rounded={"full"}
      bgColor={"#0380FF"}
      cursor={"pointer"}
      onClick={onClick ? onClick : () => {}}
    >
      <Image alt="ton" src={TON} width={16} height={16} />
      <Text fontSize={14} fontWeight={600}>
        {Math.round(priceAsTON * 100) / 100}
      </Text>
    </Center>
  );
};

export default PriceContainer;
