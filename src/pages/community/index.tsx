import { Box, Flex, Text } from "@chakra-ui/react";
import CommunityLeaderboard from "./leaderboard/CommunityLeaderboard";
import EventContainer from "./event/EventContainer";

const CommunityPage = () => {
  return (
    <Flex flexDir={"column"} h={"100%"}>
      <Flex>
        <Text fontSize={48} fontWeight={700} textTransform={"uppercase"}>
          leaderboard
        </Text>
      </Flex>

      <CommunityLeaderboard />
      <EventContainer />
    </Flex>
  );
};

export default CommunityPage;
