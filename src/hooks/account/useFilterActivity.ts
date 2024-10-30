import { useGetTransactionHistory } from "../useGetMarketGems";
import { useRecoilState } from "recoil";
import { ActivityFilter, activityFilterStatus } from "@/recoil/activity/atom";
import { useMemo } from "react";

export const useFilterActivity = () => {
  const [activityStatus] = useRecoilState(activityFilterStatus);
  const tradeHistory = useGetTransactionHistory();
  
  const history = useMemo(
    () =>
      tradeHistory && tradeHistory.length > 0 &&
      tradeHistory.filter((item: any) =>
        activityStatus === ActivityFilter.ALL
          ? true
          : activityStatus === ActivityFilter.MINE
            ? item.tradeType === "mined"
            : activityStatus === ActivityFilter.FORGE
              ? item.tradeType === "forged"
              : activityStatus === ActivityFilter.BUYSELL
                ? item.tradeType === "purchased"
                : false
      ),
    [activityStatus, tradeHistory]
  );
  return history;
};
