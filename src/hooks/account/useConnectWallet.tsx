import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from 'wagmi/connectors'

export default function useConnectWallet() {
  const { isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const connectToWallet = () => {
    connect({
      connector: injected(),
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
