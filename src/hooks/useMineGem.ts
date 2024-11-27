import { useCallback } from "react";
import { useAccount, useWriteContract } from "wagmi";
import FactoryMiningABI from "@/abi/gemFactoryMining.json";
import { FACTORY_ADDRESS } from "@/constants/tokens";
import { parseEther, parseGwei } from "viem";
import { writeContract } from "@wagmi/core";
import { config } from "@/config/wagmi";

export const useStartMiningGem = (tokenId: number) => {
  const { writeContractAsync, isError, isPending, isSuccess, error } =
    useWriteContract();
  const { chain } = useAccount();

  const callStartMining = useCallback(async () => {
    const tx = await writeContractAsync({
      abi: FactoryMiningABI,
      address: FACTORY_ADDRESS[chain?.id!] as `0x${string}`,
      functionName: "startMiningGEM",
      args: [tokenId],
    });
    return tx;
  }, [tokenId]);

  return { callStartMining, isError, isPending, isSuccess, error };
};

export const useCollectGem = (tokenId: number) => {
  const { writeContractAsync, isError, isPending, isSuccess, error } =
    useWriteContract();
  const { chain } = useAccount();

  const callCollectGem = useCallback(async () => {
    const tx = await writeContractAsync({
      abi: FactoryMiningABI,
      address: FACTORY_ADDRESS[chain?.id!] as `0x${string}`,
      functionName: "pickMinedGEM",
      args: [tokenId],
      value: parseEther("0.003"),
    });
    return tx;
  }, [tokenId]);

  return { callCollectGem, isError, isPending, isSuccess, error };
};

export const collectGem = async (
  tokenId: number,
  contractAddress: `0x${string}`
) => {
  const tx = await writeContract(config, {
    abi: FactoryMiningABI,
    address: contractAddress,
    functionName: "pickMinedGEM",
    args: [tokenId],
    value: parseEther("0.003"),
  });
  return tx
};
