import Image from "next/image";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Flex,
  Text,
  Button,
  Center,
} from "@chakra-ui/react";

import {
  forgeConfirmModalStatus,
  forgeSuccessModalStatus,
  selectedForgeGem,
  selectedForgeGems,
  selectedFinalForge
} from "@/recoil/forge/atom";
import { useRecoilState } from "recoil";

import ForgeIcon from "@/assets/icon/forge.svg";
import GemcardCarousel from "../common/GemcardCarousel";
import { RarityType } from "@/types";

const ForgeConfirmModal = () => {
  const [isForgeConfirm, setForgeConfirm] = useRecoilState(
    forgeConfirmModalStatus
  );
  const [, setForgeSuccess] = useRecoilState(forgeSuccessModalStatus);
  const [, setForgeGems] = useRecoilState(selectedForgeGem);
  const [, setSelectedGemsInfo] = useRecoilState(selectedForgeGems);
  const [finalForgeGem, setFinalForgeGem] = useRecoilState(selectedFinalForge);

  return (
    <Modal
      isOpen={isForgeConfirm}
      onClose={() => {
        setForgeConfirm(false);
        setSelectedGemsInfo({
          selectedRarity: RarityType.NONE,
          selectedGemsList: [],
        });
        setFinalForgeGem({color: []});
      }}
      size={"xl"}
      isCentered
    >
      <ModalOverlay />
      <ModalContent bgColor={"#21232D"}>
        <ModalCloseButton />
        <ModalBody padding={0}>
          <Flex flexDir={"column"} p={"37px 30px 44px 30px"}>
            <Text fontWeight={700} fontSize={48} textAlign={"center"}>
              Select Gem
            </Text>

            <GemcardCarousel />

            <Text mt={"30px"} fontSize={18} textAlign={"center"}>
              Select 1 of these Gems to Forge.
            </Text>

            <Center columnGap={4} mt={9}>
              <Button
                w={183}
                h={65}
                rounded={8}
                bgColor={"#0380FF"}
                colorScheme="blue"
                fontWeight={600}
                fontSize={24}
                columnGap={2}
                isDisabled={finalForgeGem.color.length === 0}
                _disabled={{bgColor: "#5C5C5C", _hover:{bgColor: "#5C5C5C"}, cursor:"not-allowed"}}
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
