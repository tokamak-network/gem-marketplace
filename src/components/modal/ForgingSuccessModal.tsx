import Image from "next/image";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Flex,
  Text,
  Button,
  Center,
} from "@chakra-ui/react";

import {
  forgeSuccessModalStatus,
  selectedForgeGems,
} from "@/recoil/forge/atom";
import { useRecoilState } from "recoil";

import ForgeIcon from "@/assets/icon/forge.svg";
import GemIcon from "@/assets/icon/mine.svg";
import GemCard from "../common/GemCard";
import { RarityType } from "@/types";

const ForgeSuccessModal = () => {
  const [isModal, setShowModal] = useRecoilState(forgeSuccessModalStatus);
  const [, setSelectedGemsInfo] = useRecoilState(selectedForgeGems);

  return (
    <Modal
      isOpen={isModal}
      onClose={() => {
        setShowModal(false);
        setSelectedGemsInfo({
          selectedRarity: RarityType.none,
          selectedGemsList: [],
        });
      }}
      size={"2xl"}
      isCentered
    >
      <ModalOverlay />
      <ModalContent bgColor={"#21232D"} rounded={16}>
        <ModalCloseButton />
        <ModalBody padding={0}>
          <Flex w={"100%"} flexDir={"column"} p={"37px 52px 44px 52px"}>
            <Text
              fontWeight={700}
              fontSize={48}
              textAlign={"center"}
              textTransform={"uppercase"}
            >
              FORGED A NEW GEM!
            </Text>

            <Center mt={8}>
              <GemCard
                mode="common"
                dailyChange={16.7}
                staked={92.36}
                rarityScore={1}
                gemInfo={{
                  quadrants: [6, 5, 5, 5],
                  color: [2,3],
                  tokenID: 30,
                  rarity: RarityType.legendary,
                  creationDate: 0
                }}
              />
            </Center>

            <Text
              mt={14}
              fontSize={18}
              fontWeight={400}
              textAlign={"center"}
              lineHeight={"27px"}
            >
              Forging burns your two gems in order to mint a newer gem with
              higher quality and value.
            </Text>

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

export default ForgeSuccessModal;
