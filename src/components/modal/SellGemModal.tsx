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
  Input,
} from "@chakra-ui/react";

import { useState } from "react";
import { useRecoilState } from "recoil";
import { sellGemModalStatus } from "@/recoil/chest/atom";

const SellGemModal = () => {
  const theme = useTheme();
  const [modalStatus, setModalStatus] = useRecoilState(sellGemModalStatus);
  const handleClose = () => {
    setModalStatus(false);
  };
  const [inputValue, setInputValue] = useState("0.00");

  const handleInput = (e: any) => {
    const value = e.target.value;
    setInputValue(value.substring(0, value.length - 4));
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
              Sell Gem
            </Text>

            <Text
              mt={5}
              fontFamily={theme.fonts.Inter}
              fontSize={20}
              textAlign={"center"}
            >
              Selling your gem will list it on the marketplace for your
              specified amount. Once someone buys it, you will receive funds.
            </Text>

            <Input
              mt={12}
              w={"100%"}
              h={"90px"}
              rounded={16}
              fontSize={32}
              px={7}
              border={"none"}
              bgColor={"#191A22"}
              value={inputValue + " TON"}
              onChange={(e) => handleInput(e)}
            />

            <Center columnGap={4} mt={57}>
              <Button
                w={139}
                h={65}
                rounded={8}
                bgColor={"#0380FF"}
                colorScheme="blue"
                fontWeight={600}
                fontSize={24}
                columnGap={2}
                _disabled={{ bgColor: "#191A22" }}
                isDisabled={
                  !inputValue || Number(inputValue) === 0 ? true : false
                }
              >
                Sell
              </Button>
            </Center>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SellGemModal;