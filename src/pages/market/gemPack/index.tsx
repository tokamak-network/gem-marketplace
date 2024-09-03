import Image from "next/image";
import { useAccount } from "wagmi";
import { Box, Button, Flex, Grid, Text, useTheme } from "@chakra-ui/react";

import { GemList } from "@/constants";
import { CardType, GemStandard } from "@/types";
import { obtainModalStatus } from "@/recoil/market/atom";
import { useRecoilState } from "recoil";

import useConnectWallet from "@/hooks/account/useConnectWallet";

import TonIcon from "@/assets/icon/ton.svg";
import WalletIcon from "@/assets/icon/wallet.svg";

import GempackLogo from "@/assets/images/gempack.png";

interface ItemProps {
  id: number;
  mode: CardType;
}

const GemPack = ({ id, mode }: ItemProps) => {
  const gemItem = GemList.filter((item: GemStandard) => Number(item.tokenID) === Number(id));
  const { connectToWallet } = useConnectWallet();
  const { isConnected } = useAccount();
  const [, setModalStatus] = useRecoilState(obtainModalStatus);

  const handleClick = () => {
    isConnected
      ? setModalStatus({ isOpen: true, gemId: 3 })
      : connectToWallet();
  };
  const theme = useTheme();

  return (
    <Flex flexDir={"column"} w={"100%"} h={"100%"}>
      <Flex columnGap={"40px"}>
        <Image alt="gempack" src={GempackLogo} />

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
            <Text fontWeight={700} fontSize={12} color={"white"}>Rates:</Text>
            <Text fontWeight={300} fontSize={12}>Base . . . . . . . . . . . 34%</Text>
            <Text fontWeight={300} fontSize={12}>Common . . . . . . 34%</Text>
            <Text fontWeight={300} fontSize={12}>Rare . . . . . . . . . . . 34%</Text>
            <Text fontWeight={300} fontSize={12}>Unique . . . . . . . . 34%</Text>
            <Text fontWeight={300} fontSize={12}>Epic  . . . . . . . . . . . 34%</Text>
            <Text fontWeight={300} fontSize={12}>Legendary . . . . 34%</Text>
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

      <Flex w={"100%"} mt={10} columnGap={6} flexGrow={1} h={"fit-content"}>
        <Box w={"100%"} maxH={"250px"} bgColor={"#191A22"} rounded={16} p={"36px"} overflow={"auto"}>
          <Text fontWeight={600} fontSize={18}>Details</Text>

          <Flex mt={6} flexDir={"column"} rowGap={4} fontSize={14} fontWeight={300}>
            <Flex>
              <Text minW={"135px"} color={"#FFFFFF80"}>Amount Minted:</Text>
              <Text>1</Text>
            </Flex>
            <Flex>
              <Text minW={"135px"} color={"#FFFFFF80"}>Amount Minted:</Text>
              <Text color={"#0380FF"}>0x0134afd600000000000002386f26fc10000000000000000000119</Text>
            </Flex>
            <Flex>
              <Text minW={"135px"} color={"#FFFFFF80"}>Amount Minted:</Text>
              <Text color={"#0380FF"}>0x88f8Dbd3dC44c6E2368258D3eee8EB907AF191</Text>
            </Flex>
            <Flex>
              <Text minW={"135px"} color={"#FFFFFF80"}>Amount Minted:</Text>
              <Text color={"#0380FF"}>0x1cACC96e5F01e2849E6036F25531A9A064D2FB5f</Text>
            </Flex>
            <Flex>
              <Text minW={"135px"} color={"#FFFFFF80"}>Amount Minted:</Text>
              <Text>ERC-721</Text>
            </Flex>
          </Flex>
        </Box>

        <Box w={"100%"} h={"100%"} bgColor={"#191A22"} rounded={16} />
      </Flex>
    </Flex>
  );
};

export default GemPack;
