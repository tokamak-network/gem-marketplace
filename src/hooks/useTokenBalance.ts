import { useBalance, useAccount } from "wagmi";
import { ethers } from "ethers";
import { useMemo } from "react";
import commafy from "@/utils/trim/commafy";

export const useETHBalance = () => {
  const { address } = useAccount();
  const { data } = useBalance({
    address,
  });
  if (data)
    return commafy(
      ethers.formatUnits(
        typeof data.value === "bigint" ? data.value : "0",
        data.decimals as number
      ),
      2
    );
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

  return useMemo(() => {
    if (data) {
      return {
        balanceBN: data,
        parsedBalance: commafy(
          ethers.formatUnits(
            typeof data.value === "bigint" ? data.value : "0",
            data.decimals as number
          ),
          2
        ),
        parsedBalanceWithoutCommafied: commafy(
          ethers.formatUnits(
            typeof data.value === "bigint" ? data.value : "0",
            data.decimals as number
          ),
          2
        ).replaceAll(",", ""),
      };
    }
    return null;
  }, [isSuccess, isPending, data]);
};
