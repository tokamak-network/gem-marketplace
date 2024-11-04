import Image from "next/image";
import { useAccount } from "wagmi";
import { Box, Button, Flex, Spinner, Text, useTheme } from "@chakra-ui/react";

import { obtainModalStatus } from "@/recoil/market/atom";
import { useRecoilState } from "recoil";

import useConnectWallet from "@/hooks/account/useConnectWallet";

import TonIcon from "@/assets/icon/ton.svg";
import WalletIcon from "@/assets/icon/wallet.svg";

import GempackLogo from "@/assets/images/gempack.png";
import { getRandomPackFee } from "@/utils";
import { GEMPACK_ADDRESS, TON_ADDRESS_BY_CHAINID } from "@/constants/tokens";
import { useEffect, useState } from "react";
import { useGemPack } from "@/hooks/useGemPack";
import { formatEther } from "viem";
import { handleApprove } from "@/hooks/useApprove";
import { useWaitForTransaction } from "@/hooks/useWaitTxReceipt";

const GemPack = () => {
  const { connectToWallet } = useConnectWallet();
  const { isConnected, chain } = useAccount();
  const [_, setModalStatus] = useRecoilState(obtainModalStatus);
  const [fee, setFee] = useState<bigint>(BigInt(0));
  const { waitForTransactionReceipt } = useWaitForTransaction();
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
        await waitForTransactionReceipt(txHash);
        await callGemPack();
        setLoading(false);
      } catch (err) {
        console.log(err)
        setLoading(false);
      }
    } else {
      connectToWallet();
    }
  };
  const theme = useTheme();

  useEffect(() => {
    const fetchFee = async () => {
      const gemPackFee = await getRandomPackFee(
        GEMPACK_ADDRESS[chain?.id!] as `0x${string}`
      );
      setFee(gemPackFee);
    };
    fetchFee();
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
