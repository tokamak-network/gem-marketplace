import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
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

import WSTONIcon from "@/assets/icon/wswton.svg";
import WalletIcon from "@/assets/icon/wallet.svg";
import StarIcon from "@/assets/icon/star.svg";
import ColorIcon from "@/assets/icon/color.svg";
import CooldownIcon from "@/assets/icon/cooldown.svg";
import MiningIcon from "@/assets/icon/mine.svg";
import forgeIcon from "@/assets/icon/forge.svg";
import SavedIcon from "./SavedIcon";
import ShareIcon from "@/assets/icon/share.svg";
import { useGetAllGems } from "@/hooks/useGetMarketGems";
import { colorList, colorNameList, rarityList } from "@/constants/rarity";
import { useBuyGem } from "@/hooks/useBuyGem";
import {
  MARKETPLACE_ADDRESS,
  TON_ADDRESS_BY_CHAINID,
  WSWTON_ADDRESS_BY_CHAINID,
} from "@/constants/tokens";
import { handleApprove, useTonORWSTONApprove } from "@/hooks/useApprove";
import { useApproval } from "@/hooks/useApproval";
import { useWaitForTransaction } from "@/hooks/useWaitTxReceipt";
import { cooldownStatus } from "@/recoil/mine/atom";
import { cooldownIndex } from "@/constants";

interface ItemProps {
  id: number;
  mode: CardType;
}

const GemItemView = ({ id, mode }: ItemProps) => {
  const gemList = useGetAllGems();
  const { connectToWallet } = useConnectWallet();
  const { isConnected, address, chain } = useAccount();
  const [, setModalStatus] = useRecoilState(obtainModalStatus);
  const [, setSellGemModalStatus] = useRecoilState(sellGemModalStatus);
  const [, burnSellGemModalStatus] = useRecoilState(burnGemModalStatus);
  const [stakingIndex] = useRecoilState(StakingIndex);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [cooldowns] = useRecoilState(cooldownStatus);
  const { waitForTransactionReceipt } = useWaitForTransaction();

  const gemItem: GemStandard[] = useMemo(
    () =>
      gemList?.filter(
        (item: GemStandard) => Number(item.tokenID) === Number(id)
      ),
    [gemList]
  );

  const cooldownTime = useMemo(() => {
    const baseValue = cooldowns[cooldownIndex[Number(gemItem[0]?.rarity)]];
    if (baseValue / (3600 * 24) > 0) {
      if (baseValue % (3600 * 24) === 0)
        return `${baseValue / (3600 * 24)} days`;
      else {
        return `${baseValue / (3600 * 24)} days ${baseValue % (3600 * 24)} hours`;
      }
    } else {
      return `${baseValue % (3600 * 24)} hours`;
    }
  }, [cooldowns, gemItem, cooldownIndex]);

  const WSTONBalance = useBalance({
    address: address,
    token: WSWTON_ADDRESS_BY_CHAINID[chain?.id!] as `0x${string}`,
  });

  const payOption = useMemo(
    () =>
      Number(formatUnits(WSTONBalance?.data?.value! ?? "0", 27)) >
      Number(formatUnits(gemItem ? gemItem[0].value! : BigInt("0"), 27)),

    [WSTONBalance, gemItem]
  );

  const { callBuyGem, isPending, isSuccess, error } = useBuyGem({
    tokenID: id,
    payWithWSTON: payOption,
  });

  const contract_address = useMemo(
    () =>
      payOption
        ? (WSWTON_ADDRESS_BY_CHAINID[chain?.id!] as `0x${string}`)
        : (TON_ADDRESS_BY_CHAINID[chain?.id!] as `0x${string}`),
    [payOption]
  );

  const decimals = useMemo(() => (payOption ? 27 : 18), [payOption]);

  const allowance = useApproval(contract_address, decimals);

  const {
    callApprove,
    isSuccess: approveSuccess,
    isPending: isPendingApproval,
  } = useTonORWSTONApprove(
    payOption
      ? gemItem
        ? gemItem[0]?.value!
        : BigInt("0")
      : BigInt(formatUnits(gemItem ? gemItem[0]?.value! : BigInt("0"), 9)),
    contract_address
  );

  const handleClick = useCallback(async () => {
    !isConnected && connectToWallet();
    try {
      setLoading(true);
      const txHash = await handleApprove(
        MARKETPLACE_ADDRESS[chain?.id!] as `0x${string}`,
        payOption
          ? (WSWTON_ADDRESS_BY_CHAINID[chain?.id!] as `0x${string}`)
          : (TON_ADDRESS_BY_CHAINID[chain?.id!] as `0x${string}`),
        payOption
          ? gemItem
            ? gemItem[0]?.price!
            : BigInt("0")
          : BigInt(
              parseUnits(
                (
                  Number(
                    formatUnits(gemItem ? gemItem[0]?.price! : BigInt("0"), 27)
                  ) * stakingIndex
                ).toString(),
                18
              )
            )
      );
      await waitForTransactionReceipt(txHash);
      await callBuyGem();
      setLoading(false);
      setModalStatus({ isOpen: true, gemId: gemItem[0].tokenID });
    } catch (e) {
      setLoading(false);
    }
  }, [approveSuccess, payOption]);

  const theme = useTheme();

  return (
    gemItem && (
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
                <Center w={8} h={8} rounded={"8px"} bgColor={"#2A2C3A"}>
                  <SavedIcon width={16} height={16} isFill={false} />
                </Center>

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
                  {gemItem[0]?.color.map((item, key) => (
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
                  {`${formatUnits(gemItem[0].value!, 27)} WSTON`}
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
                  <Center columnGap={"10px"}>
                    {/* {payOption ?  (*/}

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
                        handleClick();
                      }}
                      isDisabled={isLoading}
                    >
                      {!isLoading &&
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
                        {isLoading ? (
                          <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="md"
                          />
                        ) : (
                          `${formatUnits(gemItem[0].price!, 27)} TITANWSTON`
                        )}
                      </Text>
                    </Button>

                    {/*) : (
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
                          handleClick();
                        }}
                        isDisabled={isPending || isPendingApproval}
                      >
                        {!isPending && !isPendingApproval && (
                          <Image
                            alt="ton"
                            src={TonIcon}
                            width={27}
                            height={27}
                          />
                        )}
                        <Text fontSize={24} fontWeight={600}>
                          {isPending || isPendingApproval ? (
                            <Spinner
                              thickness="4px"
                              speed="0.65s"
                              emptyColor="gray.200"
                              color="blue.500"
                              size="md"
                            />
                          ) : (
                            "135 TON"
                          )}
                        </Text>
                      </Button>
                    )} */}
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
                        tokenID: gemItem[0].tokenID,
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
                        tokenID: gemItem[0].tokenID,
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
                  handleClick();
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
