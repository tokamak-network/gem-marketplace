import { useCallback } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { MARKETPLACE_ADDRESS, FACTORY_ADDRESS } from "@/constants/tokens";
import GemFactoryABI from "@/abi/gemfactory.json";

export const useGemApprove = (
  tokenID: number,
) => {
  const { chain } = useAccount();
  const { writeContractAsync, isSuccess, isPending, error } =
    useWriteContract();
  const callApprove = useCallback(async () => {
    const txHash = await writeContractAsync({
      abi: GemFactoryABI,
      address: FACTORY_ADDRESS[chain?.id!] as `0x${string}`,
      functionName: "approve",
      args: [MARKETPLACE_ADDRESS[chain?.id!] as `0x${string}`, tokenID],
    });
    return txHash;
  }, [tokenID]);

  return { callApprove, isPending, isSuccess, error };
};
