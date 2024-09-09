import { useCallback, useMemo } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { erc20Abi, formatEther, parseUnits } from "viem";
import { MARKETPLACE_ADDRESS } from "@/constants/tokens";
export const useTonORWSTONApprove = (
  amount: bigint,
  contractAddress: `0x${string}`
) => {
  const { chain } = useAccount();
  const { writeContractAsync, isSuccess, isPending, error } =
    useWriteContract();
  const callApprove = useCallback(async () => {
    const txHash = await writeContractAsync({
      abi: erc20Abi,
      address: contractAddress as `0x${string}`,
      functionName: "approve",
      args: [MARKETPLACE_ADDRESS[chain?.id!] as `0x${string}`, amount],
    });
    return txHash;
  }, [isPending, isSuccess]);

  return { callApprove, isPending, isSuccess, error };
};
