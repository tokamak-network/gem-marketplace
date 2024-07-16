import Image from "next/image";
import { useAccount } from "wagmi";
import ApexCharts from 'apexcharts';

import { GemList } from "@/constants";
import { GemStandard } from "@/types";
import GemCard from "@/components/common/GemCard";
import { RarityItem } from "@/components/common/RarityList";
import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { ColorItem } from "@/components/common/ColorList";

import useConnectWallet from "@/hooks/account/useConnectWallet";

import TonIcon from "@/assets/icon/ton.svg";
import WalletIcon from "@/assets/icon/wallet.svg";
import ReactApexChart from "react-apexcharts";
import { m } from "framer-motion";

interface ItemProps {
  id: number;
}

const GemItem = ({ id }: ItemProps) => {
  const gemItem = GemList.filter((item: GemStandard) => item.id === id);
  const { connectToWallet } = useConnectWallet();
  const { isConnected, address, chain } = useAccount();

  const handleClick = () => {
    !isConnected && connectToWallet();
  };

  const series = [{
    name: "Desktops",
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
}];
  const options: any = {
    chart: {
      height: "100%",
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    colors: ["#61FF00"],
    tooltip: {
      enabled: false
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    grid: {
      show: false
    },
    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
  };


  return (
    <Flex flexDir={"column"} w={"100%"} h={"100%"}>
      <Flex columnGap={"40px"}>
        <GemCard
          mode="normal"
          width={453}
          height={581}
          staked={128.2907}
          rarityScore={10}
          gemInfo={gemItem[0]}
          dailyChange={16.7}
          gemWidth={316}
          gemHeight={316}
        />
        <Flex w={"full"} flexDir={"column"} py={6}>
          <Flex columnGap={4} ml={"15px"} mb={6}>
            <RarityItem active rarity={gemItem[0].rarity} />
            <ColorItem active color="garnet" />
            <ColorItem active color="topaz" />
          </Flex>

          <Text fontWeight={700} fontSize={48} textTransform="capitalize">
            {gemItem[0].rarity} Gem #{gemItem[0].id}
          </Text>

            <ReactApexChart options={options} series={series} type="line" width={400} height={150} />

          <Text fontSize={14} fontWeight={400} opacity={0.5}>
            Staked TON
          </Text>
          <Flex align={"end"} columnGap={17} mb={10}>
            <Center columnGap={3}>
              <Image alt="ton" src={TonIcon} width={32} height={32} />
              <Text fontSize={32} fontWeight={600}>
                128.2907 TON
              </Text>
            </Center>

            <Text
              pb={"6px"}
              fontSize={20}
              fontWeight={600}
              lineHeight={"30px"}
              opacity={0.5}
            >
              $253.203547
            </Text>
          </Flex>

          <Button
            w={"full"}
            maxW={624}
            h={"65px"}
            columnGap={2}
            alignItems={"center"}
            justifyContent={"center"}
            colorScheme="blue"
            bgColor={"#0380FF"}
            onClick={handleClick}
          >
            {isConnected ? (
              <Image alt="ton" src={TonIcon} width={27} height={27} />
            ) : (
              <Image alt="wallet" src={WalletIcon} width={22} height={23} />
            )}
            <Text fontSize={24} fontWeight={600}>
              {isConnected ? "135 TON" : "Connect Wallet"}
            </Text>
          </Button>
        </Flex>
      </Flex>

      <Flex w={"100%"} mt={10} columnGap={6} flexGrow={1} h={"fit-content"}>
        <Box w={"100%"} h={"100%"} bgColor={"#191A22"} rounded={16} />
        <Box w={"100%"} h={"100%"} bgColor={"#191A22"} rounded={16} />
      </Flex>
    </Flex>
  );
};

export default GemItem;
