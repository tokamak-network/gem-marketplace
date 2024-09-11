import { Flex } from "@chakra-ui/react";
import GemCard from "@/components/common/GemCard";
import { useSearchParams } from "next/navigation";
import GemItemView from "@/components/common/GemItemView";
import { useGetUserGems } from "@/hooks/useGetUserGems";
import { useFilteredList } from "@/hooks/useFilteredList";
import { GemStandard } from "@/types";

const ChestPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("asset");

  const userGemList = useGetUserGems();
  const { activeGemList } = useFilteredList(userGemList);

  return search ? (
    <GemItemView id={Number(search)} mode="chest" />
  ) : (
    <Flex mt={4} gap={4} flexWrap={"wrap"}>
      {activeGemList?.map((item: GemStandard, key: number) => {
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
