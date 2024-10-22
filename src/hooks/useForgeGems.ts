import { useCallback } from "react";
import { useWriteContract } from "wagmi";
import FactoryForgingABI from "@/abi/gemFactoryForging.json";
import { useAccount } from "wagmi";
import { FACTORY_ADDRESS } from "@/constants/tokens";
import { GemStandard } from "@/types";
import { useRecoilState } from "recoil";
import { selectedFinalForge, selectedForgeGems } from "@/recoil/forge/atom";

export const useForgeGems = () => {
  const { writeContractAsync, isError, isPending, isSuccess, error } = useWriteContract();
  const { chain } = useAccount();

  const [selectedGemsInfo] = useRecoilState(selectedForgeGems);
  const { selectedRarity, selectedGemsList } = selectedGemsInfo;
  const [finalForgeGem] = useRecoilState(selectedFinalForge);
  const {color} = finalForgeGem;
  const tokenIds = selectedGemsList.map((item: GemStandard) => [item.tokenID]);

  const callForgeGems = useCallback(async () => {
    await writeContractAsync({
      abi: FactoryForgingABI,
      address: FACTORY_ADDRESS[chain?.id!] as `0x${string}`,
      functionName: "forgeTokens",
      args: [tokenIds, selectedRarity, color],
    });
  }, [tokenIds, selectedRarity, color]);

  return { callForgeGems, isError, isPending, isSuccess, error };
};
