import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import {
  Box,
  Button,
  Center,
  Flex,
  Text,
  useTheme,
  Spinner,
} from "@chakra-ui/react";

import { CardType, GemStandard, RarityType } from "@/types";
import GemCard from "@/components/common/GemCard";
import { RarityItem } from "@/components/common/RarityList";
import { ColorItem } from "@/components/common/ColorList";
import { obtainModalStatus, StakingIndex } from "@/recoil/market/atom";
import { useRecoilState } from "recoil";
import { formatUnits, parseUnits } from "viem";

import { sellGemModalStatus, burnGemModalStatus } from "@/recoil/chest/atom";

import useConnectWallet from "@/hooks/account/useConnectWallet";

import { useGetAllGems } from "@/hooks/useGetMarketGems";
import { colorNameList, rarityList } from "@/constants/rarity";
import { buyGem, useBuyGem } from "@/hooks/useBuyGem";
import {
  MARKETPLACE_ADDRESS,
  TON_ADDRESS_BY_CHAINID,
  WSWTON_ADDRESS_BY_CHAINID,
} from "@/constants/tokens";
import { handleApprove, useTonORWSTONApprove } from "@/hooks/useApprove";
import { useApproval } from "@/hooks/useApproval";
import { useWaitForTransaction } from "@/hooks/useWaitTxReceipt";
import { cooldownStatus } from "@/recoil/mine/atom";
import { cooldownIndex, TON_FEES_RATE_DIVIDER } from "@/constants";

import WSTONIcon from "@/assets/icon/wswton.svg";
import WalletIcon from "@/assets/icon/wallet.svg";
import StarIcon from "@/assets/icon/star.svg";
import ColorIcon from "@/assets/icon/color.svg";
import CooldownIcon from "@/assets/icon/cooldown.svg";
import MiningIcon from "@/assets/icon/mine.svg";
import forgeIcon from "@/assets/icon/forge.svg";
import SavedIcon from "./SavedIcon";
import ShareIcon from "@/assets/icon/share.svg";
import TonIcon from "@/assets/icon/ton.svg";
import { getTonFeesRate } from "@/utils";

interface ItemProps {
  id: number;
  mode: CardType;
}

enum PayOption {
  BOTH,
  WSTON,
  TON,
  NONE,
}

