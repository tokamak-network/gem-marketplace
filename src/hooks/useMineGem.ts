import { useCallback } from "react";
import { useAccount, useWriteContract } from "wagmi";
import FactoryABI from "@/abi/gemfactory.json";
import { FACTORY_ADDRESS } from "@/constants/tokens";

export const useStartMiningGem = (tokenId: number) => {
  const { writeContractAsync, isError, isPending, isSuccess, error } = useWriteContract();
  const { chain } = useAccount();

  const callStartMining = useCallback(async () => {
    await writeContractAsync({
      abi: FactoryABI,
      address: FACTORY_ADDRESS[chain?.id!] as `0x${string}`,
      functionName: "startMiningGEM",
      args: [tokenId],
    });
  }, [tokenId]);

  return { callStartMining, isError, isPending, isSuccess, error };
}