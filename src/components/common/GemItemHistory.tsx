import { useAccount } from "wagmi";
import { useGetTransactionHistory } from "@/hooks/useGetMarketGems";
import { SupportedChainId } from "@/types/network/supportedNetworks";
import { groupAndSortByDate } from "@/utils";
import { Box, Flex, Text, Link } from "@chakra-ui/react";
import { useMemo } from "react";
import Image from "next/image";

import Market from "@/assets/icon/market.svg";
import Forge from "@/assets/icon/forge.svg";
import Mine from "@/assets/icon/mine.svg";
import { FACTORY_ADDRESS } from "@/constants/tokens";
import commafy from "@/utils/trim/commafy";
import { formatUnits } from "viem";
import NoActivityContainer from "../activity/NoActivityAlert";

const GemItemHistory = ({ gemId }: { gemId: number }) => {
  const { address, chain } = useAccount();
  const tradeHistory = useGetTransactionHistory();
  const filteredHistory = useMemo(
    () =>
      tradeHistory?.filter(
        (item: any) =>
          item?.gemIds?.includes(gemId.toString()) ||
          item.newId === gemId.toString()
      ),
    [tradeHistory]
  );

  const dateGroupedHistory = useMemo(
    () => groupAndSortByDate(filteredHistory),
    [filteredHistory]
  );

  return (
    <Box w={"100%"} h={"100%"} p={9} bgColor={"#191A22"} rounded={16}>
      {filteredHistory?.length > 0 && (
        <Text fontWeight={600} fontSize={18}>
          History
        </Text>
      )}
      {(filteredHistory &&
        filteredHistory?.length > 0 &&
        chain?.id === SupportedChainId.TITAN_SEPOLIA) ||
      chain?.id === SupportedChainId.THANOS_SEPOLIA ? (
        dateGroupedHistory?.map((groupItem, key) => (
          <Flex flexDir={"column"} rowGap={"6px"} mt={6} key={key}>
            <Text fontSize={12} color={"#FFFFFF80"}>
              {groupItem.date}
            </Text>

            {groupItem.items.map((item: any, key: number) => (
              <Flex key={key} fontSize={14} align={"center"}>
                <Box mr={3}>
                  <Image
                    width={12}
                    height={12}
                    src={
                      item.tradeType === "purchased" ||
                      item.tradeType === "listed" ||
                      item.tradeType === "unlisted"
                        ? Market
                        : item.tradeType === "mined"
                          ? Mine
                          : item.tradeType === "forged"
                            ? Forge
                            : ""
                    }
                    alt=""
                  />
                </Box>
                <Text textTransform={"capitalize"} mr={1}>
                  {item.payer === address && item.tradeType === "purchased"
                    ? "Purchased"
                    : item.trader === address && item.tradeType === "purchased"
                      ? "Sold"
                      : item.tradeType}
                </Text>
                <Text>
                  {item.tradeType === "forged" ? (
                    <span style={{ color: "#0075FF" }}>
                      {item.gemIds?.map((gemId: any, key: number) => (
                        <>
                          <Link
                            _hover={{ textDecoration: "underline" }}
                            href={
                              chain?.blockExplorers?.default.url +
                              "/tx/" +
                              item.txHash
                            }
                            target="_blank"
                          >
                            Gem #{gemId}{" "}
                          </Link>
                          <span style={{ color: "white" }}>
                            {key === Number(item.gemIds?.length - 1)
                              ? "= "
                              : "+ "}{" "}
                          </span>
                        </>
                      ))}
                      <Link
                        _hover={{ textDecoration: "underline" }}
                        href={
                          chain?.blockExplorers?.default.url +
                          "/tx/" +
                          item.txHash
                        }
                        target="_blank"
                      >
                        Gem #{item.newId}
                      </Link>
                    </span>
                  ) : (
                    <Link
                      _hover={{ textDecoration: "underline" }}
                      href={
                        chain?.blockExplorers?.default.url +
                        "/tx/" +
                        item.txHash
                      }
                      target="_blank"
                      style={{ color: "#0075FF" }}
                    >{` Gem #${item.gemIds[0]} `}</Link>
                  )}
                  {item.tradeType === "purchased" || item.tradeType === "listed"
                    ? `for ${commafy(formatUnits(item.value ?? BigInt(0), 27), 2)} WSTON`
                    : ""}
                </Text>
              </Flex>
            ))}
          </Flex>
        ))
      ) : (
        <NoActivityContainer />
      )}
    </Box>
  );
};

export default GemItemHistory;
