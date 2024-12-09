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
  useTheme,
} from "@chakra-ui/react";

import { miningResultStatus } from "@/recoil/mine/atom";
import { useRecoilState } from "recoil";

import ForgeIcon from "@/assets/icon/forge.svg";
import GemIcon from "@/assets/icon/mine.svg";
import { GemStandard, RarityType } from "@/types";
import GemShape from "../common/GemShape";
import { useGetGemWithId } from "@/hooks/useGetMarketGems";
import { useMemo } from "react";

const CollectMinedGemModal = () => {
  const [modalStatus, setModalStatus] = useRecoilState(miningResultStatus);
  
  const gemList = useGetGemWithId(modalStatus.minedGemId!);

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
          isMining: false,
        };
  }, [gemList]);
  const theme = useTheme();

  return (
    <Modal
      isOpen={modalStatus.isOpen}
      onClose={() => setModalStatus({ isOpen: false })}
      size={"xl"}
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
              CONGRATS!
            </Text>

            <Text
              mt={5}
              fontFamily={theme.fonts.Inter}
              fontSize={28}
              textAlign={"center"}
            >
              You mined a Base Sapphire!
            </Text>

            <Center mt={8}>
              <GemShape quadrants={gemItem?.quadrants} gemColor={gemItem?.color}/>
            </Center>

            <Text
              mt={14}
              fontSize={18}
              fontWeight={400}
              textAlign={"center"}
              lineHeight={"27px"}
            >
              Take your newly acquired gem and start mining or forging
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

export default CollectMinedGemModal;
