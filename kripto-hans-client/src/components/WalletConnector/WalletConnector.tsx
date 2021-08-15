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

export const WalletConnector: React.FC<Record<string, unknown>> = () => {
  const [metaMaskIsInstalled, setMetaMaskIsInstalled] = useState(false);
  const [accounts, setAccounts] = useState<null | string[]>(null);
  const onboarding = React.useRef<MetaMaskOnboarding>(new MetaMaskOnboarding());

  useEffect(() => {
    setMetaMaskIsInstalled(isMetaMaskInstalled());
  }, []);

  useEffect(() => {
    let unsubscribe;
    if (metaMaskIsInstalled) {
      unsubscribe = watchEthereumAccountsChange();
    }
    return unsubscribe;
  }, [metaMaskIsInstalled]);

  const isMetaMaskInstalled = () => {
    // Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

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
    onboarding.current.startOnboarding();
  };

  const watchEthereumAccountsChange = () => {
    const onAccountsChanged = (newAccounts: string[]) => {
      setAccounts(newAccounts);
    };
    const { ethereum } = window;
    ethereum.on('accountsChanged', onAccountsChanged);
    return () => ethereum.of('accountsChanged', onAccountsChanged);
  };

  const classes = useStyles();

  const sharedButtonProps = {
    className: classes.metamaskButton,
    variant: 'contained' as const,
    endIcon: <MetaMaskFox />,
    'data-testid': 'metamask-button'
  };

  return (
    <>
      {metaMaskIsInstalled ? (
        accounts?.length ? (
          <Button {...sharedButtonProps} onClick={handleConnectToMetaMask}>
            Connected
          </Button>
        ) : (
          <Button {...sharedButtonProps} onClick={handleConnectToMetaMask}>
            Connect
          </Button>
        )
      ) : (
        <Button {...sharedButtonProps} onClick={handleInstallMetaMask}>
          Install MetaMask
        </Button>
      )}
    </>
  );
};
