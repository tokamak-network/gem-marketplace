import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { formatUnits } from "viem";
import {
  getNumberOfUserByRarity,
  getStakingIndex,
  getGemListAvailableByRarity,
} from "@/utils";
import { FACTORY_ADDRESS, MARKETPLACE_ADDRESS } from "@/constants/tokens";
import { useAccount, useSwitchChain } from "wagmi";
import { StakingIndex } from "@/recoil/market/atom";
import { cooldownStatus, miningPeriodStatus } from "@/recoil/mine/atom";
import { useRecoilState } from "recoil";
import { useGetCooldownPeriods, useGetMiningPeriods } from "@/hooks/useGetCooldownPeriods";

import Sidebar from "./sidebar";
import Header from "./header";
import Modals from "./modals";
import Drawers from "../drawer";
import { SupportedChainId } from "@/types/network/supportedNetworks";
import { useCheckChain } from "@/hooks/useCheckChain";
import { fetchMarketPrice } from "@/utils/price";
import {
  priceListStatus,
  numberOfRarityUsers,
  numberOfRarityGemsAvailable,
} from "@/recoil/market/atom";
import { rarityList } from "@/constants/rarity";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { chain, isConnected } = useAccount();
  const [, setStakingIndex] = useRecoilState(StakingIndex);
  const cooldownPeriods = useGetCooldownPeriods();
  const miningPeriods = useGetMiningPeriods();
  const [, setCooldowns] = useRecoilState(cooldownStatus);
  const [, setMiningPeriods] = useRecoilState(miningPeriodStatus);
  const [, setPriceStatus] = useRecoilState(priceListStatus);
  const [, setNumberOfRarityUsers] = useRecoilState(numberOfRarityUsers);
  const [, setNumberOfRarityGems] = useRecoilState(numberOfRarityGemsAvailable);
  const { switchChainAsync } = useSwitchChain();
  const { isSupportedChain } = useCheckChain();

  useEffect(() => {
    const fetchNumberOfUser = async () => {
      for (let i = 0; i < 6; i++) {
        const number = await getNumberOfUserByRarity(
          FACTORY_ADDRESS[chain?.id!] as `0x${string}`,
          i
        );
        setNumberOfRarityUsers((prev) => ({
          ...prev,
          ...{ [rarityList[i]]: number },
        }));
      }
    };
    isConnected &&
      chain?.id === SupportedChainId.TITAN_SEPOLIA &&
      fetchNumberOfUser();
  }, []);

  useEffect(() => {
    const fetchNumberOfGems = async () => {
      for (let i = 0; i < 6; i++) {
        const result = await getGemListAvailableByRarity(
          FACTORY_ADDRESS[chain?.id!] as `0x${string}`,
          i
        );
        setNumberOfRarityGems((prev) => ({
          ...prev,
          ...{ [rarityList[i]]: result[0] },
        }));
      }
    };
    isConnected &&
      chain?.id === SupportedChainId.TITAN_SEPOLIA &&
      fetchNumberOfGems();
  }, []);

  useEffect(() => {
    !isSupportedChain &&
      switchChainAsync({ chainId: SupportedChainId.TITAN_SEPOLIA });
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

      setMiningPeriods({
        rareMiningPeriod: miningPeriods?.RareGemsCooldownPeriod,
        epicMiningPeriod: miningPeriods?.EpicGemsCooldownPeriod,
        uniqueMiningPeriod: miningPeriods?.UniqueGemsCooldownPeriod,
        legendaryMiningPeriod: miningPeriods?.LegendaryGemsCooldownPeriod,
        mythicMiningPeriod: miningPeriods?.MythicGemsCooldownPeriod,
      });
    };
    fetchCooldowns();
  }, [cooldownPeriods, miningPeriods]);

  useEffect(() => {
    const fetchPriceData = async () => {
      const price = await fetchMarketPrice();
      setPriceStatus({
        eth_price: price?.eth_price,
        ton_price: price?.ton_price,
      });
    };
    fetchPriceData();
  }, []);

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
