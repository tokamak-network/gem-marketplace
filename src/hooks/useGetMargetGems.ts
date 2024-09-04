import { useMemo } from "react";
import { GET_ALL_MARGET_GEMS, GET_USER_GEMS } from "@/constants/graphql";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";

export const useGetMargetGems = () => {
  const { loading, error, data } = useQuery(GET_ALL_MARGET_GEMS);
  return useMemo(() => data?.nfts, [loading, error, data]);
};

export const useGetUserGems = () => {
  const { address } = useAccount();
  const { loading, error, data } = useQuery(GET_USER_GEMS, {
    variables: {
      user: address
    }
  });
  return useMemo(() => data?.nfts, [loading, error, data]);
};
