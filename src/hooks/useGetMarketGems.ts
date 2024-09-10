import { useMemo } from "react";
import { GET_ALL_MARKET_GEMS, GET_USER_GEMS } from "@/constants/graphql";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";

export const useGetMarketGems = () => {
  const { address } = useAccount();
  const { loading, error, data } = useQuery(GET_ALL_MARKET_GEMS, {
    variables: {
      user: address,
    },
  });
  return useMemo(() => data?.nfts, [loading, error, data]);
};

