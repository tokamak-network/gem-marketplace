import Image from "next/image";
import { useAccount } from "wagmi";
import { Box, Button, Center, Flex, Text, useTheme } from "@chakra-ui/react";
import dynamic from "next/dynamic";

import { GemList } from "@/constants";
import { CardType, GemStandard } from "@/types";
import GemCard from "@/components/common/GemCard";
import { RarityItem } from "@/components/common/RarityList";
import { ColorItem } from "@/components/common/ColorList";
import { obtainModalStatus } from "@/recoil/market/atom";
import { useRecoilState } from "recoil";
import { sellGemModalStatus, burnGemModalStatus } from "@/recoil/chest/atom";

import useConnectWallet from "@/hooks/account/useConnectWallet";

import TonIcon from "@/assets/icon/ton.svg";
import WalletIcon from "@/assets/icon/wallet.svg";
import StarIcon from "@/assets/icon/star.svg";
import ColorIcon from "@/assets/icon/color.svg";
import CooldownIcon from "@/assets/icon/cooldown.svg";
import MiningIcon from "@/assets/icon/mine.svg";
import forgeIcon from "@/assets/icon/forge.svg";
import SavedIcon from "./SavedIcon";
import ShareIcon from "@/assets/icon/share.svg";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ItemProps {
  id: number;
  mode: CardType;
}

const GemItemView = ({ id, mode }: ItemProps) => {
  const gemItem = GemList.filter((item: GemStandard) => item.id === id);
  const { connectToWallet } = useConnectWallet();
  const { isConnected, address, chain } = useAccount();
  const [, setModalStatus] = useRecoilState(obtainModalStatus);
  const [, setSellGemModalStatus] = useRecoilState(sellGemModalStatus);
  const [, burnSellGemModalStatus] = useRecoilState(burnGemModalStatus);

  const handleClick = () => {
    isConnected
      ? setModalStatus({ isOpen: true, gemId: id })
      : connectToWallet();
  };
  const theme = useTheme();

  const series = [
    {
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ];
  const options: any = {
    chart: {
      height: "100%",
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#61FF00"],
    tooltip: {
      enabled: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    grid: {
      show: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
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
        <Flex w={"full"} flexDir={"column"}>
          <Flex justify={"space-between"}>
            <Text fontWeight={700} fontSize={48} textTransform="capitalize">
              {gemItem[0].rarity} Gem #{gemItem[0].id}
            </Text>

            <Flex columnGap={2}>
              <Center w={8} h={8} rounded={"8px"} bgColor={"#2A2C3A"}>
                <SavedIcon width={16} height={16} isFill={false}/>
              </Center>

              <Center w={8} h={8} rounded={"8px"} bgColor={"#2A2C3A"}>
                <Image alt="share" src={ShareIcon} width={16} height={16}/>
              </Center>
            </Flex>
          </Flex>

          <Flex flexDir={"column"} rowGap={22} my={"52px"}>
            <Flex>
              <Flex minW={173} columnGap={3} align={"center"}>
                <Image alt="rarity" src={StarIcon} width={16} height={16} />
                <Text
                  fontFamily={theme.fonts.Inter}
                  fontSize={16}
                  color={"#FFFFFF80"}
                >
                  Rarity:
                </Text>
              </Flex>

              <Box ml={"12px"}>
                <RarityItem active rarity={gemItem[0].rarity} />
              </Box>
            </Flex>

            <Flex>
              <Flex minW={173} columnGap={3} align={"center"}>
                <Image alt="rarity" src={ColorIcon} width={16} height={16} />
                <Text
                  fontFamily={theme.fonts.Inter}
                  fontSize={16}
                  color={"#FFFFFF80"}
                >
                  Color:
                </Text>
              </Flex>

              <Flex columnGap={3}>
                <ColorItem active color="garnet" />
                <ColorItem active color="topaz" />
              </Flex>
            </Flex>

            <Flex>
              <Flex minW={173} columnGap={3} align={"center"}>
                <Image alt="rarity" src={CooldownIcon} width={16} height={16} />
                <Text
                  fontFamily={theme.fonts.Inter}
                  fontSize={16}
                  color={"#FFFFFF80"}
                >
                  Cooldown Time:
                </Text>
              </Flex>

              <Text
                fontFamily={theme.fonts.Inter}
                fontWeight={500}
                fontSize={16}
              >
                Slow (30d)
              </Text>
            </Flex>

            <Flex>
              <Flex minW={173} columnGap={3} align={"center"}>
                <Image alt="rarity" src={MiningIcon} width={16} height={16} />
                <Text
                  fontFamily={theme.fonts.Inter}
                  fontSize={16}
                  color={"#FFFFFF80"}
                >
                  Mining Power:
                </Text>
              </Flex>

              <Text
                fontFamily={theme.fonts.Inter}
                fontWeight={500}
                fontSize={16}
              >
                Common - Mythic
              </Text>
            </Flex>

            <Flex>
              <Flex minW={173} columnGap={3} align={"center"}>
                <Image alt="rarity" src={forgeIcon} width={16} height={16} />
                <Text
                  fontFamily={theme.fonts.Inter}
                  fontSize={16}
                  color={"#FFFFFF80"}
                >
                  Forge:
                </Text>
              </Flex>

              <Text
                fontFamily={theme.fonts.Inter}
                fontWeight={500}
                fontSize={16}
              >
                Common - Mythic
              </Text>
            </Flex>
          </Flex>

          {/* <ReactAp
           */}

          <Text fontSize={14} fontWeight={400} opacity={0.5}>
            Backed by
          </Text>
          <Flex align={"end"} columnGap={17} mb={9}>
            <Center columnGap={3}>
              <Image alt="ton" src={TonIcon} width={32} height={32} />
              <Text fontSize={32} fontWeight={600}>
                128.2907 TON
              </Text>
            </Center>

            <Text pb={"6px"} fontSize={14} lineHeight={"30px"} opacity={0.5}>
              $253.20
            </Text>
          </Flex>

          {mode === "market" ? (
            <Box>
              <Text pb={"6px"} fontSize={14} lineHeight={"30px"} opacity={0.5}>
                BUY GEM WITH:
              </Text>
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
            </Box>
          ) : mode === "chest" ? (
            <Flex w={"100%"} columnGap={6}>
              <Button
                w={"full"}
                maxW={624}
                h={"65px"}
                columnGap={2}
                alignItems={"center"}
                justifyContent={"center"}
                colorScheme="blue"
                bgColor={"#0380FF"}
                onClick={() => {
                  setSellGemModalStatus(true);
                }}
              >
                Sell
              </Button>
              <Button
                w={"full"}
                maxW={624}
                h={"65px"}
                columnGap={2}
                alignItems={"center"}
                justifyContent={"center"}
                colorScheme="blue"
                bgColor={"transparent"}
                onClick={() => burnSellGemModalStatus(true)}
                border={"1px solid #0380FF"}
                _hover={{ bgColor: "#111111" }}
              >
                Burn
              </Button>
            </Flex>
          ) : (
            ""
          )}
        </Flex>
      </Flex>

      <Flex w={"100%"} mt={10} columnGap={6} flexGrow={1} h={"fit-content"}>
        <Box w={"100%"} h={"100%"} bgColor={"#191A22"} rounded={16} />
        <Box w={"100%"} h={"100%"} bgColor={"#191A22"} rounded={16} />
      </Flex>
    </Flex>
  );
};

export default GemItemView;
