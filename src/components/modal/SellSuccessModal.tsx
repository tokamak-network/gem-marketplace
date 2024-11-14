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
  Button,
  useTheme,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

import { sellSuccessModalStatus } from "@/recoil/chest/atom";
import MarketIcon from "@/assets/icon/market.svg";

const SellSuccessModal = () => {
  const theme = useTheme();
  const [modalStatus, setModalStatus] = useRecoilState(sellSuccessModalStatus);
  const router = useRouter();
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
            <Text fontSize={48} fontWeight={700} textAlign={"center"}>
              Success!
            </Text>
            <Text
              mt={12}
              fontFamily={theme.fonts.Inter}
              fontSize={20}
              textAlign={"center"}
            >
              Your gem is officially listed for sale in the Gem Marketplace!
            </Text>

            <Center columnGap={4} mt={57} fontSize={18}>
              <Button
                w={"full"}
                h={65}
                rounded={8}
                bgColor={"transparent"}
                colorScheme="blue"
                fontWeight={600}
                columnGap={2}
                border={"2px solid #0380FF"}
                onClick={() => {
                  handleClose();
                  router.push("/chest");
                }}
              >
                Back to Chest
              </Button>

              <Button
                w={"full"}
                h={65}
                rounded={8}
                bgColor={"#0380FF"}
                colorScheme="blue"
                fontWeight={600}
                columnGap={2}
                onClick={() => {
                  handleClose();
                  router.push("/market");
                }}
              >
                <Image src={MarketIcon} alt="market" />
                <Text>Market</Text>
              </Button>
            </Center>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SellSuccessModal;
