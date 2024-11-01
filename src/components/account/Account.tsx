import { Flex, Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { useAccount } from "wagmi";
import { trimAddress } from "@/utils";
import { activityContainerStatus } from "@/recoil/activity/atom";

import useConnectWallet from "@/hooks/account/useConnectWallet";
import { NetworkSymbol } from "../common/NetworkSymbol";

const Account = () => {
  const { isConnected, address, chain } = useAccount();
  const [, setOpenActivity] = useRecoilState(activityContainerStatus);

  const { connectToWallet } = useConnectWallet();
  const handleConnect = () => {
    isConnected ? setOpenActivity(prev => !prev) : connectToWallet()
  }

  return (
    <Flex
      pl={"36px"}
      w={"full"}
      align={"center"}
      columnGap={3}
      onClick={handleConnect}
      cursor={"pointer"}
    >
      <NetworkSymbol network={chain?.id} w={24} h={24}/>
      <Text fontSize={14} fontWeight={500}>
        {isConnected ? trimAddress({ address }) : "Connect Wallet"}
      </Text>
    </Flex>
  );
};

export default Account;
