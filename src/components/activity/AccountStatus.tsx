import { Box, Center, Flex, Text, useToast } from "@chakra-ui/react";
import Image from "next/image";
import { useAccount } from "wagmi";
import { useRecoilState } from "recoil";
import useConnectWallet from "@/hooks/account/useConnectWallet";
import { activityContainerStatus } from "@/recoil/activity/atom";
import { trimAddress } from "@/utils";
import copy from "copy-to-clipboard";

import ThanosSymbol from "@/assets/icon/thanos.svg";
import ClipboardIcon from "@/assets/icon/clipboard.svg";
import UserGuideIcon from "@/assets/icon/userguide.svg";
import LogoutIcon from "@/assets/icon/logout.svg";

const AccountStatus = () => {
  const { chain, address } = useAccount();
  const { disconnectToWallet } = useConnectWallet();
  const [, setOpenActivity] = useRecoilState(activityContainerStatus);
  const toast = useToast();

  const handleClipboard = () => {
    copy(address !== undefined ? address : "");

    toast({
      title: "Copied to Clipboard",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: 'top',
    });
  };

  return (
    <Box w={"full"} p={"20px"} rounded={8} bgColor={"#1B1D28"} mb={"30px"}>
      <Flex justify={"space-between"} align={"center"}>
        <Flex columnGap={3} align={"center"}>
          <Image alt="thanos" src={ThanosSymbol} width={32} height={32} />
          <Text fontSize={16} fontWeight={500}>
            {chain?.name}
          </Text>
        </Flex>

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
