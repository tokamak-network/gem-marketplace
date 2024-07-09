import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Text,
  useTheme,
} from "@chakra-ui/react";

import { useRecoilState } from "recoil";
import { activityContainerStatus } from "@/recoil/activity/atom";
import ActivityFilterBar from "@/components/activity/ActivityFilterBar";
import NoActivityContainer from "@/components/activity/NoActivityAlert";

import AccountStatus from "./AccountStatus";

const ActivityContainer = () => {
  const [isOpen, setOpen] = useRecoilState(activityContainerStatus);
  const theme = useTheme();

  return (
    <Drawer
      size={"sm"}
      isOpen={isOpen}
      placement="left"
      onClose={() => setOpen(false)}
    >
      <DrawerOverlay ml={243} />
      <DrawerContent
        sx={{ width: "375px!important" }}
        ml={243}
        bgColor={"#0D0E16"}
        py={46}
        px={30}
      >
        <DrawerHeader p={0}>
          <AccountStatus/>

          <Text fontFamily={theme.fonts.Inter} fontSize={24} fontWeight={600}>
            Activity
          </Text>
          <ActivityFilterBar />
        </DrawerHeader>

        <DrawerBody p={0}>
          <NoActivityContainer />
        </DrawerBody>

        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ActivityContainer;
