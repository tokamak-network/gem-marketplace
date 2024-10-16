import { Box, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { formatUnits } from "viem";
import { getStakingIndex } from "@/utils";
import { MARKETPLACE_ADDRESS } from "@/constants/tokens";
import { useAccount } from "wagmi";
import { StakingIndex } from "@/recoil/market/atom";
import { useRecoilState } from "recoil";

import Sidebar from "./sidebar";
import Header from "./header";
import Modals from "./modals";
import Drawers from "../drawer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { chain } = useAccount();
  const [, setStakingIndex] = useRecoilState(StakingIndex);

  useEffect(() => {
    const fetchStakingIndex = async () => {
      const stakingIndex: any = await getStakingIndex(
        MARKETPLACE_ADDRESS[chain?.id!] as `0x${string}`
      );
      setStakingIndex(Number(formatUnits(stakingIndex, 27)));
    };
    fetchStakingIndex();
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
