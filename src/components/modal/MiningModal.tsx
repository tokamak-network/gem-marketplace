import Image from "next/image";
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Flex,
  Center,
  Text,
  useTheme,
  Checkbox,
  Button,
} from "@chakra-ui/react";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRecoilState } from "recoil";
import { miningModalStatus } from "@/recoil/mine/atom";

import Mining from "@/assets/images/mining.png";

const MiningModal = () => {
  const [mineModalStatus, setMineModalStatus] =
    useRecoilState(miningModalStatus);
  const [isChecked, setChecked] = useState(false);
  const theme = useTheme();
  const [storageValue, setValue] = useLocalStorage("mining-detail", true);
  const handleClose = () => {
    if (isChecked) setValue(false);
    setMineModalStatus({ isOpen: false });
  };


  return (
    <Modal
      isOpen={mineModalStatus.isOpen && storageValue}
      onClose={() => handleClose()}
      size={"xl"}
      isCentered
    >
      <ModalOverlay />
      <ModalContent bgColor={"#21232D"} rounded={16}>
        <ModalCloseButton />
        <ModalBody padding={0}>
          <Flex w={"100%"} flexDir={"column"} p={"37px 52px 52px 52px"}>
            <Text
              fontWeight={700}
              fontSize={48}
              textAlign={"center"}
              textTransform={"uppercase"}
            >
              mining...
            </Text>

            <Text
              mt={6}
              fontFamily={theme.fonts.Inter}
              fontSize={28}
              fontWeight={400}
              lineHeight={"34.57px"}
              textAlign={"center"}
            >
              {`Mining takes some time, come back in ${mineModalStatus.mineTime}`}
            </Text>

            <Center>
              <Image alt="mining" src={Mining} />
            </Center>

            <Center>
              <Checkbox
                fontSize={14}
                fontWeight={400}
                isChecked={isChecked}
                onChange={() => setChecked((prev) => !prev)}
              >
                Don’t show this again.
              </Checkbox>
            </Center>

            <Button
              pos={"absolute"}
              bottom={22}
              right={22}
              w={9}
              bg={"transparent"}
              color={"white"}
              fontWeight={400}
              fontSize={14}
              _hover={""}
              _active={""}
              onClick={() => handleClose()}
            >
              Okay
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MiningModal;
