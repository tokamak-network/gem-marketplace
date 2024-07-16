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
  Box,
} from "@chakra-ui/react";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRecoilState } from "recoil";
import { obtainModalStatus } from "@/recoil/market/atom";

import ForgeIcon from "@/assets/icon/forge.svg";
import GemIcon from "@/assets/icon/mine.svg";
import GemCard from "../common/GemCard";
import { GemList } from "@/constants";

const ObtainSuccessModal = () => {
  const [modalStatus, setModalStatus] = useRecoilState(obtainModalStatus);
  const [isChecked, setChecked] = useState(false);
  const theme = useTheme();
  const [storageValue, setValue] = useLocalStorage("mining-detail", true);
  const handleClose = () => {
    if (isChecked) setValue(false);
    setModalStatus(false);
  };
  const gemItem = GemList[10];

  return (
    <Modal
      isOpen={modalStatus}
      onClose={() => handleClose()}
      size={"4xl"}
      isCentered
    >
      <ModalOverlay />
      <ModalContent bgColor={"#21232D"} rounded={16}>
        <ModalCloseButton />
        <ModalBody padding={0}>
          <Flex>
            <GemCard
              mode="normal"
              width={453}
              height={581}
              staked={128.2907}
              rarityScore={10}
              gemInfo={gemItem}
              dailyChange={16.7}
              gemWidth={316}
              gemHeight={316}
            />
            <Flex w={"100%"} flexDir={"column"} justify={"space-between"} p={"87px 26px 30px 26px"}>
              <Box>
                <Text
                  fontWeight={600}
                  fontSize={48}
                  textAlign={"center"}
                  textTransform={"capitalize"}
                >
                  congrats!
                </Text>

                <Text
                  mt={10}
                  fontSize={20}
                  fontWeight={400}
                  lineHeight={"34.57px"}
                  textAlign={"center"}
                >
                  You just obtained this gem!
                </Text>

                <Text
                  mt={10}
                  fontSize={20}
                  fontWeight={400}
                  lineHeight={"34.57px"}
                  textAlign={"center"}
                >
                  Take your newly acquired gem and start mining or forging
                </Text>
              </Box>

              <Center columnGap={4} mt={57}>
                <Button
                  w={183}
                  h={65}
                  rounded={8}
                  bgColor={"#0380FF"}
                  colorScheme="blue"
                  fontWeight={600}
                  fontSize={24}
                  columnGap={2}
                >
                  <Image width={23} height={23} alt="gem" src={GemIcon} />
                  Mine
                </Button>
                <Button
                  w={183}
                  h={65}
                  rounded={8}
                  bgColor={"#0380FF"}
                  colorScheme="blue"
                  fontWeight={600}
                  fontSize={24}
                  columnGap={2}
                >
                  <Image width={23} height={23} alt="forge" src={ForgeIcon} />
                  <Text>Forge</Text>
                </Button>
              </Center>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ObtainSuccessModal;
