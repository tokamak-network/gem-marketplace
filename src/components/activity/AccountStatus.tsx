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
import { useAccount } from "wagmi";
import { useRecoilState } from "recoil";
import { useSwitchChain } from "wagmi";
import useConnectWallet from "@/hooks/account/useConnectWallet";
import { activityContainerStatus } from "@/recoil/activity/atom";
import { trimAddress } from "@/utils";
import copy from "copy-to-clipboard";
import { NetworkSymbol } from "../common/NetworkSymbol";

import ClipboardIcon from "@/assets/icon/clipboard.svg";
import UserGuideIcon from "@/assets/icon/userguide.svg";
import LogoutIcon from "@/assets/icon/logout.svg";
import { newtorkList } from "@/constants/networks";

const AccountStatus = () => {
  const { chain, address } = useAccount();
  const { disconnectToWallet } = useConnectWallet();
  const [, setOpenActivity] = useRecoilState(activityContainerStatus);
  const toast = useToast();
  const { switchChainAsync } = useSwitchChain();
  const [isNetworkMenuOpen, setNetworkMenuOpen] = useState<boolean>(false);

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
      await switchChainAsync({ chainId })
    } catch(error) {
      return;
    };
    setNetworkMenuOpen(false);
  };

  return (
    <Box w={"full"} p={"20px"} rounded={8} bgColor={"#1B1D28"} mb={"30px"}>
      <Flex justify={"space-between"} align={"center"}>
        <Menu closeOnSelect={false} isOpen={isNetworkMenuOpen}>
          <MenuButton
            onClick={() => setNetworkMenuOpen((prev) => !prev)}
            as={Button}
            bgColor={"transparent"}
            color={"white"}
            p={0}
            rounded={"full"}
            _hover={{ bgColor: "#2A2C3A" }}
            _active={{ bgColor: "#2A2C3A" }}
            px={"6px"}
            pr={3}
          >
            <Flex columnGap={2} align={"center"}>
              <NetworkSymbol w={32} h={32} network={chain?.id} />
              <Text fontSize={16} fontWeight={500}>
                {chain?.name}
              </Text>
            </Flex>
          </MenuButton>
          <MenuList
            bgColor={"#1B1D28"}
            border={"1px solid #313442"}
            fontWeight={500}
            fontSize={14}
          >
            {newtorkList.map((item, key) => (
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
          <Text fontSize={16} fontWeight={500}>
            {trimAddress({ address })}
          </Text>
          <Box onClick={handleClipboard} cursor={"pointer"}>
            <Image src={ClipboardIcon} alt="clipboard" width={16} height={16} />
          </Box>
        </Flex>
      </Flex>

      <Flex justify={"space-between"} align={"end"} mt={2}>
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
      </Flex>
    </Box>
  );
};

export default AccountStatus;
