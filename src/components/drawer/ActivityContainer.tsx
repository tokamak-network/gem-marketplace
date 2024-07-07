import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from "@chakra-ui/react";

import { useRecoilState } from "recoil";
import { activityContainerStatus } from "@/recoil/activity/atom";

const ActivityContainer = () => {
  const [isOpen, setOpen] = useRecoilState(activityContainerStatus);
  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={() => setOpen(false)}
      
    >
      <DrawerOverlay ml={243}/> 
      <DrawerContent ml={243} bgColor={"#0D0E16"}>
        <DrawerCloseButton />
        <DrawerHeader>Create your account</DrawerHeader>

        <DrawerBody>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button colorScheme="blue">Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ActivityContainer;
