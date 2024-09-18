import { useCallback } from "react";
import { useWriteContract } from "wagmi";
import GemFactoryABI from "@/abi/gemfactory.json";
import { useAccount } from "wagmi";
import { FACTORY_ADDRESS } from "@/constants/tokens";

export const useBurnGem = ({
  tokenID,
}: {
  tokenID: number;
}) => {
  const { writeContractAsync, isError, isPending, isSuccess } =
    useWriteContract();
  const { chain } = useAccount();

  const callBurnGem = useCallback(async () => {
    await writeContractAsync({
      abi: GemFactoryABI,
      address: FACTORY_ADDRESS[chain?.id!] as `0x${string}`,
      functionName: "meltGEM",
      args: [tokenID],
    });
  }, [tokenID]);

  return { callBurnGem, isError, isPending, isSuccess };
};
