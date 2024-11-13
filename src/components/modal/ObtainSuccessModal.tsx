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
import { useMemo } from "react";

import { useRecoilState } from "recoil";
import { obtainModalStatus } from "@/recoil/market/atom";

import GemCard from "../common/GemCard";

import { GemStandard, RarityType } from "@/types";
import { useGetGemWithId } from "@/hooks/useGetMarketGems";

import ForgeIcon from "@/assets/icon/forge.svg";
import GemIcon from "@/assets/icon/mine.svg";
import { rarityList } from "@/constants/rarity";
import GemAttributesView from "../common/GemAttributesView";

const ObtainSuccessModal = () => {
  const router = useRouter();
  const [modalStatus, setModalStatus] = useRecoilState(obtainModalStatus);
  const gemList = useGetGemWithId(Number(modalStatus.gemId!));

  const handleClose = () => {
    setModalStatus({ isOpen: false });
  };

  const gemItem: GemStandard = useMemo(() => {
    return gemList && gemList[0] && gemList.length > 0
      ? gemList[0]
      : {
          tokenID: 0,
          quadrants: [1, 1, 1, 1],
          color: [1],
          value: BigInt("0"),
          price: BigInt("0"),
          rarity: RarityType.common,
        };
  }, [gemList]);

  return (
    <Modal isOpen={modalStatus.isOpen} onClose={() => handleClose()} isCentered>
      <ModalOverlay />
      <ModalContent
        bgColor={"#21232D"}
        rounded={16}
        minW={"920px"}
        minH={"580px"}
      >
        <ModalCloseButton />
        <ModalBody padding={0}>
          <Flex>
            {gemItem && (
              <GemCard
                mode="normal"
                width={453}
                height={620}
                staked={128.2907}
                rarityScore={10}
                gemInfo={gemItem}
                dailyChange={16.7}
                gemWidth={316}
                gemHeight={316}
              />
            )}
            <Flex
              w={"100%"}
              flexDir={"column"}
              justify={"space-between"}
              p={"20px 26px 30px 26px"}
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
                  mt={6}
                  fontSize={16}
                  fontWeight={400}
                  lineHeight={"34.57px"}
                  textAlign={"center"}
                >
                  Take your newly acquired gem and start mining or forging
                </Text>
                <Box px={"30px"}>
                  <GemAttributesView gemItem={gemItem} />
                </Box>
              </Box>

              <Center columnGap={4}>
                {rarityList[Number(gemItem.rarity)] !== RarityType.common &&
                  gemItem.miningTry! > 0 && (
                    <Button
                      w={"180px"}
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
                  )}
                {rarityList[Number(gemItem.rarity)] !== RarityType.mythic && (
                  <Button
                    w={"180px"}
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
                )}
              </Center>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ObtainSuccessModal;
