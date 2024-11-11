import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { fetchMarketPrice } from "@/utils/price";
import { formatEther, formatUnits } from "viem";
import { StakingIndex } from "@/recoil/market/atom";
import { useRecoilState } from "recoil";
import { TokenType } from "@/types";

export const useBalancePrice = (balanceData: number, tokenType: TokenType) => {
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
      tokenType === TokenType.ETH
        ? Math.round(balanceData * ethPrice * 100) / 100
        : tokenType === TokenType.TON
          ? Math.round(balanceData * tonPrice * 100) / 100
          : Math.round(balanceData * tonPrice * stakingIndex * 100) / 100,

    [balanceData, tonPrice, stakingIndex]
  );

  return balacePrice;
};
