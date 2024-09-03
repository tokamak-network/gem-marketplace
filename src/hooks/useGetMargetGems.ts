import { useMemo } from "react";
import { GET_ALL_MARGET_GEMS } from "@/constants/graphql"
import { useQuery } from "@apollo/client";

export const useGetMargetGems = () => {
  const { loading, error, data } = useQuery(GET_ALL_MARGET_GEMS);
  return useMemo(() => data?.nfts,[loading, error, data])
}