import { useState, useRef, useEffect } from "react";
import Web3Modal from "web3modal";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { providers } from "ethers";
import Core from "web3modal";

export default function useWeb3() {
  const [walletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef<Core>();

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);

  async function connectWallet() {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  }

  async function getProviderOrSigner(
    needSigner = false
  ): Promise<Web3Provider | JsonRpcSigner> {
    const provider = await web3ModalRef.current?.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 5) {
      window.alert("Change the network to Goerli");
      throw new Error("Change network to Goerli");
    }
    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  }

  return {
    getProviderOrSigner,
    connectWallet,
    walletConnected,
    setWalletConnected,
    web3ModalRef,
  };
}
