import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Box, Button, Flex, Spinner, Text, useTheme } from "@chakra-ui/react";
import { decodeEventLog } from "viem";
import { useRecoilState } from "recoil";

import { obtainModalStatus } from "@/recoil/market/atom";

import useConnectWallet from "@/hooks/account/useConnectWallet";
import { getRandomPackFee } from "@/utils";
import {
  DRB_ADDRESS,
  GEMPACK_ADDRESS,
  TON_ADDRESS_BY_CHAINID,
} from "@/constants/tokens";
import { fulfillRandomRequest, useGemPack } from "@/hooks/useGemPack";
import { formatEther } from "viem";
import { handleApprove } from "@/hooks/useApprove";
import { waitForTransactionReceipt } from "@wagmi/core";
import { SupportedChainId } from "@/types/network/supportedNetworks";
import { config } from "@/config/wagmi";

import RandomPackABI from "@/abi/randomPack.json";
import GempackLogo from "@/assets/images/gempack.png";
import TonIcon from "@/assets/icon/ton.svg";
import WalletIcon from "@/assets/icon/wallet.svg";

const GemPack = () => {
  const { connectToWallet } = useConnectWallet();
  const { isConnected, chain } = useAccount();
  const [_, setModalStatus] = useRecoilState(obtainModalStatus);
  const [fee, setFee] = useState<bigint>(BigInt(0));
  const { callGemPack } = useGemPack({
    gemPackFee: fee,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    if (isConnected) {
      try {
        setLoading(true);
        const txHash = await handleApprove(
          GEMPACK_ADDRESS[chain?.id!] as `0x${string}`,
          TON_ADDRESS_BY_CHAINID[chain?.id!] as `0x${string}`,
          fee
        );
        await waitForTransactionReceipt(config, {
          hash: txHash,
        });
        const requestHash = await callGemPack();

        const logData = await waitForTransactionReceipt(config, {
          hash: requestHash,
        });

        const topic: any = await decodeEventLog({
          abi: RandomPackABI,
          data: logData?.logs[logData?.logs.length - 1].data,
          topics: logData?.logs[logData?.logs.length - 1].topics,
        });
        const requestId = topic?.args?.requestId;
        const tokenId = await fulFullRandomness(requestId);
        setModalStatus({ isOpen: true, gemId: tokenId });

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    } else {
      connectToWallet();
    }
  };

  const fulFullRandomness = async (requestId: number) => {
    const fulfillTx = await fulfillRandomRequest(
      DRB_ADDRESS[chain?.id!] as `0x${string}`,
      requestId
    );
    const fulfillLogData = await waitForTransactionReceipt(config, {
      hash: fulfillTx,
    });

    const topic: any = await decodeEventLog({
      abi: RandomPackABI,
      data: fulfillLogData?.logs[2].data,
      topics: fulfillLogData?.logs[2].topics,
    });
    const newTokenId = topic?.args?.tokenId;
    return newTokenId;
  };
  const theme = useTheme();

  useEffect(() => {
    const fetchFee = async () => {
      const gemPackFee = await getRandomPackFee(
        GEMPACK_ADDRESS[chain?.id!] as `0x${string}`
      );
      setFee(gemPackFee);
    };
    isConnected && chain?.id === SupportedChainId.TITAN_SEPOLIA && fetchFee();
  }, []);

  return (
    <Flex flexDir={"column"} w={"100%"} h={"100%"}>
      <Flex columnGap={"40px"}>
        <Image width={500} alt="gempack" src={GempackLogo} />

        <Flex w={"full"} flexDir={"column"}>
          <Text fontWeight={700} fontSize={48} textTransform="capitalize">
            GEM PACK
          </Text>

          <Text mt={9} fontFamily={theme.fonts.Inter} fontSize={24}>
            Obtain 1 Gem ranging from Base up to Unique!
          </Text>

          <Text mt={9} fontSize={14}>
            Each Gem boasts a unique shape and a vibrant palette of colors
            ranging from deep blues to fiery hues.
          </Text>
          <Text mt={6} fontSize={14}>
            Their one-of-a-kind nature, ensuring every acquisition is a treasure
            unlike any other.
          </Text>

          <Flex my={9} flexDir={"column"} color={"#FFFFFF80"} rowGap={"2px"}>
            <Text fontWeight={700} fontSize={12} color={"white"}>
              Rates:
            </Text>
            <Text fontWeight={300} fontSize={12}>
              Common . . . . . . 70%
            </Text>
            <Text fontWeight={300} fontSize={12}>
              Rare . . . . . . . . . . . 25%
            </Text>
            <Text fontWeight={300} fontSize={12}>
              Unique . . . . . . . . . 5%
            </Text>
          </Flex>

          <Box>
            <Button
              w={"full"}
              maxW={624}
              h={"65px"}
              columnGap={2}
              alignItems={"center"}
              justifyContent={"center"}
              colorScheme="blue"
              bgColor={"#0380FF"}
              onClick={handleClick}
            >
              {!loading &&
                (isConnected ? (
                  <Image alt="ton" src={TonIcon} width={27} height={27} />
                ) : (
                  <Image alt="wallet" src={WalletIcon} width={22} height={23} />
                ))}
              <Text fontSize={24} fontWeight={600}>
                {isConnected ? (
                  loading ? (
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="md"
                    />
                  ) : (
                    formatEther(fee)
                  )
                ) : (
                  "Connect Wallet"
                )}
              </Text>
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default GemPack;
