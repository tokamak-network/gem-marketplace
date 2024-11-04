import { supportedNetworkList } from "@/constants/networks";
import { useMemo } from "react";
import { useAccount } from "wagmi";

export const useCheckChain = () => {
  const { chain } = useAccount();
  const isSupportedChain: boolean = useMemo(
    () => supportedNetworkList.some((network) => network.id === chain?.id),
    [supportedNetworkList, chain]
  );
  return { isSupportedChain };
};
