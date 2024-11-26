import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { formatUnits } from "viem";
import { getStakingIndex } from "@/utils";
import { MARKETPLACE_ADDRESS } from "@/constants/tokens";
import { useAccount, useSwitchChain } from "wagmi";
import { StakingIndex } from "@/recoil/market/atom";
import { cooldownStatus } from "@/recoil/mine/atom";
import { useRecoilState } from "recoil";
import { useGetCooldownPeriods } from "@/hooks/useGetCooldownPeriods";

import Sidebar from "./sidebar";
import Header from "./header";
import Modals from "./modals";
import Drawers from "../drawer";
import { SupportedChainId } from "@/types/network/supportedNetworks";
import { useCheckChain } from "@/hooks/useCheckChain";
import { fetchMarketPrice } from "@/utils/price";
import { priceListStatus } from "@/recoil/market/atom";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { chain, isConnected } = useAccount();
  const [, setStakingIndex] = useRecoilState(StakingIndex);
  const cooldownPeriods = useGetCooldownPeriods();
  const [, setCooldowns] = useRecoilState(cooldownStatus);
  const [, setPriceStatus] = useRecoilState(priceListStatus)
  const { switchChainAsync } = useSwitchChain();
  const { isSupportedChain } = useCheckChain();

  useEffect(() => {
    !isSupportedChain && switchChainAsync({ chainId: SupportedChainId.TITAN_SEPOLIA });
    const fetchStakingIndex = async () => {
      const stakingIndex: any = await getStakingIndex(
        MARKETPLACE_ADDRESS[chain?.id!] as `0x${string}`
      );
      setStakingIndex(Number(formatUnits(stakingIndex, 27)) | 1);
    };
    isConnected &&
      chain?.id === SupportedChainId.TITAN_SEPOLIA &&
      fetchStakingIndex();
  }, [isConnected, chain]);

  useEffect(() => {
    const fetchCooldowns = () => {
      setCooldowns({
        rareCooldown: cooldownPeriods?.RareGemsCooldownPeriod,
        epicCooldown: cooldownPeriods?.EpicGemsCooldownPeriod,
        uniqueCooldown: cooldownPeriods?.UniqueGemsCooldownPeriod,
        legendaryCooldown: cooldownPeriods?.LegendaryGemsCooldownPeriod,
        mythicCooldown: cooldownPeriods?.MythicGemsCooldownPeriod,
      });
    };
    fetchCooldowns();
  }, [cooldownPeriods]);

  useEffect(() => {
    const fetchPriceData = async () => {
      const price = await fetchMarketPrice();
      setPriceStatus({
        eth_price: price?.eth_price,
        ton_price: price?.ton_price 
      })
    };
    fetchPriceData();
  }, [])

  return (
    <Flex minH={"100vh"} bg={"#0D0E16"}>
      <Sidebar />
      <Box w={"100%"} p={"40px"}>
        <Header />
        {children}
      </Box>
      <Modals />
      <Drawers />
    </Flex>
  );
};

export default Layout;
