import React, { useEffect } from "react";

declare global {
  interface Window {
    ethereum: any;
  }
}

export const WalletConnector: React.FC<{}> = () => {
  const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  useEffect(() => {
    console.log(isMetaMaskInstalled());
  }, []);

  return <div>Wallet connector works!</div>;
};
