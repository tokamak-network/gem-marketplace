import { Box } from "@chakra-ui/react";
import RarityList from "@/components/market/RarityList";

const MarketPage = () => {
  return (
    <Box w={"100%"} p={"30px"}>
      <RarityList/>
    </Box>
  )
}

export default MarketPage;