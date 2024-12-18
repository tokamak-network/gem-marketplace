import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import {
  Box,
  Button,
  Center,
  Flex,
  Text,
  Spinner,
  useToast,
  Tooltip,
} from "@chakra-ui/react";

import { CardType, GemStandard, RarityType, TokenType } from "@/types";
import GemCard from "@/components/common/GemCard";
import { obtainModalStatus, StakingIndex } from "@/recoil/market/atom";
import { useRecoilState } from "recoil";
import { formatUnits, parseUnits } from "viem";
import { useRouter } from "next/router";

import { sellGemModalStatus, burnGemModalStatus } from "@/recoil/chest/atom";

import useConnectWallet from "@/hooks/account/useConnectWallet";
import { useUnlistGem } from "@/hooks/useListGem";

import { useGetGemWithId } from "@/hooks/useGetMarketGems";
import { buyGem } from "@/hooks/useBuyGem";
import {
  MARKETPLACE_ADDRESS,
  TON_ADDRESS_BY_CHAINID,
  WSWTON_ADDRESS_BY_CHAINID,
} from "@/constants/tokens";
import { handleApprove } from "@/hooks/useApprove";
import { useWaitForTransaction } from "@/hooks/useWaitTxReceipt";
import { TON_FEES_RATE_DIVIDER } from "@/constants";
import copy from "copy-to-clipboard";

import { getTonFeesRate } from "@/utils";
import GemAttributesView from "./GemAttributesView";
import GemItemHistory from "./GemItemHistory";
import GemItemDetails from "./GemItemDetails";

