import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    ethereum: any;
  }
}

export const WalletConnector: React.FC<{}> = () => {
  const [metaMaskIsInstalled, setMetaMaskIsInstalled] = useState(false);

  const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  useEffect(() => {
    setMetaMaskIsInstalled(isMetaMaskInstalled());
  }, []);

  const handleConnectToMetaMask = () => {};
  const handleInstallMetaMask = () => {};

  return (
    <>
      {metaMaskIsInstalled ? (
        <button onClick={handleConnectToMetaMask}>Connect</button>
      ) : (
        <button onClick={handleInstallMetaMask}>Install MetaMask</button>
      )}
    </>
  );
};
