import { Box, Flex, Text, useTheme } from "@chakra-ui/react";
import NoWalletIcon from "@/assets/icon/no_wallet.svg";
import Image from "next/image";

const CommunityChat = () => {
  const theme = useTheme();

  return (
    <Box>
      <Text ml={3} fontFamily={theme.fonts.Inter} fontSize={12}>Community</Text>

      <Flex w={430} h={280} mt={5} justify={"center"} align={"center"} flexDir={"column"} bgColor={"#0D0E16"}>
        <Image alt="connect wallet" src={NoWalletIcon} width={72}/>
        <Text fontWeight={500} fontSize={16} mt={6}>Connect to Wallet</Text>
        <Text fontSize={11} mt={4}>to participate in community chat </Text>
      </Flex>
    </Box>
  )
}

export default CommunityChat;