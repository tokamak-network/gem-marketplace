import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Text,
  useTheme,
  Flex,
  Box,
  Link,
  textDecoration,
} from "@chakra-ui/react";

import { useRecoilState } from "recoil";
import { activityContainerStatus } from "@/recoil/activity/atom";
import ActivityFilterBar from "@/components/activity/ActivityFilterBar";
import NoActivityContainer from "@/components/activity/NoActivityAlert";

import AccountStatus from "./AccountStatus";
import { useFilterActivity } from "@/hooks/account/useFilterActivity";
import { groupAndSortByDate } from "@/utils";
import { useMemo } from "react";

import Market from "@/assets/icon/market.svg";
import Forge from "@/assets/icon/forge.svg";
import Mine from "@/assets/icon/mine.svg";
import Image from "next/image";
import { formatUnits } from "viem";
import commafy from "@/utils/trim/commafy";
import { useAccount } from "wagmi";
import { FACTORY_ADDRESS } from "@/constants/tokens";
import { useCheckChain } from "@/hooks/useCheckChain";
import { SupportedChainId } from "@/types/network/supportedNetworks";

const ActivityContainer = () => {
  const { address, chain } = useAccount();
  const [isOpen, setOpen] = useRecoilState(activityContainerStatus);
  const theme = useTheme();
  const txHistory = useFilterActivity();
  const dateGroupedHistory = useMemo(
    () => groupAndSortByDate(txHistory),
    [txHistory]
  );
  const { isSupportedChain } = useCheckChain();

  return (
    <Drawer
      size={"sm"}
      isOpen={isOpen}
      placement="left"
      onClose={() => setOpen(false)}
    >
      <DrawerOverlay ml={243} />
      <DrawerContent
        sx={{ width: "400px!important" }}
        ml={243}
        bgColor={"#0D0E16"}
        py={46}
        px={30}
      >
        <DrawerHeader p={0}>
          <AccountStatus />

          <Text fontFamily={theme.fonts.Inter} fontSize={24} fontWeight={600}>
            Activity
          </Text>
          <ActivityFilterBar />
        </DrawerHeader>

        <DrawerBody
          p={0}
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#1E2033",
              borderRadius: "24px",
            },
          }}
        >
          {txHistory &&
          txHistory.length > 0 &&
          chain?.id === SupportedChainId.TITAN_SEPOLIA ? (
            dateGroupedHistory?.map((groupItem, key) => (
              <Flex flexDir={"column"} rowGap={"20px"} mt={"30px"}>
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
                          item.tradeType === "listed"
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
                        : item.trader === address &&
                            item.tradeType === "purchased"
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
                                  "/token/" +
                                  FACTORY_ADDRESS[chain?.id!] +
                                  "/instance/" +
                                  gemId
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
                              "/token/" +
                              FACTORY_ADDRESS[chain?.id!] +
                              "/instance/" +
                              item.newId
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
                            "/token/" +
                            FACTORY_ADDRESS[chain?.id!] +
                            "/instance/" +
                            item.gemIds[0]
                          }
                          target="_blank"
                          style={{ color: "#0075FF" }}
                        >{` Gem #${item.gemIds[0]} `}</Link>
                      )}
                      {item.tradeType === "purchased" ||
                      item.tradeType === "listed" ||
                      item.tradeType === "unlisted"
                        ? `for ${commafy(formatUnits(item.value, 27), 2)} WSTON`
                        : ""}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            ))
          ) : (
            <NoActivityContainer />
          )}
        </DrawerBody>

        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ActivityContainer;
