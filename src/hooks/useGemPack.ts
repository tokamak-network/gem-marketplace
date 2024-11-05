import { useCallback } from "react";
import { useWriteContract, useAccount } from "wagmi";
import RandomPackABI from "@/abi/randomPack.json";
import { GEMPACK_ADDRESS } from "@/constants/tokens";
import { parseEther } from "viem";

export const useGemPack = ({
  gemPackFee
}: {
  gemPackFee: bigint
}) => {
  const { writeContractAsync, isError, isPending, isSuccess, error } = useWriteContract();
  const { chain } = useAccount();

  const callGemPack = useCallback(async () => {
    await writeContractAsync({
      abi: RandomPackABI,
      address: GEMPACK_ADDRESS[chain?.id!] as `0x${string}`,
      functionName: "requestRandomGem",
      value: parseEther("0.01")
    });
  }, [gemPackFee]);

  return { callGemPack, isError, isPending, isSuccess, error };
};
