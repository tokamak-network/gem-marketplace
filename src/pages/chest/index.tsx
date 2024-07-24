import { Flex } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { activeRarityListSelector } from "@/recoil/market/atom";
import GemCard from "@/components/common/GemCard";
import { useSearchParams } from "next/navigation";
import GemItemView from "@/components/common/GemItemView";

const ChestPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("asset");

  const { activeRarityList } = useRecoilValue(activeRarityListSelector);

  return search ? (
    <GemItemView id={Number(search)} mode="chest" />
  ) : (
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
  );
};

export default ChestPage;
