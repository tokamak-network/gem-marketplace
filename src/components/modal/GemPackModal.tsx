import Image from "next/image";
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
  Button,
} from "@chakra-ui/react";
import GemPack from "@/assets/images/sample_gem.png";

interface GemPackModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const GemPackModal = (props: GemPackModalProps) => {
  const { isOpen, onClose } = props;
  const theme = useTheme();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"4xl"} isCentered>
        <ModalOverlay />
        <ModalContent bgColor={"#21232D"} w={906} h={581}>
          <ModalCloseButton />
          <ModalBody padding={0}>
            <Flex h={"100%"}>
              <Center
                w={"100%"}
                h={"100%"}
                bgRepeat={"no-repeat"}
                bgSize={"cover"}
                bgImage={"/assets/image/gempack.png"}
              >
                <Image alt="gem" src={GemPack} width={400} height={400} />
              </Center>
              <Flex w={"100%"} flexDir={"column"} p={26}>
                <Text
                  fontWeight={700}
                  fontSize={48}
                  textTransform={"uppercase"}
                >
                  gem pack
                </Text>
                <Text
                  fontSize={28}
                  fontWeight={400}
                  fontFamily={theme.fonts.Inter}
                  lineHeight={"34.57px"}
                  mt={3}
                >
                  Obtain 1 Gem ranging from Base up to Legendary!
                </Text>

                <Text mt={8} fontSize={14} fontWeight={400} lineHeight={"21px"}>
                  Each Gem boasts a unique shape and a vibrant palette of colors
                  ranging from deep blues to fiery hues. <br />
                  <br />
                  Their one-of-a-kind nature, ensuring every acquisition is a
                  treasure unlike any other.
                </Text>

                <Button
                  w={"100%"}
                  h={"84px"}
                  mt={"auto"}
                  bgColor={"#0380FF"}
                  rounded={16}
                ></Button>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GemPackModal;
