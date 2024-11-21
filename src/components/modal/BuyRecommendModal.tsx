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
  Button,
  Box,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import MarketIcon from "@/assets/icon/market.svg";
import GEM from "@/assets/images/sample_gem.png";

const BuyRecommendModal = (props: any) => {
  const { isOpen, onClose, mode } = props;
  const theme = useTheme();
  const router = useRouter();

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size={"xl"} isCentered>
      <ModalOverlay />
      <ModalContent bgColor={"#21232D"} rounded={16}>
        <ModalCloseButton />
        <ModalBody padding={0}>
          <Flex w={"100%"} flexDir={"column"} px={"52px"} py={6}>
            <Text
              fontWeight={600}
              fontSize={42}
              textAlign={"center"}
              textTransform={"capitalize"}
            >
              {mode}
            </Text>

            <Text
              mt={6}
              fontFamily={theme.fonts.Inter}
              fontSize={24}
              fontWeight={400}
              lineHeight={"34.57px"}
              textAlign={"center"}
            >
              You don’t own any gems
            </Text>

            <Text mt={8} fontSize={14} fontWeight={400} lineHeight={"21px"}>
              {mode === "forging"
                ? "In order to Forge, acquire a gem from the market or open a Gem Pack to try your luck at a Legendary Gem!"
                : mode === "mining"
                  ? "In order to Mine, acquire a gem from the market or open a Gem Pack to try your luck at a Unique Gem!"
                  : mode === "chest"
                    ? "Chest is where you can manage the gems you have collected through Mining, Forging or purchase from the Market. "
                    : ""}
            </Text>

            <Flex w={"full"} justify={"space-between"} mt={"60px"}>
              <Flex
                pos={"relative"}
                w={212}
                h={272}
                bgImage={"/assets/images/gempack.png"}
                flexDir={"column"}
                justify={"end"}
                rounded={"8px"}
                py={3}
                px={4}
                // overflow={"hidden"}
              >
                <Box
                  pos={"absolute"}
                  transform={"translateX(-50%)"}
                  left={"calc(50%)"}
                  top={"-70px"}
                  width={200}
                >
                  <Image alt="gem" src={GEM} />
                </Box>

                <Text fontSize={24} fontWeight={700}>
                  GEM PACK
                </Text>
                <Text
                  fontFamily={theme.fonts.Inter}
                  fontSize={14}
                  fontWeight={400}
                  mb={5}
                >
                  Obtain 1 Gem ranging from Rare up to Unique!
                </Text>

                <Button
                  w={"full"}
                  h={"42px"}
                  colorScheme="blue"
                  rounded={8}
                  alignItems={"center"}
                  justifyContent={"center"}
                  onClick={() => router.push("/market/gempack")}
                  bgColor={"#0380FF"}
                >
                  Open Pack
                </Button>
              </Flex>

              <Flex
                pos={"relative"}
                w={212}
                h={272}
                bgImage={"/assets/images/marketbg.png"}
                flexDir={"column"}
                justify={"end"}
                rounded={"8px"}
                py={3}
                px={4}
                // overflow={"hidden"}
              >
                <Text fontSize={24} fontWeight={700}>
                  MARKET
                </Text>
                <Text
                  fontFamily={theme.fonts.Inter}
                  fontSize={14}
                  fontWeight={400}
                  mb={5}
                >
                  Have your pick from a wide selection of gems!
                </Text>

                <Button
                  w={"full"}
                  h={"42px"}
                  colorScheme="blue"
                  rounded={8}
                  alignItems={"center"}
                  justifyContent={"center"}
                  onClick={() => router.push("/market")}
                  bgColor={"#0380FF"}
                  columnGap={2}
                >
                  <Image width={20} height={20} alt="market" src={MarketIcon} />
                  Market
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BuyRecommendModal;
