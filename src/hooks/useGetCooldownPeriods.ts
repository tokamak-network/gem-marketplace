import { useMemo } from "react";
import { GET_COOLDOWN_PERIODS, GET_MINING_PERIODS } from "@/constants/graphql";
import { useQuery } from "@apollo/client";

export const useGetCooldownPeriods = () => {
  const { loading, error, data } = useQuery(GET_COOLDOWN_PERIODS);
  return useMemo(() => data?.gemCooldowns[0], [loading, error, data]);
};

export const useGetMiningPeriods = () => {
  const { loading, error, data } = useQuery(GET_MINING_PERIODS);
  console.log(loading, error);
  return useMemo(() => data?.gemMiningPeriods[0], [loading, error, data]);
};