import { useMemo } from "react";
import { GET_ALL_MARKET_GEMS, GET_MARKET_GEMS } from "@/constants/graphql";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";

export const useGetMarketGems = () => {
  const { address } = useAccount();
  const { loading, error, data } = useQuery(GET_ALL_MARKET_GEMS, {
    variables: {
      user: address,
    },
    pollInterval: 1000,
  });
  return useMemo(() => data?.nfts, [loading, error, data]);
};

export const useGetAllGems = () => {
  const { loading, error, data } = useQuery(GET_MARKET_GEMS, {
    pollInterval: 1000,
  });
  return useMemo(() => data?.nfts, [loading, error, data]);
};
