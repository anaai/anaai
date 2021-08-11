import React, { useEffect, useState } from "react";
import MetaMaskOnboarding from "@metamask/onboarding";

declare global {
  interface Window {
    ethereum: any;
  }
}

const onboarding = new MetaMaskOnboarding({
  forwarderOrigin: window.location.origin,
});

export const WalletConnector: React.FC<{}> = () => {
  const [metaMaskIsInstalled, setMetaMaskIsInstalled] = useState(false);
  const [accounts, setAccounts] = useState<null | string[]>(null);

  const isMetaMaskInstalled = () => {
    // Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  useEffect(() => {
    setMetaMaskIsInstalled(isMetaMaskInstalled());
  }, []);

  const handleConnectToMetaMask = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleInstallMetaMask = () => {
    onboarding.startOnboarding();
  };

  return (
    <>
      {metaMaskIsInstalled ? (
        <button onClick={handleConnectToMetaMask}>Connect</button>
      ) : (
        <button onClick={handleInstallMetaMask}>Install MetaMask</button>
      )}

      {accounts && <div>Account: {accounts[0]}</div>}
    </>
  );
};
