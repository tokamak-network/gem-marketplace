import Ethereum from "@/assets/icon/network/ethereum_circle.svg";
import Thanos from "@/assets/icon/network/thanos_circle.svg";
import Titan from "@/assets/icon/network/titan_circle.svg";
import { Network } from "@/types/network/supportedNetworks";

export const supportedNetworkList: Network[] = [
  {
    id: 11155111,
    name: "Sepolia",
    icon: Ethereum
  },
  {
    id: 55007,
    name: "Titan Sepolia",
    icon: Titan
  },
  {
    id: 111551119090,
    name: "Thanos Sepolia",
    icon: Thanos
  }
]