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
  Checkbox,
  Button,
} from "@chakra-ui/react";
import GemPack from "@/assets/images/sample_gem.png";
import ArrorRight from "@/assets/icon/right_arrow.svg";
import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const MiningIntroModal = (props: any) => {
  const { isOpen, onClose } = props;
  const [isChecked, setChecked] = useState(false);
  const theme = useTheme();
  const [, setValue] = useLocalStorage("mineIntro", true);
  const handleClose = () => {
    if (isChecked) setValue(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size={"xl"} isCentered>
      <ModalOverlay />
      <ModalContent bgColor={"#21232D"}>
        <ModalCloseButton />
        <ModalBody padding={0}>
          <Flex w={"100%"} flexDir={"column"} p={"52px"}>
            <Text
              fontWeight={700}
              fontSize={48}
              textAlign={"center"}
              textTransform={"uppercase"}
            >
              mining
            </Text>

            <Text
              mt={6}
              fontFamily={theme.fonts.Inter}
              fontSize={28}
              fontWeight={400}
              lineHeight={"34.57px"}
              textAlign={"center"}
            >
              Mine once per day to obtain more gems to forge!
            </Text>

            <Text mt={8} fontSize={14} fontWeight={400} lineHeight={"21px"}>
              Each Gem boasts a unique shape and a vibrant palette of colors
              ranging from deep blues to fiery hues. <br />
              <br />
              Their one-of-a-kind nature, ensuring every acquisition is a
              treasure unlike any other.
            </Text>

            <Center>
              <Image alt="gempack" src={GemPack} width={160} />
              <Image alt="arrow" src={ArrorRight} width={50} />
              <Image alt="gempack" src={GemPack} width={160} />
            </Center>

            <Center mt={4}>
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
              onClick={() => onClose()}
            >
              Okay
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MiningIntroModal;
