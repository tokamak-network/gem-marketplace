import { useCallback } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { erc20Abi } from "viem";
import { MARKETPLACE_ADDRESS } from "@/constants/tokens";
import { writeContract } from "@wagmi/core";
import { config } from "@/config/wagmi";

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
  }, [contractAddress, amount]);

  return { callApprove, isPending, isSuccess, error };
};

export const handleApprove = async (
  marketplace_address: `0x${string}`,
  contractAddress: `0x${string}`,
  amount: bigint
) => {
  const txHash = await writeContract(config, {
    abi: erc20Abi,
    address: contractAddress as `0x${string}`,
    functionName: "approve",
    args: [marketplace_address as `0x${string}`, amount],
  });
  return txHash;
};
