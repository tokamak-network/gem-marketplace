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
import { settingsContainerStatus } from "@/recoil/settings/atoms";

const Settings = () => {
  const [isOpen, setOpen] = useRecoilState(settingsContainerStatus);
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
          <Text fontFamily={theme.fonts.Inter} fontSize={24} fontWeight={600}>
            Settings
          </Text>
        </DrawerHeader>

        <DrawerBody p={0}>
        </DrawerBody>

        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Settings;
