import { useCallback } from "react";
import { useAccount, useWriteContract } from "wagmi";
import FactoryMiningABI from "@/abi/gemFactoryMining.json";
import { FACTORY_ADDRESS } from "@/constants/tokens";
import { parseEther, parseGwei } from "viem";
import { writeContract } from "@wagmi/core";
import { config, publicClient } from "@/config/wagmi";
import { BigNumberish } from "ethers";
import { ethers } from "ethers";

export const useStartMiningGem = () => {
  const { writeContractAsync, isError, isPending, isSuccess, error } =
    useWriteContract();
  const { chain } = useAccount();

  const callStartMining = useCallback(
    async (tokenId: BigNumberish) => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const FactoryContract = new ethers.Contract(
        FACTORY_ADDRESS[chain?.id!],
        FactoryMiningABI,
        signer
      );
      const res = await FactoryContract.startMiningGEM(tokenId, {
        gasLimit: 15000000
      });
      // const tx = await writeContractAsync({
      //   abi: FactoryMiningABI,
      //   address: FACTORY_ADDRESS[chain?.id!] as `0x${string}`,
      //   functionName: "startMiningGEM",
      //   args: [tokenId],
      // });
      return res.hash;
    },
    [chain, chain?.id]
  );

  return { callStartMining };
};

export const useCollectGem = (tokenId: number) => {
  const { writeContractAsync, isError, isPending, isSuccess, error } =
    useWriteContract();
  const { chain } = useAccount();

  const callCollectGem = useCallback(async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const FactoryContract = new ethers.Contract(
      FACTORY_ADDRESS[chain?.id!],
      FactoryMiningABI,
      signer
    );

    const res = await FactoryContract.pickMinedGEM(tokenId, {
      value: parseEther("10"),
      gasLimit: 15000000
    });
    // const tx = await writeContractAsync({
    //   abi: FactoryMiningABI,
    //   address: FACTORY_ADDRESS[chain?.id!] as `0x${string}`,
    //   functionName: "pickMinedGEM",
    //   args: [tokenId],
    //   value: parseEther("0.003"),
    // });
    return res.hash;
  }, [chain]);

  return { callCollectGem };
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
    value: parseEther("10"),
  });
  return tx;
};
