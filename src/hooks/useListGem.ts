import { useCallback } from "react";
import { useWriteContract } from "wagmi";
import MarketplaceABI from "@/abi/marketplace.json";
import { useAccount } from "wagmi";
import { MARKETPLACE_ADDRESS } from "@/constants/tokens";

export const useListGem = ({
  tokenID,
  listPrice,
}: {
  tokenID: number;
  listPrice: bigint;
}) => {
  const { writeContractAsync, isError, isPending, isSuccess } =
    useWriteContract();
  const { chain } = useAccount();

  const callListGem = useCallback(async () => {
    const txHash = await writeContractAsync({
      abi: MarketplaceABI,
      address: MARKETPLACE_ADDRESS[chain?.id!] as `0x${string}`,
      functionName: "putGemForSale",
      args: [tokenID, listPrice],
    });
    return txHash;
  }, [tokenID, listPrice]);

  return { callListGem, isError, isPending, isSuccess };
};


export const useUnlistGem = ({
  tokenID,
}: {
  tokenID: number;
}) => {
  const { writeContractAsync } =
    useWriteContract();
  const { chain } = useAccount();

  const callUnlistGem = useCallback(async () => {
    const txHash = await writeContractAsync({
      abi: MarketplaceABI,
      address: MARKETPLACE_ADDRESS[chain?.id!] as `0x${string}`,
      functionName: "removeGemForSale",
      args: [tokenID],
    });
    return txHash;
  }, [tokenID]);

  return { callUnlistGem };
};
