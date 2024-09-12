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
  Box,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { useRecoilState } from "recoil";
import { obtainModalStatus } from "@/recoil/market/atom";

import ForgeIcon from "@/assets/icon/forge.svg";
import GemIcon from "@/assets/icon/mine.svg";
import GemCard from "../common/GemCard";
import { GemStandard } from "@/types";
import { useGetAllGems } from "@/hooks/useGetMarketGems";
import { useMemo } from "react";

const ObtainSuccessModal = () => {
  const router = useRouter();
  const [modalStatus, setModalStatus] = useRecoilState(obtainModalStatus);
  const gemList = useGetAllGems();
  const handleClose = () => {
    setModalStatus({ isOpen: false });
  };
  const gemItem = useMemo(
    () =>
      gemList?.filter(
        (item: GemStandard) =>
          Number(item.tokenID) === Number(modalStatus.gemId)
      ),
    [gemList, modalStatus.gemId]
  );
  console.log(gemItem)

  return (
    <Modal
      isOpen={modalStatus.isOpen}
      onClose={() => handleClose()}
      size={"4xl"}
      isCentered
    >
      <ModalOverlay />
      <ModalContent bgColor={"#21232D"} rounded={16}>
        <ModalCloseButton />
        <ModalBody padding={0}>
          <Flex>
            {gemItem && (
              <GemCard
                mode="normal"
                width={453}
                height={581}
                staked={128.2907}
                rarityScore={10}
                gemInfo={gemItem[0]}
                dailyChange={16.7}
                gemWidth={316}
                gemHeight={316}
              />
            )}
            <Flex
              w={"100%"}
              flexDir={"column"}
              justify={"space-between"}
              p={"87px 26px 30px 26px"}
            >
              <Box>
                <Text
                  fontWeight={600}
                  fontSize={48}
                  textAlign={"center"}
                  textTransform={"capitalize"}
                >
                  congrats!
                </Text>

                <Text
                  mt={10}
                  fontSize={20}
                  fontWeight={400}
                  lineHeight={"34.57px"}
                  textAlign={"center"}
                >
                  You just obtained this gem!
                </Text>

                <Text
                  mt={10}
                  fontSize={20}
                  fontWeight={400}
                  lineHeight={"34.57px"}
                  textAlign={"center"}
                >
                  Take your newly acquired gem and start mining or forging
                </Text>
              </Box>

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
                    router.push("/mine");
                    setModalStatus({ isOpen: false });
                  }}
                >
                  <Image width={23} height={23} alt="gem" src={GemIcon} />
                  Mine
                </Button>
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
                    router.push("/forge");
                    setModalStatus({ isOpen: false });
                  }}
                >
                  <Image width={23} height={23} alt="forge" src={ForgeIcon} />
                  <Text>Forge</Text>
                </Button>
              </Center>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ObtainSuccessModal;
