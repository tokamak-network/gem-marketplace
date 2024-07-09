import Image from "next/image";
import { Flex, Text } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { trimAddress } from "@/utils";

import useConnectWallet from "@/hooks/account/useConnectWallet";
import ThanosSymbol from "@/assets/icon/thanos.svg";

const Account = () => {
  const { isConnected, address } = useAccount();

  const { connetAndDisconntWallet } = useConnectWallet();

  return (
    <Flex
      pl={"36px"}
      w={"full"}
      align={"center"}
      columnGap={3}
      onClick={connetAndDisconntWallet}
      cursor={"pointer"}
    >
      <Image src={ThanosSymbol} alt="thanos" width={24} height={24} />
      <Text fontSize={14} fontWeight={500}>
        {isConnected ? trimAddress({ address }) : "Connect Wallet"}
      </Text>
    </Flex>
  );
};

export default Account;
