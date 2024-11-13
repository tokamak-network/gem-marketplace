import { useMemo } from "react";
import { priceListStatus, StakingIndex } from "@/recoil/market/atom";
import { useRecoilState } from "recoil";
import { TokenType } from "@/types";

export const useBalancePrice = (balanceData: number, tokenType: TokenType) => {
  const [stakingIndex] = useRecoilState(StakingIndex);
  const [priceStatus] = useRecoilState(priceListStatus);
  const { eth_price: ethPrice, ton_price: tonPrice } = priceStatus;

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
