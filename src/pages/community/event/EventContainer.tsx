import { Flex } from "@chakra-ui/react";
import CommunityEventTable from "./CommunityEventTable";
import CommunityScore from "./CommunityScore";

const EventContainer = () => {
  return (
    <Flex columnGap={5} mt={10} flexGrow={1}>
      <CommunityEventTable />
      <CommunityScore />
    </Flex>
  );
};

export default EventContainer;
