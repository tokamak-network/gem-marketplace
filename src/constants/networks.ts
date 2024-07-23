import Ethereum from "@/assets/icon/network/ethereum_circle.svg";
import Thanos from "@/assets/icon/network/thanos_circle.svg";
import Titan from "@/assets/icon/network/titan_circle.svg";
import { Network } from "@/types/network/supportedNetworks";

export const newtorkList: Network[] = [
  {
    id: 1,
    name: "Ethereum",
    icon: Ethereum
  },
  {
    id: 111551118080,
    name: "Thanos Sepolia",
    icon: Thanos
  },
  {
    id: 55004,
    name: "Titan",
    icon: Titan
  }
]