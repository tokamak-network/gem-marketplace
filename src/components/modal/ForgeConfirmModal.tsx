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
              textTransform={"uppercase"}
            >
              forging
            </Text>

            <Text
              mt={6}
              fontFamily={theme.fonts.Inter}
              fontSize={28}
              fontWeight={400}
              lineHeight={"34.57px"}
              textAlign={"center"}
            >
              Combine two gems to obtain a higher quality Gem.
            </Text>

            <Text
              fontFamily={theme.fonts.Inter}
              mt={14}
              fontSize={20}
              fontWeight={400}
              textAlign={"center"}
              lineHeight={"24px"}
            >
              Forging burns your two gems in order to mint a newer gem with
              higher quality and value.
            </Text>

            <Center columnGap={4} mt={57}>
              {/* <Button
                w={183}
                h={65}
                colorScheme="alpha"
                border={"2px solid #0380FF"}
                rounded={8}
                fontSize={24}
                fontWeight={600}
                onClick={() => setForgeConfirm(false)}
              >
                Cancel
              </Button> */}
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
