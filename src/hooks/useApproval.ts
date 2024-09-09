import { MARKETPLACE_ADDRESS } from "@/constants/tokens";
import { bnToNumber } from "@/utils";
import { useEffect } from "react";
import { erc20Abi } from "viem";
import { useAccount, useBlockNumber, useReadContract } from "wagmi";

export const useApproval = (
  contractAddress: `0x${string}`,
  decimals: number
) => {
  const { address, chain } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { data: allowance, refetch } = useReadContract({
    abi: erc20Abi,
    address: contractAddress as `0x${string}`,
    functionName: "allowance",
    args: [
      address as `0x${string}`,
      MARKETPLACE_ADDRESS[chain?.id!] as `0x${string}`,
    ],
  });

  useEffect(() => {
    refetch();
  }, [blockNumber]);

  return parseFloat(bnToNumber(allowance as bigint, decimals));
};
