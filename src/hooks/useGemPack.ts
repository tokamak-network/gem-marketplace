import { useCallback } from "react";
import { useWriteContract, useAccount } from "wagmi";
import RandomPackABI from "@/abi/randomPack.json";
import DRB_ABI from "@/abi/DRBCoordinatorMock.json";
import { GEMPACK_ADDRESS } from "@/constants/tokens";
import { parseEther } from "viem";
import { writeContract } from "@wagmi/core";
import { config } from "@/config/wagmi";

export const useGemPack = ({
  gemPackFee
}: {
  gemPackFee: string
}) => {
  const { writeContractAsync, isError, isPending, isSuccess, error } = useWriteContract();
  const { chain } = useAccount();

  const callGemPack = useCallback(async () => {
    const tx = await writeContractAsync({
      abi: RandomPackABI,
      address: GEMPACK_ADDRESS[chain?.id!] as `0x${string}`,
      functionName: "requestRandomGem",
      value: parseEther((Number(gemPackFee) + 0.005).toString())
    });
    return tx;
  }, [gemPackFee]);

  return { callGemPack, isError, isPending, isSuccess, error };
};

export const fulfillRandomRequest = async (contractAddress: `0x${string}`, requestId: number) => {
  const txHash = await writeContract(config, {
    abi: DRB_ABI,
    address: contractAddress,
    functionName: "fulfillRandomness",
    args: [requestId]
  })
  return txHash;
}