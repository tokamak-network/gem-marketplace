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
  Link,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { meltSuccessModalStatus } from "@/recoil/chest/atom";

const MeltSuccessModal = () => {
  const theme = useTheme();
  const [modalStatus, setModalStatus] = useRecoilState(meltSuccessModalStatus);
  const handleClose = () => {
    setModalStatus({ isOpen: false, txLink: "" });
  };

  return (
    <Modal isOpen={modalStatus.isOpen} onClose={() => handleClose()} size={"xl"} isCentered>
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
              Your gem was melted and you received your
            </Text>
            <Link
              textAlign={"center"}
              fontFamily={theme.fonts.Inter}
              fontSize={20}
              href={modalStatus.txLink}
              target="_blank"
              textDecoration={"underline"}
              textUnderlineOffset={4}
            >
              staked TON
              <ExternalLinkIcon ml={2}/>
            </Link>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MeltSuccessModal;
