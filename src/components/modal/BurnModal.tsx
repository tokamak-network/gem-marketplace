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
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { waitForTransactionReceipt } from "@wagmi/core";

import {
  burnGemModalStatus,
  meltSuccessModalStatus,
} from "@/recoil/chest/atom";
import { useBurnGem } from "@/hooks/useBurnGem";
import { config } from "@/config/wagmi";

import { decodeEventLog, formatUnits } from "viem";
import { erc20Abi } from "viem";
import { useAccount } from "wagmi";

const BurnGemModal = () => {
  const theme = useTheme();
  const [modalStatus, setModalStatus] = useRecoilState(burnGemModalStatus);
  const [, setMeltSuccessModalStatus] = useRecoilState(meltSuccessModalStatus);
  const { isOpen, tokenID } = modalStatus;
  const { callBurnGem } = useBurnGem({ tokenID });
  const [isLoading, setLoading] = useState<boolean>(false);
  const { chain } = useAccount();

  const handleClose = () => {
    setModalStatus({ isOpen: false, tokenID: 0 });
  };

  const handleMeltGem = async () => {
    try {
      setLoading(true);
      const hash = await callBurnGem();
      const logData = await waitForTransactionReceipt(config, { hash: hash });
      handleClose();
      setMeltSuccessModalStatus({
        isOpen: true,
        txLink:
          chain?.blockExplorers?.default.url + "/tx/" + logData?.transactionHash,
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => handleClose()} size={"xl"} isCentered>
      <ModalOverlay />
      <ModalContent bgColor={"#21232D"} rounded={16}>
        <ModalCloseButton />
        <ModalBody padding={0}>
          <Flex w={"100%"} flexDir={"column"} p={"37px 52px 44px 52px"}>
            <Text fontWeight={700} fontSize={48} textAlign={"center"}>
              Melt Gem
            </Text>

            <Text
              mt={5}
              fontFamily={theme.fonts.Inter}
              fontSize={20}
              textAlign={"center"}
            >
              Melting your gem will completely destroy it and will transfer it’s
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
                onClick={() => handleMeltGem()}
              >
                {isLoading ? (
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="md"
                  />
                ) : (
                  "Melt"
                )}
              </Button>
            </Center>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BurnGemModal;
