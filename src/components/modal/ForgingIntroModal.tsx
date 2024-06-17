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
import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

import Forge1 from "@/assets/images/forge1.png";
import Forge2 from "@/assets/images/forge2.png";
import Forge3 from "@/assets/images/forge3.png";
import ArrorRight from "@/assets/icon/right_arrow.svg";

const ForgingIntroModal = (props: any) => {
  const { isOpen, onClose } = props;
  const [isChecked, setChecked] = useState(false);
  const theme = useTheme();
  const [, setValue] = useLocalStorage("forgeIntro", true);
  const handleClose = () => {
    if (isChecked) {
      setValue(false);
    } 
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
              Forge gems together to obtain higher quality and rarer gems!
            </Text>

            <Text mt={8} fontSize={14} fontWeight={400} lineHeight={"21px"}>
              Each Gem boasts a unique shape and a vibrant palette of colors
              ranging from deep blues to fiery hues. <br />
              <br />
              Their one-of-a-kind nature, ensuring every acquisition is a
              treasure unlike any other.
            </Text>

            <Flex w={"full"} justify={"space-between"} my={"50px"}>
              <Image alt="gempack" src={Forge1} />
              <Center columnGap={"14px"}>
                <Image alt="gempack" src={Forge2} />
                <Image alt="arrow" src={ArrorRight} />
                <Image alt="gempack" src={Forge3} />
              </Center>
            </Flex>

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

export default ForgingIntroModal;
