
import Image from "next/image";
import { Flex } from "@chakra-ui/react";
import { ImageFileType } from "@/types";
import { SupportedChainId } from "@/types/network/supportedNetworks";

import SYMBOL_ETHEREUM_CIRCLE from "@/assets/icon/network/ethereum_circle.svg";
import SYMBOL_TITAN_CIRCLE from "@/assets/icon/network/titan_circle.svg";
import SYMBOL_THANOS_CIRCLE from "@/assets/icon/network/thanos_circle.svg";
import WarningRed from "@/assets/icon/warningRed.svg";
import { CSSProperties } from "react";

export default function ImageSymbol(props: {
  ImgFile: ImageFileType;
  w?: number;
  h?: number;
  style?: {};
}) {
  return (
    <Flex w={`${props.w ?? 20}px`} h={`${props.h ?? 20}px`}>
      <Image
        src={props.ImgFile}
        alt={"img"}
        style={{ width: "100%", height: "100%" }}
        {...props.style}
      />
    </Flex>
  );
}

export function NetworkSymbol(props: {
  network: SupportedChainId | undefined;
  w?: number;
  h?: number;
  style?: CSSProperties;
}) {
  const { network } = props;

  switch (network) {
    // case SupportedChainId.MAINNET:
    case SupportedChainId.SEPOLIA:
      return (
        <ImageSymbol
          ImgFile={SYMBOL_ETHEREUM_CIRCLE}
          {...props}
        />
      );
    // case SupportedChainId.TITAN:
    case SupportedChainId.TITAN_SEPOLIA:
      return (
        <ImageSymbol
          ImgFile={SYMBOL_TITAN_CIRCLE}
          {...props}
        />
      );
    // case SupportedChainId.THANOS_SEPOLIA:
    //   return (
    //     <ImageSymbol
    //       ImgFile={SYMBOL_THANOS_CIRCLE}
    //       {...props}
    //     />
    //   );
    default:
      return <ImageSymbol ImgFile={WarningRed} {...props} />;
  }
}