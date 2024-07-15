import { Box, Flex, Text } from "@chakra-ui/react";
import CommunityLeaderboard from "./CommunityLeaderboard";

const CommunityPage = () => {
  return (
    <Box>
      <Flex>
        <Text fontSize={48} fontWeight={700} textTransform={"uppercase"}>
          leaderboard
        </Text>
      </Flex>

      <CommunityLeaderboard />
    </Box>
  );
};

export default CommunityPage;
