import { Box } from "@chakra-ui/react";
import RarityList from "@/components/market/RarityList";
import ColorList from "@/components/market/ColorList";

const MarketPage = () => {
  return (
    <Box w={"100%"} p={"30px"}>
      <RarityList />
      <ColorList />
    </Box>
  )
}

export default MarketPage;