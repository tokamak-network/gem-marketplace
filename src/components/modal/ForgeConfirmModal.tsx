import Image from "next/image";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Flex,
  Text,
  useTheme,
  Button,
  Center,
} from "@chakra-ui/react";

import {
  forgeConfirmModalStatus,
  forgeSuccessModalStatus,
  selectedForgeGem,
} from "@/recoil/forge/atom";
import { useRecoilState } from "recoil";

import ForgeIcon from "@/assets/icon/forge.svg";
import GemcardCarousel from "../common/GemcardCarousel";

const ForgeConfirmModal = () => {
  const [isForgeConfirm, setForgeConfirm] = useRecoilState(
    forgeConfirmModalStatus
  );
  const [, setForgeSuccess] = useRecoilState(forgeSuccessModalStatus);
  const [, setForgeGems] = useRecoilState(selectedForgeGem);
  const theme = useTheme();

  return (
    <Modal
      isOpen={isForgeConfirm}
      onClose={() => setForgeConfirm(false)}
      size={"xl"}
      isCentered
    >
      <ModalOverlay />
      <ModalContent bgColor={"#21232D"}>
        <ModalCloseButton />
        <ModalBody padding={0}>
          <Flex w={"100%"} flexDir={"column"} p={"37px 52px 44px 52px"}>
            <Text
              fontWeight={700}
              fontSize={48}
              textAlign={"center"}
            >
              Select Gem
            </Text>

            <GemcardCarousel />

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
                onClick={() => {
                  setForgeConfirm(false);
                  setForgeSuccess(true);
                  setForgeGems({
                    firstSelectedGem: null,
                    secondSelectedGem: null,
                  });
                }}
              >
                <Image width={23} height={23} alt="forge" src={ForgeIcon} />
                <Text>Forge</Text>
              </Button>
            </Center>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ForgeConfirmModal;