import WSTONIcon from "@/assets/icon/wswton.svg";
import WalletIcon from "@/assets/icon/wallet.svg";
import ShareIcon from "@/assets/icon/share.svg";
import TonIcon from "@/assets/icon/ton.svg";
import Warning from "@/assets/icon/warningYellow.svg";
import { useBalancePrice } from "@/hooks/useBalancePrice";
import { ArrowBackIcon } from "@chakra-ui/icons";
import GemMiningAlert from "../tooltipLabel/GemMiningAlert";

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
  const gemList = useGetGemWithId(id);
  const { connectToWallet } = useConnectWallet();
  const { isConnected, address, chain } = useAccount();
  const { callUnlistGem } = useUnlistGem({ tokenID: id });
  const [, setModalStatus] = useRecoilState(obtainModalStatus);
  const [, setSellGemModalStatus] = useRecoilState(sellGemModalStatus);
  const [, burnSellGemModalStatus] = useRecoilState(burnGemModalStatus);
  const [stakingIndex] = useRecoilState(StakingIndex);
  const [isWSTONLoading, setWSTONLoading] = useState<boolean>(false);
  const [isTONLoading, setTONLoading] = useState<boolean>(false);
  const { waitForTransactionReceipt } = useWaitForTransaction();
  const [tonFeesRate, setTonFeesRate] = useState<number>();
  const toast = useToast();
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);

  const gemItem: GemStandard = useMemo(() => {
    return gemList && gemList[0] && gemList.length > 0
      ? gemList[0]
      : {
          tokenID: 0,
          quadrants: [1, 1, 1, 1],
          color: [1],
          value: BigInt("0"),
          price: BigInt("0"),
          rarity: RarityType.common,
          isMining: false,
        };
  }, [gemList]);

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
      Number(formatUnits(gemItem?.price || BigInt(0), 27)) * stakingIndex +
      (Number(formatUnits(gemItem?.price || BigInt(0), 27)) *
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
    const priceValue = Number(formatUnits(gemItem?.price! || BigInt("0"), 27));
    const requiredTON = priceValue * stakingIndex;

    if (WSTONBalanceValue > priceValue) {
      return TONBalanceValue > requiredTON ? PayOption.BOTH : PayOption.WSTON;
    }
    return TONBalanceValue > requiredTON ? PayOption.TON : PayOption.NONE;
  }, [WSTONBalance, gemItem, TONBalance, stakingIndex]);

  const GemValueUSD = useBalancePrice(
    Number(formatUnits(gemItem?.value!, 27)),
    TokenType.WSTON
  );

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
              ? gemItem?.price!
              : BigInt("0")
            : parseUnits(priceAsTON.toString(), 18)
        );

        await waitForTransactionReceipt(txHash);
        const contract_address = MARKETPLACE_ADDRESS[chain?.id!];
        const buyTx = await buyGem(
          gemItem.tokenID,
          isPayWithWSTON,
          contract_address as `0x${string}`
        );
        await waitForTransactionReceipt(buyTx);

        setWSTONLoading(false);
        setTONLoading(false);
        setModalStatus({ isOpen: true, gemId: gemItem?.tokenID });
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

  const handleUnlistGem = async () => {
    try {
      setLoading(true);
      const hash = await callUnlistGem();
      await waitForTransactionReceipt(hash);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    gemItem && (
      <Flex flexDir={"column"} w={"100%"} h={"100%"}>
        <Flex
          mb={4}
          align={"center"}
          columnGap={1}
          cursor={"pointer"}
          onClick={() => router.push("/" + mode)}
        >
          <ArrowBackIcon />
          <Text textTransform={"capitalize"}>{mode}</Text>
        </Flex>
        <Flex columnGap={"40px"}>
          <GemCard
            mode="normal"
            width={453}
            height={581}
            gemInfo={gemItem}
            gemWidth={316}
            gemHeight={316}
          />
          <Flex w={"full"} flexDir={"column"}>
            <Flex justify={"space-between"}>
              <Text fontWeight={700} fontSize={48} textTransform="capitalize">
                Gem #{gemItem?.tokenID}
              </Text>

              <Flex columnGap={2}>
                {/* <Center w={8} h={8} rounded={"8px"} bgColor={"#2A2C3A"}>
                  <SavedIcon width={16} height={16} isFill={false} />
                </Center> */}

                <Center
                  w={8}
                  h={8}
                  rounded={"8px"}
                  bgColor={"#2A2C3A"}
                  cursor={"pointer"}
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      const protocol = window.location.protocol;
                      const host = window.location.host;
                      const path = router.asPath;
                      copy(`${protocol}//${host}${path}`);

                      toast({
                        title: "URL Copied",
                        status: "success",
                        duration: 2000,
                        isClosable: true,
                        position: "top",
                      });
                    }
                  }}
                >
                  <Image alt="share" src={ShareIcon} width={16} height={16} />
                </Center>
              </Flex>
            </Flex>

            <GemAttributesView gemItem={gemItem} />

            <Text fontSize={14} fontWeight={400} opacity={0.5} mt={2}>
              Backed by
            </Text>
            <Flex align={"end"} columnGap={17} mb={4}>
              <Center columnGap={3}>
                <Image alt="ton" src={WSTONIcon} width={32} height={32} />
                <Text fontSize={32} fontWeight={600}>
                  {`${formatUnits(gemItem?.value!, 27)} TITANWSTON`}
                </Text>
              </Center>

              <Text pb={"6px"} fontSize={14} lineHeight={"30px"} opacity={0.5}>
                ${GemValueUSD}
              </Text>
            </Flex>

            {isConnected ? (
              mode === "market" ? (
                gemItem.isForSale ? (
                  gemItem.owner?.toLowerCase() === address?.toLowerCase() ? (
                    <Button
                      w={"full"}
                      maxW={624}
                      h={"65px"}
                      columnGap={2}
                      alignItems={"center"}
                      justifyContent={"center"}
                      colorScheme="blue"
                      bgColor={"#0380FF"}
                      _disabled={{
                        bgColor: "#21232D",
                      }}
                      _hover={{ bgColor: "none" }}
                      onClick={() => {
                        gemItem.isForSale
                          ? handleUnlistGem()
                          : setSellGemModalStatus({
                              isOpen: true,
                              tokenID: gemItem?.tokenID,
                            });
                      }}
                      isDisabled={gemItem.isMining!}
                    >
                      {isLoading ? (
                        <Spinner
                          thickness="4px"
                          speed="0.65s"
                          emptyColor="gray.200"
                          color="blue.500"
                          size="md"
                        />
                      ) : gemItem.isForSale ? (
                        "Remove Listing"
                      ) : (
                        "Sell"
                      )}
                    </Button>
                  ) : (
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
                        <Box w={"full"}>
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
                            isDisabled={
                              isTONLoading ||
                              isWSTONLoading ||
                              payOption === PayOption.NONE ||
                              payOption === PayOption.TON
                            }
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
                                `${formatUnits(gemItem?.price || BigInt(0), 27)} TITANWSTON`
                              )}
                            </Text>
                          </Button>

                          <Flex mt={3} columnGap={1} h={7}>
                            {(payOption === PayOption.TON ||
                              payOption === PayOption.NONE) && (
                              <>
                                {" "}
                                <Image src={Warning} alt="warning" />
                                <Text fontSize={14} color={"#FFB801"}>
                                  Insufficient TITANWSTON Balance
                                </Text>
                              </>
                            )}
                          </Flex>
                        </Box>

                        <Text pb={10}>or</Text>

                        <Box w={"full"}>
                          <Button
                            w={"full"}
                            maxW={624}
                            h={"65px"}
                            columnGap={2}
                            alignItems={"center"}
                            justifyContent={"center"}
                            colorScheme="blue"
                            bgColor={"transparent"}
                            onClick={() => {
                              handleClick(false);
                            }}
                            border={"2px solid #0380FF"}
                            isDisabled={
                              isWSTONLoading ||
                              isTONLoading ||
                              payOption === PayOption.NONE ||
                              payOption === PayOption.WSTON
                            }
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

                          <Flex mt={3} columnGap={1} h={7}>
                            {(payOption === PayOption.WSTON ||
                              payOption === PayOption.NONE) && (
                              <>
                                {" "}
                                <Image src={Warning} alt="warning" />
                                <Text fontSize={14} color={"#FFB801"}>
                                  Insufficient TON Balance
                                </Text>
                              </>
                            )}
                          </Flex>
                        </Box>
                      </Center>
                    </Box>
                  )
                ) : (
                  <Button
                    w={"full"}
                    maxW={624}
                    h={"65px"}
                    colorScheme="blue"
                    bgColor={"#0380FF"}
                    isDisabled={true}
                    fontSize={24}
                    fontWeight={600}
                  >
                    Not for Sale
                  </Button>
                )
              ) : mode === "chest" ? (
                <Flex w={"100%"} columnGap={6}>
                  <Tooltip
                    hasArrow
                    bgColor={"#000000E5"}
                    isDisabled={!gemItem.isMining}
                    label={<GemMiningAlert />}
                    rounded={4}
                  >
                    <Button
                      w={"full"}
                      maxW={624}
                      h={"65px"}
                      columnGap={2}
                      alignItems={"center"}
                      justifyContent={"center"}
                      colorScheme="blue"
                      bgColor={"#0380FF"}
                      _disabled={{
                        bgColor: "#21232D",
                      }}
                      _hover={{ bgColor: "none" }}
                      onClick={() => {
                        gemItem.isForSale
                          ? handleUnlistGem()
                          : setSellGemModalStatus({
                              isOpen: true,
                              tokenID: gemItem?.tokenID,
                            });
                      }}
                      isDisabled={gemItem.isMining!}
                    >
                      {isLoading ? (
                        <Spinner
                          thickness="4px"
                          speed="0.65s"
                          emptyColor="gray.200"
                          color="blue.500"
                          size="md"
                        />
                      ) : gemItem.isForSale ? (
                        "Remove Listing"
                      ) : (
                        "Sell"
                      )}
                    </Button>
                  </Tooltip>
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
                        tokenID: gemItem?.tokenID,
                      })
                    }
                    border={"1px solid #0380FF"}
                    _hover={{ bgColor: "#111111" }}
                  >
                    Melt
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
          <GemItemHistory gemId={id} />
          <GemItemDetails gemId={id} owner={gemItem.owner!} />
        </Flex>
      </Flex>
    )
  );
};

export default GemItemView;
