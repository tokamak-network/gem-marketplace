import { useMemo } from "react";
import { useAccount } from "wagmi";
import { useQuery } from "@apollo/client";
import { GET_USER_GEMS } from "@/constants/graphql";

export const useGetUserGems = () => {
  const { address } = useAccount();
  const { loading, error, data } = useQuery(GET_USER_GEMS, {
    variables: {
      user: address,
    },
  });
  return useMemo(() => data?.nfts, [loading, error, data]);
};
