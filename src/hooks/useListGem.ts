import { useCallback } from "react";
import { useWriteContract } from "wagmi";
import MarketplaceABI from "@/abi/marketplace.json";
import { useAccount } from "wagmi";
import { MARKETPLACE_ADDRESS } from "@/constants/tokens";

export const useListGem = ({
  tokenID,
  listPrice
}: {
  tokenID: number
  listPrice: bigint
}) => {
  const { writeContractAsync, isError, isPending, isSuccess } = useWriteContract();
  const { chain } = useAccount();

  const callBuyGem = useCallback(async () => {
    await writeContractAsync({
      abi: MarketplaceABI,
      address: MARKETPLACE_ADDRESS[chain?.id!] as `0x${string}`,
      functionName: "putGemForSale",
      args: [tokenID, listPrice],
    });
  }, [tokenID, listPrice]);

  return { callBuyGem, isError, isPending, isSuccess };
};
