import { useCallback } from "react";
import { useWriteContract } from "wagmi";
import MarketplaceABI from "@/abi/marketplace.json";
import { useAccount } from "wagmi";
import { MARKETPLACE_ADDRESS } from "@/constants/tokens";

export const useBuyGem = ({
  tokenID,
  payWithWSTON,
}: {
  tokenID: number;
  payWithWSTON: boolean;
}) => {
  const { writeContractAsync, isError, isPending, isSuccess, error } = useWriteContract();
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
