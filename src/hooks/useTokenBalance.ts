import { useBalance, useAccount } from "wagmi";
import { ethers } from "ethers";
import { useMemo } from "react";
import commafy from "@/utils/trim/commafy";
import { useCheckChain } from "./useCheckChain";

export const useETHBalance = () => {
  const { isSupportedChain } = useCheckChain();
  const { address } = useAccount();
  const { data } = useBalance({
    address,
  });
  if (data)
    return  isSupportedChain ? Math.round(Number(ethers.formatEther(data.value)) * 100) / 100 : "0";
  return null;
};

export const useTokenBalance = ({
  tokenAddress,
}: {
  tokenAddress: `0x${string}`;
}) => {
  const { address } = useAccount();
  const { data, isSuccess, isPending } = useBalance({
    address,
    token: tokenAddress,
  });
  const { isSupportedChain } = useCheckChain();

  return useMemo(() => {
    if (data) {
      return {
        balanceBN: data,
        parsedBalance: isSupportedChain
          ? commafy(
              ethers.formatUnits(
                typeof data.value === "bigint" ? data.value : "0",
                data.decimals as number
              ),
              2
            )
          : "0",
        parsedBalanceWithoutCommafied: isSupportedChain
          ? commafy(
              ethers.formatUnits(
                typeof data.value === "bigint" ? data.value : "0",
                data.decimals as number
              ),
              2
            ).replaceAll(",", "")
          : 0,
      };
    }
    return null;
  }, [isSuccess, isPending, data]);
};
