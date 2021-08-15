import React, { useEffect, useState } from 'react';
import MetaMaskOnboarding from '@metamask/onboarding';
import { useStyles } from './WalletConnector.styles';
import { ReactComponent as MetaMaskFox } from 'assets/images/metamask-fox.svg';
import { Button } from '@material-ui/core';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}

const onboarding = new MetaMaskOnboarding({
  forwarderOrigin: window.location.origin
});

export const WalletConnector: React.FC<Record<string, unknown>> = () => {
  const [metaMaskIsInstalled, setMetaMaskIsInstalled] = useState(false);
  const [accounts, setAccounts] = useState<null | string[]>(null);

  const isMetaMaskInstalled = () => {
    // Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  useEffect(() => {
    setMetaMaskIsInstalled(isMetaMaskInstalled());
    watchEthereumAccountsChange();
  }, []);

  const handleConnectToMetaMask = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      setAccounts(accounts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInstallMetaMask = () => {
    onboarding.startOnboarding();
  };

  const watchEthereumAccountsChange = () => {
    const { ethereum } = window;
    ethereum.on('accountsChanged', (newAccounts: string[]) => {
      setAccounts(newAccounts);
    });
  };

  const classes = useStyles();

  return (
    <>
      {metaMaskIsInstalled ? (
        accounts?.length ? (
          <Button
            onClick={handleConnectToMetaMask}
            className={classes.metamaskButton}
            variant="contained"
            endIcon={<MetaMaskFox />}
          >
            Connected
          </Button>
        ) : (
          <Button
            onClick={handleConnectToMetaMask}
            className={classes.metamaskButton}
            variant="contained"
            endIcon={<MetaMaskFox />}
          >
            Connect
          </Button>
        )
      ) : (
        <Button
          onClick={handleInstallMetaMask}
          className={classes.metamaskButton}
          variant="contained"
          endIcon={<MetaMaskFox />}
        >
          Install MetaMask
        </Button>
      )}
    </>
  );
};
