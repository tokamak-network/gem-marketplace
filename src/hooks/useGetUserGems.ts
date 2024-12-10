import { useMemo } from "react";
import { useAccount } from "wagmi";
import { useQuery } from "@apollo/client";
import { GET_USER_GEMS, GET_USER_MINE_GEMS } from "@/constants/graphql";

export const useGetUserGems = () => {
  const { address } = useAccount();
  const { loading, error, data, fetchMore } = useQuery(GET_USER_GEMS, {
    variables: {
      user: address,
      skip: 0,
      first: 1000,
    },
    pollInterval: 5000
  });
  const result = useMemo(() => data?.nfts, [loading, error, data]);
  return { fetchMore, result };
};

export const useGetUserMineGems = () => {
  const { address } = useAccount();
  const { loading, error, data } = useQuery(GET_USER_MINE_GEMS, {
    variables: {
      user: address,
    },
    pollInterval: 5000
  });
  return useMemo(() => data?.nfts, [loading, error, data]);
};