const GemItemView = ({ id, mode }: ItemProps) => {
  const gemList = useGetAllGems();
  const { connectToWallet } = useConnectWallet();
  const { isConnected, address, chain } = useAccount();
  const [, setModalStatus] = useRecoilState(obtainModalStatus);
  const [, setSellGemModalStatus] = useRecoilState(sellGemModalStatus);
  const [, burnSellGemModalStatus] = useRecoilState(burnGemModalStatus);
  const [stakingIndex] = useRecoilState(StakingIndex);
  const [isWSTONLoading, setWSTONLoading] = useState<boolean>(false);
  const [isTONLoading, setTONLoading] = useState<boolean>(false);
  const [cooldowns] = useRecoilState(cooldownStatus);
  const { waitForTransactionReceipt } = useWaitForTransaction();
  const [tonFeesRate, setTonFeesRate] = useState<number>();

  const gemItem: GemStandard[] = useMemo(
    () =>
      gemList?.filter(
        (item: GemStandard) => Number(item.tokenID) === Number(id)
      ),
    [gemList]
  );

  const nonDupColorList = useMemo(
    () =>
      gemItem[0].color.filter(
        (value: number, index: number, self: number[]) => {
          return self.indexOf(value) === index;
        }
      ),

    [gemItem]
  );

  const cooldownTime = useMemo(() => {
    const baseValue = cooldowns[cooldownIndex[Number(gemItem[0]?.rarity)]];
    if (Math.floor(baseValue / (3600 * 24)) > 0) {
      if (Math.floor(baseValue % (3600 * 24)) === 0)
        return `${baseValue / (3600 * 24)} days`;
      else {
        return `${Math.floor(baseValue / (3600 * 24))} days ${Math.floor(baseValue % (3600 * 24))} hours`;
      }
    } else {
      return `${Math.floor(baseValue / 3600)} hours ${Math.floor((baseValue % 3600) / 60)} minutes`;
    }
  }, [cooldowns, gemItem, cooldownIndex]);

  const WSTONBalance = useBalance({
    address: address,
    token: WSWTON_ADDRESS_BY_CHAINID[chain?.id!] as `0x${string}`,
  });

  const TONBalance = useBalance({
    address: address,
    token: TON_ADDRESS_BY_CHAINID[chain?.id!] as `0x${string}`,
  });

  const priceAsTON = useMemo(
    () =>
      Number(formatUnits(gemItem[0]?.price || BigInt(0), 27)) * stakingIndex +
      (Number(formatUnits(gemItem[0]?.price || BigInt(0), 27)) *
        stakingIndex *
        tonFeesRate!) /
        TON_FEES_RATE_DIVIDER,
    [stakingIndex, tonFeesRate, TON_FEES_RATE_DIVIDER, gemItem]
  );

  const payOption = useMemo(() => {
    const WSTONBalanceValue = Number(
      formatUnits(WSTONBalance?.data?.value! ?? "0", 27)
    );
    const TONBalanceValue = Number(
      formatUnits(TONBalance?.data?.value! ?? "0", 18)
    );
    const priceValue = Number(
      formatUnits(gemItem ? gemItem[0]?.value! : BigInt("0"), 27)
    );

    console.log(TONBalanceValue, priceValue, stakingIndex);
    if (
      WSTONBalanceValue > priceValue &&
      TONBalanceValue > priceValue * stakingIndex
    ) {
      return PayOption.BOTH;
    }
    if (
      WSTONBalanceValue > priceValue &&
      TONBalanceValue < priceValue * stakingIndex
    ) {
      return PayOption.WSTON;
    }
    if (
      WSTONBalanceValue < priceValue &&
      TONBalanceValue > priceValue * stakingIndex
    ) {
      return PayOption.TON;
    }
    if (
      WSTONBalanceValue < priceValue &&
      TONBalanceValue < priceValue * stakingIndex
    ) {
      return PayOption.NONE;
    }
  }, [WSTONBalance, gemItem, TONBalance]);

  const handleClick = useCallback(
    async (isPayWithWSTON: boolean) => {
      !isConnected && connectToWallet();

      try {
        isPayWithWSTON ? setWSTONLoading(true) : setTONLoading(true);
        const txHash = await handleApprove(
          MARKETPLACE_ADDRESS[chain?.id!] as `0x${string}`,
          isPayWithWSTON
            ? (WSWTON_ADDRESS_BY_CHAINID[chain?.id!] as `0x${string}`)
            : (TON_ADDRESS_BY_CHAINID[chain?.id!] as `0x${string}`),
          isPayWithWSTON
            ? gemItem
              ? gemItem[0]?.price!
              : BigInt("0")
            : parseUnits(priceAsTON.toString(), 18)
        );

        await waitForTransactionReceipt(txHash);
        const contract_address = MARKETPLACE_ADDRESS[chain?.id!];
        const buyTx = await buyGem(
          gemItem[0].tokenID,
          isPayWithWSTON,
          contract_address as `0x${string}`
        );
        await waitForTransactionReceipt(buyTx);

        setWSTONLoading(false);
        setTONLoading(false);
        setModalStatus({ isOpen: true, gemId: gemItem[0]?.tokenID });
      } catch (e) {
        setWSTONLoading(false);
        setTONLoading(false);
        console.log(e);
      }
    },
    [payOption]
  );

  useEffect(() => {
    const fetchTonFeesRate = async () => {
      const value = await getTonFeesRate(
        MARKETPLACE_ADDRESS[chain?.id!] as `0x${string}`
      );
      setTonFeesRate(Number(formatUnits(value, 0)));
    };
    fetchTonFeesRate();
  }, []);

  const theme = useTheme();
  return (
    gemItem &&
    gemItem[0] && (
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
                {rarityList[Number(gemItem[0]?.rarity)]} Gem #
                {gemItem[0]?.tokenID}
              </Text>

              <Flex columnGap={2}>
                {/* <Center w={8} h={8} rounded={"8px"} bgColor={"#2A2C3A"}>
                  <SavedIcon width={16} height={16} isFill={false} />
                </Center> */}

                <Center w={8} h={8} rounded={"8px"} bgColor={"#2A2C3A"}>
                  <Image alt="share" src={ShareIcon} width={16} height={16} />
                </Center>
              </Flex>
            </Flex>

            <Flex flexDir={"column"} rowGap={22} my={"36px"}>
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
                  <RarityItem
                    readOnly
                    active
                    rarity={rarityList[Number(gemItem[0]?.rarity)]}
                  />
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
                  {nonDupColorList.map((item, key) => (
                    <ColorItem readOnly color={colorNameList[item]} key={key} />
                  ))}
                </Flex>
              </Flex>

              <Flex>
                <Flex minW={173} columnGap={3} align={"center"}>
                  <Image alt="rarity" src={forgeIcon} width={16} height={16} />
                  <Text
                    fontFamily={theme.fonts.Inter}
                    fontSize={16}
                    color={"#FFFFFF80"}
                  >
                    Forging:
                  </Text>
                </Flex>

                {rarityList[Number(gemItem[0]?.rarity)] ===
                RarityType.mythic ? (
                  "N/A"
                ) : (
                  <Box ml={"12px"}>
                    <RarityItem
                      active
                      readOnly
                      rarity={rarityList[Number(gemItem[0]?.rarity) + 1]}
                    />
                  </Box>
                )}
              </Flex>

              <Flex>
                <Flex minW={173} columnGap={3} align={"center"}>
                  <Image alt="rarity" src={MiningIcon} width={16} height={16} />
                  <Text
                    fontFamily={theme.fonts.Inter}
                    fontSize={16}
                    color={"#FFFFFF80"}
                  >
                    Mining:
                  </Text>
                </Flex>

                {rarityList[Number(gemItem[0]?.rarity)] ===
                RarityType.common ? (
                  "N/A"
                ) : (
                  <Box ml={"12px"}>
                    <RarityItem
                      active
                      readOnly
                      rarity={rarityList[Number(gemItem[0]?.rarity) - 1]}
                    />
                  </Box>
                )}
              </Flex>

              <Flex>
                <Flex minW={173} columnGap={3} align={"center"}>
                  <Image
                    alt="rarity"
                    src={CooldownIcon}
                    width={16}
                    height={16}
                  />
                  <Text
                    fontFamily={theme.fonts.Inter}
                    fontSize={16}
                    color={"#FFFFFF80"}
                  >
                    Cooldown:
                  </Text>
                </Flex>

                <Text
                  fontFamily={theme.fonts.Inter}
                  fontWeight={500}
                  fontSize={16}
                >
                  {Number(gemItem[0]?.rarity) === 0 ? "N/A" : cooldownTime}
                </Text>
              </Flex>

              <Flex>
                <Flex minW={173} columnGap={3} align={"center"}>
                  <Text
                    fontFamily={theme.fonts.Inter}
                    fontSize={14}
                    color={"#FFFFFF80"}
                  >
                    Mines Remaining:
                  </Text>
                </Flex>

                <Text
                  fontFamily={theme.fonts.Inter}
                  fontWeight={500}
                  fontSize={16}
                >
                  {gemItem[0]?.miningTry}
                </Text>
              </Flex>
            </Flex>

            <Text fontSize={14} fontWeight={400} opacity={0.5}>
              Backed by
            </Text>
            <Flex align={"end"} columnGap={17} mb={9}>
              <Center columnGap={3}>
                <Image alt="ton" src={WSTONIcon} width={32} height={32} />
                <Text fontSize={32} fontWeight={600}>
                  {`${formatUnits(gemItem[0]?.value!, 27)} WSTON`}
                </Text>
              </Center>

              <Text pb={"6px"} fontSize={14} lineHeight={"30px"} opacity={0.5}>
                $253.20
              </Text>
            </Flex>

            {isConnected ? (
              mode === "market" ? (
                <Box>
                  <Text
                    pb={"6px"}
                    fontSize={14}
                    lineHeight={"30px"}
                    opacity={0.5}
                  >
                    BUY GEM WITH:
                  </Text>
                  <Center columnGap={"16px"}>
                    {(payOption === PayOption.WSTON ||
                      payOption === PayOption.BOTH) && (
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
                          handleClick(true);
                        }}
                        isDisabled={isTONLoading || isWSTONLoading}
                      >
                        {!isWSTONLoading &&
                          (isConnected ? (
                            <Image
                              alt="ton"
                              src={WSTONIcon}
                              width={27}
                              height={27}
                            />
                          ) : (
                            <Image
                              alt="wallet"
                              src={WalletIcon}
                              width={22}
                              height={23}
                            />
                          ))}
                        <Text fontSize={24} fontWeight={600}>
                          {isWSTONLoading ? (
                            <Spinner
                              thickness="4px"
                              speed="0.65s"
                              emptyColor="gray.200"
                              color="blue.500"
                              size="md"
                            />
                          ) : (
                            `${formatUnits(gemItem[0]?.price || BigInt(0), 27)} TITANWSTON`
                          )}
                        </Text>
                      </Button>
                    )}
                    {payOption === PayOption.BOTH && <Text>or</Text>}
                    {(payOption === PayOption.TON ||
                      payOption === PayOption.BOTH) && (
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
                          handleClick(false);
                        }}
                        isDisabled={isWSTONLoading || isTONLoading}
                      >
                        {!isTONLoading && (
                          <Image
                            alt="ton"
                            src={TonIcon}
                            width={27}
                            height={27}
                          />
                        )}
                        <Text fontSize={24} fontWeight={600}>
                          {isTONLoading ? (
                            <Spinner
                              thickness="4px"
                              speed="0.65s"
                              emptyColor="gray.200"
                              color="blue.500"
                              size="md"
                            />
                          ) : (
                            `${priceAsTON} TON`
                          )}
                        </Text>
                      </Button>
                    )}
                    {payOption === PayOption.NONE && (
                      <Button
                        w={"full"}
                        maxW={624}
                        h={"65px"}
                        colorScheme="blue"
                        bgColor={"#0380FF"}
                        isDisabled={true}
                        fontSize={24} fontWeight={600}
                      >
                        Insufficient Balance
                      </Button>
                    )}
                  </Center>
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
                      setSellGemModalStatus({
                        isOpen: true,
                        tokenID: gemItem[0]?.tokenID,
                      });
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
                    onClick={() =>
                      burnSellGemModalStatus({
                        isOpen: true,
                        tokenID: gemItem[0]?.tokenID,
                      })
                    }
                    border={"1px solid #0380FF"}
                    _hover={{ bgColor: "#111111" }}
                  >
                    Burn
                  </Button>
                </Flex>
              ) : (
                ""
              )
            ) : (
              <Button
                w={"full"}
                maxW={624}
                h={"65px"}
                colorScheme="blue"
                bgColor={"#0380FF"}
                onClick={() => {
                  handleClick(true);
                }}
                fontSize={18}
                fontWeight={600}
                alignItems={"center"}
                columnGap={2}
                rounded={8}
              >
                <Image src={WalletIcon} width={22} height={23} alt="wallet" />
                Connect Wallet
              </Button>
            )}
          </Flex>
        </Flex>

        <Flex w={"100%"} mt={10} columnGap={6} flexGrow={1} h={"fit-content"}>
          <Box w={"100%"} h={"100%"} bgColor={"#191A22"} rounded={16} />
          <Box w={"100%"} h={"100%"} bgColor={"#191A22"} rounded={16} />
        </Flex>
      </Flex>
    )
  );
};

export default GemItemView;
