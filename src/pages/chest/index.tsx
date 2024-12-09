import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import GemCard from "@/components/common/GemCard";
import { useSearchParams } from "next/navigation";
import GemItemView from "@/components/common/GemItemView";
import { useGetUserGems } from "@/hooks/useGetUserGems";
import { useFilteredList } from "@/hooks/useFilteredList";
import { GemStandard } from "@/types";
import InfiniteScroll from "react-infinite-scroll-component";
import BuyRecommendModal from "@/components/modal/BuyRecommendModal";
import { selectedForgeGems } from "@/recoil/forge/atom";
import { colorStatus, rarityStatus } from "@/recoil/market/atom";
import { RarityType } from "@/types";
import { useRecoilState } from "recoil";

const ChestPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("asset");

  const { result, fetchMore } = useGetUserGems();
  const { activeGemList } = useFilteredList(result);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [isBuyRecommendModal, setBuyRecommendModal] = useState<boolean>(false);
  const [, setSelectedGemsInfo] = useRecoilState(selectedForgeGems);
  const [, setRarityState] = useRecoilState(rarityStatus);
  const [, setColorState] = useRecoilState(colorStatus);

  useEffect(() => {
    result && result.length && result.length > 0
      ? setBuyRecommendModal(false)
      : setBuyRecommendModal(true);
  }, [result]);

  useEffect(() => {
    setSelectedGemsInfo({
      selectedRarity: RarityType.none,
      selectedGemsList: [],
    });
    setRarityState({
      common: false,
      rare: false,
      unique: false,
      epic: false,
      legendary: false,
      mythic: false,
    });
    setColorState({
      ruby: false,
      amber: false,
      topaz: false,
      emerald: false,
      turquoise: false,
      sapphire: false,
      amethyst: false,
      garnet: false,
      diamond: false,
      onyx: false,
    })
  }, []);

  return search ? (
    <GemItemView id={Number(search)} mode="chest" />
  ) : (
    // activeGemList && (
    //   <InfiniteScroll
    //     dataLength={activeGemList.length} //This is important field to render the next data
    //     next={() =>
    //       fetchMore({
    //         variables: {
    //           skip: activeGemList.length,
    //         },
    //         updateQuery(previousData, { fetchMoreResult }) {
    //           if (fetchMoreResult.nfts.length < 15) {
    //             setHasMore(false);
    //           }
    //           return { nfts: [...previousData.nfts, ...fetchMoreResult.nfts] };
    //         },
    //       })
    //     }
    //     hasMore={hasMore}
    //     loader={<h4></h4>}
    //     endMessage={
    //       <p style={{ textAlign: "center" }}>
    //         {/* <b>Yay! You have seen it all</b> */}
    //       </p>
    //     }
    //   >
    <Flex mt={4} gap={4} flexWrap={"wrap"}>
      <BuyRecommendModal
        mode={"chest"}
        isOpen={isBuyRecommendModal}
        onClose={() => setBuyRecommendModal(false)}
      />
      {activeGemList &&
        activeGemList.length > 0 &&
        activeGemList.map((item: GemStandard, key: number) => {
          return <GemCard mode="chest" key={key} gemInfo={item} />;
        })}
    </Flex>
    //   </InfiniteScroll>
    // )
  );
};

export default ChestPage;
