import { Flex } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { activeRarityListSelector } from "@/recoil/market/atom";
import GemCard from "@/components/common/GemCard";

const ChestPage = () => {
const {activeRarityList} = useRecoilValue(activeRarityListSelector);
return (
    <Flex mt={4} gap={4} flexWrap={"wrap"}>
    {activeRarityList.map((item, key) => {
      return (
        <GemCard
          mode="chest"
          key={key}
          rarityScore={1}
          staked={253.2}
          dailyChange={16.7}
          gemInfo={item}
        />
      );
    })}
  </Flex>
  )
}

export default ChestPage;