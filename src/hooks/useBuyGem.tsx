import { useCallback } from "react";
import { useWriteContract } from "wagmi";
import { abi } from "@/abi/marketplace.json";
import { useAccount } from "wagmi";

export const useBuyGem = ({
  tokenID,
  payWithWSTON,
}: {
  tokenID: number;
  payWithWSTON: boolean;
}) => {
  const { writeContract, isError, isPending, isSuccess } = useWriteContract();
  const { address } = useAccount();

  const callBuyGem = useCallback(() => {
    writeContract({
      abi,
      address: address as `0x${string}`,
      functionName: "buyGem",
      args: [tokenID, payWithWSTON],
    });
  }, [tokenID, payWithWSTON]);

  return { callBuyGem, isError, isPending, isSuccess };
};
