import { Flex } from "@chakra-ui/react";
import { useState } from "react";
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

  const { result, fetchMore } = useGetUserGems();
  const { activeGemList } = useFilteredList(result);
  const [hasMore, setHasMore] = useState<boolean>(true);

  return search ? (
    <GemItemView id={Number(search)} mode="chest" />
  ) : (
    activeGemList && (
      <InfiniteScroll
        dataLength={activeGemList.length} //This is important field to render the next data
        next={() =>
          fetchMore({
            variables: {
              skip: activeGemList.length,
            },
            updateQuery(previousData, { fetchMoreResult }) {
              if (fetchMoreResult.nfts.length < 15) {
                setHasMore(false);
              }
              return { nfts: [...previousData.nfts, ...fetchMoreResult.nfts] };
            },
          })
        }
        hasMore={hasMore}
        loader={<h4></h4>}
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
