import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { fetchMarketPrice } from "@/utils/price";
import { formatEther, formatUnits } from "viem";
import { StakingIndex } from "@/recoil/market/atom";
import { useRecoilState } from "recoil";

export const useBalancePrice = (balanceData: any) => {
  const { chain, address } = useAccount();
  const [tonPrice, setTonPrice] = useState(0);
  const [stakingIndex] = useRecoilState(StakingIndex);
  const [ethPrice, setETHPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const price = await fetchMarketPrice();
      setTonPrice(price?.ton_price);
      setETHPrice(price?.eth_price);
    };
    fetchData();
  }, [chain, address]);

  const balacePrice = useMemo(
    () =>
      balanceData?.symbol === "ETH"
        ? Math.round(
            Number(formatEther(balanceData?.value || BigInt(0))) *
              ethPrice *
              100
          ) / 100
        : balanceData?.symbol === "TON"
          ? Math.round(
              Number(formatUnits(balanceData?.value || BigInt(0), 18)) *
                tonPrice *
                100
            ) / 100
          : Math.round(
              Number(formatUnits(balanceData?.value || BigInt(0), 27)) *
                tonPrice *
                stakingIndex *
                100
            ) / 100,

    [balanceData, tonPrice, stakingIndex]
  );

  return balacePrice;
};
