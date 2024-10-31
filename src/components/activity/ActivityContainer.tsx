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
import { formatUnits, parseUnits } from "viem";
import commafy from "@/utils/trim/commafy";
import { useAccount } from "wagmi";

const ActivityContainer = () => {
  const { address } = useAccount();
  const [isOpen, setOpen] = useRecoilState(activityContainerStatus);
  const theme = useTheme();
  const txHistory = useFilterActivity();
  const dateGroupedHistory = useMemo(
    () => groupAndSortByDate(txHistory),
    [txHistory]
  );

  console.log("dategroup", dateGroupedHistory);

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

        <DrawerBody p={0}>
          {txHistory && txHistory.length > 0 ? (
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
                      <span
                        style={{ color: "#0075FF" }}
                      >{` Gem #${item.tradeType === "forged" ? item.newId : item.gemIds[0]} `}</span>
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
