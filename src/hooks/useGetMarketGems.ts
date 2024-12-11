import { useMemo } from "react";
import { GET_ALL_MARKET_GEMS, GET_GEM_WITH_ID, GET_MARKET_GEMS, GET_TX_HISTORY, GET_USER_TX_HISTORY } from "@/constants/graphql";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";

export const useGetMarketGems = () => {
  const { loading, error, data } = useQuery(GET_ALL_MARKET_GEMS, {
    pollInterval: 5000,
  });
  return useMemo(() => data?.nfts, [loading, error, data]);
};

export const useGetAllGems = () => {
  const { loading, error, data } = useQuery(GET_MARKET_GEMS, {
    pollInterval: 5000,
  });
  return useMemo(() => data?.nfts, [loading, error, data]);
};

export const useGetUserTransactionHistory = () => {
  const { address } = useAccount();
  const { loading, error, data } = useQuery(GET_USER_TX_HISTORY, {
    variables: {
      user: address
    },
  });
  return useMemo(() => data?.tradeHistories, [loading, error, data]);
}

export const useGetTransactionHistory = () => {
  const { loading, error, data } = useQuery(GET_TX_HISTORY, {
  });
  return useMemo(() => data?.tradeHistories, [loading, error, data]);
}

export const useGetGemWithId = (id: number) => {
  const { loading, error, data } = useQuery(GET_GEM_WITH_ID, {
    variables: {
      id: id
    },
  });
  return useMemo(() => data?.nfts, [loading, error, data]);
}