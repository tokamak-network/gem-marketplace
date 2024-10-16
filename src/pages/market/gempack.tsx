import Image from "next/image";
import { useAccount } from "wagmi";
import { Box, Button, Flex, Text, useTheme } from "@chakra-ui/react";

import { obtainModalStatus } from "@/recoil/market/atom";
import { useRecoilState } from "recoil";

import useConnectWallet from "@/hooks/account/useConnectWallet";

import TonIcon from "@/assets/icon/ton.svg";
import WalletIcon from "@/assets/icon/wallet.svg";

import GempackLogo from "@/assets/images/gempack.png";

const GemPack = () => {
  const { connectToWallet } = useConnectWallet();
  const { isConnected } = useAccount();
  const [_, setModalStatus] = useRecoilState(obtainModalStatus);

  const handleClick = () => {
    isConnected
      ? setModalStatus({ isOpen: true, gemId: 3 })
      : connectToWallet();
  };
  const theme = useTheme();

  return (
    <Flex flexDir={"column"} w={"100%"} h={"100%"}>
      <Flex columnGap={"40px"}>
        <Image width={500} alt="gempack" src={GempackLogo} />

        <Flex w={"full"} flexDir={"column"}>
          <Text fontWeight={700} fontSize={48} textTransform="capitalize">
            GEM PACK
          </Text>

          <Text mt={9} fontFamily={theme.fonts.Inter} fontSize={24}>
            Obtain 1 Gem ranging from Base up to Legendary!
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
              Base. . . . . . . . . . . 34%
            </Text>
            <Text fontWeight={300} fontSize={12}>
              Common. . . . . . 34%
            </Text>
            <Text fontWeight={300} fontSize={12}>
              Rare . . . . . . . . . . . 34%
            </Text>
            <Text fontWeight={300} fontSize={12}>
              Unique . . . . . . . .  34%
            </Text>
            <Text fontWeight={300} fontSize={12}>
              Epic . . . . . . . . . . . 34%
            </Text>
            <Text fontWeight={300} fontSize={12}>
              Legendary . . . . 34%
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
              {isConnected ? (
                <Image alt="ton" src={TonIcon} width={27} height={27} />
              ) : (
                <Image alt="wallet" src={WalletIcon} width={22} height={23} />
              )}
              <Text fontSize={24} fontWeight={600}>
                {isConnected ? "135 TON" : "Connect Wallet"}
              </Text>
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default GemPack;
