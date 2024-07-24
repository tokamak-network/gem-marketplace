import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Flex,
  Center,
  Text,
  Button,
  useTheme,
} from "@chakra-ui/react";

import { useRecoilState } from "recoil";
import { burnGemModalStatus } from "@/recoil/chest/atom";

const BurnGemModal = () => {
  const theme = useTheme();
  const [modalStatus, setModalStatus] = useRecoilState(burnGemModalStatus);
  const handleClose = () => {
    setModalStatus(false);
  };

  return (
    <Modal
      isOpen={modalStatus}
      onClose={() => handleClose()}
      size={"xl"}
      isCentered
    >
      <ModalOverlay />
      <ModalContent bgColor={"#21232D"} rounded={16}>
        <ModalCloseButton />
        <ModalBody padding={0}>
          <Flex w={"100%"} flexDir={"column"} p={"37px 52px 44px 52px"}>
            <Text fontWeight={700} fontSize={48} textAlign={"center"}>
              Burn Gem
            </Text>

            <Text
              mt={5}
              fontFamily={theme.fonts.Inter}
              fontSize={20}
              textAlign={"center"}
            >
              Burning your gem will completely destroy it and will transfer it’s
              Staked Ton value to you.
            </Text>

            <Center mt={57}>
              <Button
                w={153}
                h={65}
                rounded={8}
                bgColor={"#0380FF"}
                colorScheme="blue"
                fontWeight={600}
                fontSize={24}
                columnGap={2}
              >
                Burn
              </Button>
            </Center>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BurnGemModal;
