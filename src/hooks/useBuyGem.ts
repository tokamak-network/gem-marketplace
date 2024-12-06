import { useCallback } from "react";
import { useWriteContract } from "wagmi";
import MarketplaceABI from "@/abi/marketplace.json";
import { useAccount } from "wagmi";
import { MARKETPLACE_ADDRESS } from "@/constants/tokens";
import { writeContract } from "@wagmi/core";
import { config } from "@/config/wagmi";
import { formatEther, formatUnits, parseEther } from "viem";

export const useBuyGem = ({
  tokenID,
  payWithWSTON,
}: {
  tokenID: number;
  payWithWSTON: boolean;
}) => {
  const { writeContractAsync, isError, isPending, isSuccess, error } =
    useWriteContract();
  const { chain } = useAccount();

  const callBuyGem = useCallback(async () => {
    await writeContractAsync({
      abi: MarketplaceABI,
      address: MARKETPLACE_ADDRESS[chain?.id!] as `0x${string}`,
      functionName: "buyGem",
      args: [tokenID, payWithWSTON],
    });
  }, [tokenID, payWithWSTON]);

  return { callBuyGem, isError, isPending, isSuccess, error };
};

export const buyGemWithTON = async (
  tokenID: number,
  payOption: boolean,
  contractAddress: `0x${string}`,
  gemPrice: number
) => {
  const tx = await writeContract(config, {
    abi: MarketplaceABI,
    address: contractAddress,
    functionName: "buyGem",
    args: [tokenID, payOption],
    value: parseEther(gemPrice.toString()),
  });
  return tx;
};

export const buyGemWithWSTON = async (
  tokenID: number,
  payOption: boolean,
  contractAddress: `0x${string}`,
) => {
  const tx = await writeContract(config, {
    abi: MarketplaceABI,
    address: contractAddress,
    functionName: "buyGem",
    args: [tokenID, payOption],
  });
  return tx;
};
