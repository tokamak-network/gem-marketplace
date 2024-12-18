import {
  Box,
  Center,
  Flex,
  Text,
  useToast,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import { useAccount, useSwitchChain } from "wagmi";
import { useRecoilState } from "recoil";
import copy from "copy-to-clipboard";

import { activityContainerStatus } from "@/recoil/activity/atom";
import useConnectWallet from "@/hooks/account/useConnectWallet";
import { trimAddress } from "@/utils";
import { NetworkSymbol } from "../common/NetworkSymbol";
import GradientSpinner from "../ui/GradientSpinner";
import { useETHBalance, useTokenBalance } from "@/hooks/useTokenBalance";

import { SupportedChainId } from "@/types/network/supportedNetworks";
import { useCheckChain } from "@/hooks/useCheckChain";
import { useBalancePrice } from "@/hooks/useBalancePrice";
import { supportedNetworkList } from "@/constants/networks";
import { tokenList } from "@/constants";
import { TokenType } from "@/types";
import {
  TON_ADDRESS_BY_CHAINID,
  WSWTON_ADDRESS_BY_CHAINID,
} from "@/constants/tokens";

import WarningRed from "@/assets/icon/warningRed.svg";
import LogoutIcon from "@/assets/icon/logout.svg";
import ClipboardIcon from "@/assets/icon/clipboard.svg";

const AccountStatus = () => {
  const { chain, address } = useAccount();
  const { disconnectToWallet } = useConnectWallet();
  const [, setOpenActivity] = useRecoilState(activityContainerStatus);
  const toast = useToast();
  const { switchChainAsync } = useSwitchChain();
  const [isNetworkMenuOpen, setNetworkMenuOpen] = useState<boolean>(false);
  const { isSupportedChain } = useCheckChain();

  const TONBalance = useTokenBalance({
    tokenAddress: TON_ADDRESS_BY_CHAINID[chain?.id!] as `0x${string}`,
  });
  const WSTONBalance = useTokenBalance({
    tokenAddress: WSWTON_ADDRESS_BY_CHAINID[chain?.id!] as `0x${string}`,
  });
  const ETHBalance = useETHBalance();

  const ETHBalanceUSD = useBalancePrice(Number(ETHBalance), TokenType.ETH);
  const TONBalanceUSD = useBalancePrice(
    TONBalance?.balanceNum || 0,
    TokenType.TON
  );
  const WSTONBalanceUSD = useBalancePrice(
    WSTONBalance?.balanceNum || 0,
    TokenType.WSTON
  );

  const handleClipboard = () => {
    copy(address !== undefined ? address : "");

    toast({
      title: "Copied to Clipboard",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  const handleNetworkSwitch = async (chainId: number) => {
    if (chainId === chain?.id) {
      setNetworkMenuOpen(false);
      return;
    }
    try {
      await switchChainAsync({ chainId });
    } catch (error) {
      console.log(error);
      return;
    }
    setNetworkMenuOpen(false);
  };

  return (
    <Box w={"full"} p={"16px"} rounded={8} bgColor={"#1B1D28"} mb={"30px"}>
      <Flex
        justify={"space-between"}
        align={"center"}
        borderBottom={"1px solid #FFFFFF10"}
        pb={3}
      >
        <Menu closeOnSelect={false} isOpen={isNetworkMenuOpen}>
          <MenuButton
            onClick={() => setNetworkMenuOpen((prev) => !prev)}
            as={Button}
            bgColor={isSupportedChain ? "transparent" : "#2A2C3A"}
            color={"white"}
            p={0}
            rounded={"full"}
            _hover={{ bgColor: "#2A2C3A" }}
            _active={{ bgColor: "#2A2C3A" }}
            px={"6px"}
            pr={2}
          >
            {isSupportedChain ? (
              <Flex columnGap={2} align={"center"}>
                <NetworkSymbol w={32} h={32} network={chain?.id} />
                <Text
                  fontSize={
                    chain?.id === SupportedChainId.TITAN_SEPOLIA ? 12 : 16
                  }
                  fontWeight={500}
                >
                  {chain?.name}
                </Text>
              </Flex>
            ) : (
              <Flex w={"full"} justify={"center"}>
                <Image src={WarningRed} alt="warning" />
              </Flex>
            )}
          </MenuButton>
          <MenuList
            bgColor={"#1B1D28"}
            border={"1px solid #313442"}
            fontWeight={500}
            fontSize={14}
          >
            {supportedNetworkList.map((item, key) => (
              <MenuItem
                key={key}
                _hover={{ bgColor: "#2A2C3A" }}
                bgColor={"#1B1D28"}
                onClick={() => handleNetworkSwitch(item.id)}
                columnGap={"6px"}
              >
                <Image alt={item.name} src={item.icon} width={20} height={20} />
                {item.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>

        <Flex columnGap={2} align={"center"}>
          <Box onClick={handleClipboard} cursor={"pointer"}>
            <Image src={ClipboardIcon} alt="clipboard" width={16} height={16} />
          </Box>

          <Text fontSize={16} fontWeight={500}>
            {trimAddress({ address })}
          </Text>

          <Center
            bgColor={"#2A2C3A"}
            rounded={"full"}
            w={7}
            height={7}
            cursor={"pointer"}
            onClick={() => {
              disconnectToWallet(), setOpenActivity(false);
            }}
          >
            <Image width={16} height={16} alt="logout" src={LogoutIcon} />
          </Center>
        </Flex>
      </Flex>

      {tokenList.map((item, key) => (
        <Flex key={key} justify={"space-between"} align={"center"} mt={2}>
          <Center columnGap={2}>
            <Image alt="ton" src={item.icon} width={24} height={24} />
            <Text fontSize={12} fontWeight={500} color={"#5D6978"}>
              {item.symbol}
            </Text>
          </Center>

          <Flex flexDir={"column"} align={"end"}>
            {(item.symbol === "TON" && !TONBalance?.parsedBalance) ||
            (item.symbol === "TITANWSTON" && !WSTONBalance?.parsedBalance) ||
            (item.symbol === "ETH" && !ETHBalance) ? (
              <Box w={"60px"} h={"24px"}>
                <GradientSpinner />
              </Box>
            ) : (
              <Text fontWeight={600} fontSize={16}>
                {item.symbol === "TON"
                  ? TONBalance?.roundedBalance
                  : item.symbol === "TITANWSTON"
                    ? WSTONBalance?.roundedBalance
                    : item.symbol === "ETH"
                      ? ETHBalance
                      : ""}
              </Text>
            )}
            <Box color={"#5D6978"} fontSize={12}>
              {TONBalanceUSD !== undefined && WSTONBalanceUSD !== undefined ? (
                "$" +
                (item.symbol === "TON"
                  ? TONBalanceUSD
                  : item.symbol === "TITANWSTON"
                    ? WSTONBalanceUSD
                    : ETHBalanceUSD)
              ) : (
                <Box w={"35px"} h={"18px"}>
                  <GradientSpinner />
                </Box>
              )}
            </Box>
          </Flex>
        </Flex>
      ))}
      {/* <Flex justify={"space-between"} align={"end"} mt={2}>
        <Box>
          <Text fontSize={14} color={"#5D6978"} lineHeight={"50px"}>
            TON Balance
          </Text>
          <Text fontSize={28} fontWeight={600} lineHeight={"26px"}>
            2000.00
          </Text>
        </Box>

        <Flex columnGap={2}>
          <Center
            bgColor={"#2A2C3A"}
            rounded={8}
            w={"32px"}
            height={"32px"}
            cursor={"pointer"}
          >
            <Image width={16} height={16} alt="guide" src={UserGuideIcon} />
          </Center>
          <Center
            bgColor={"#2A2C3A"}
            rounded={8}
            w={"32px"}
            height={"32px"}
            cursor={"pointer"}
            onClick={() => {
              disconnectToWallet(), setOpenActivity(false);
            }}
          >
            <Image width={16} height={16} alt="logout" src={LogoutIcon} />
          </Center>
        </Flex>
      </Flex> */}
    </Box>
  );
};

export default AccountStatus;
