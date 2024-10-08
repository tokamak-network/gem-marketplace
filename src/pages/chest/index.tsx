import { Flex } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import GemCard from "@/components/common/GemCard";
import { useSearchParams } from "next/navigation";
import GemItemView from "@/components/common/GemItemView";
import { useGetUserGems } from "@/hooks/useGetUserGems";
import { useFilteredList } from "@/hooks/useFilteredList";
import { GemStandard } from "@/types";
import InfiniteScroll from "react-infinite-scroll-component";

const ChestPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("asset");

  const {result, fetchMore} = useGetUserGems();
  const { activeGemList } = useFilteredList(result);
  const [hasMore, setHasMore] = useState<boolean>(true);

  console.log(activeGemList);
  return search ? (
    <GemItemView id={Number(search)} mode="chest" />
  ) : (
    activeGemList && (
      <InfiniteScroll
        dataLength={activeGemList.length} //This is important field to render the next data
        next={() => fetchMore({
          variables: {
            offset: 10
          }
        })}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
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
      </InfiniteScroll>
    )
  );
};

export default ChestPage;
