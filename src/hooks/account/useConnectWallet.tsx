import { useAccount, useConnect, useDisconnect } from "wagmi";


export default function useConnectWallet() {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const connectToWallet = () => {
    connect({
      connector: connectors[0],
    });
  };

  const disconnectToWallet = () => {
    disconnect();
  };

  const connetAndDisconntWallet = () => {
    isConnected ? disconnect() : connectToWallet();
  };

  return { connectToWallet, disconnectToWallet, connetAndDisconntWallet };
}
