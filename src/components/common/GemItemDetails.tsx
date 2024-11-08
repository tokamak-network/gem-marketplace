import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { GemContractAddress } from "@/constants";

const GemItemDetails = ({ gemId, owner }: { gemId: number; owner: string }) => {
  const { chain } = useAccount();

  return (
    <Box w={"100%"} h={"100%"} bgColor={"#191A22"} rounded={16} p={9}>
      <Text fontSize={18} fontWeight={600}>
        Details
      </Text>

      <Flex flexDir={"column"} fontSize={14} fontWeight={300} rowGap={"10px"} mt={2}>
        <Flex>
          <Text color={"#FFFFFF80"} minW={130}>NFT ID:</Text> <Text>{gemId}</Text>
        </Flex>
        <Flex>
          <Text color={"#FFFFFF80"} minW={130}>Amount Minted:</Text> <Text>1</Text>
        </Flex>
        <Flex>
          <Text color={"#FFFFFF80"} minW={130}>Owned By:</Text>{" "}
          <Link
            color={"#0380FF"}
            href={chain?.blockExplorers?.default.url + "/address/" + owner}
            target="_blank"
          >
            {owner}
          </Link>
        </Flex>
        <Flex>
          <Text color={"#FFFFFF80"} minW={130}>Contract Address:</Text>{" "}
          <Link
          color={"#0380FF"}
            href={
              chain?.blockExplorers?.default.url +
              "/address/" +
              GemContractAddress
            }
            target="_blank"
          >
            {GemContractAddress}
          </Link>
        </Flex>
        <Flex>
          <Text color={"#FFFFFF80"} fontWeight={300} minW={130}>Token Standard:</Text> <Text>ERC-721</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default GemItemDetails;
