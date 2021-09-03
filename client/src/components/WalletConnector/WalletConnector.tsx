import React from 'react';
import { useStyles } from './WalletConnector.styles';
import { ReactComponent as MetaMaskFox } from 'assets/images/metamask-fox.svg';
import { Button, PropTypes } from '@material-ui/core';

import { useWallet } from 'contexts/WalletContext/WalletContext';
import { createSetAccountsAction } from 'contexts/WalletContext/WalletContext.actions';
import { NotificationTooltip } from 'components/NotificationTooltip/NotificationTooltip';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}

export const WalletConnector: React.FC<Record<string, unknown>> = () => {
  const {
    state: { isMetaMaskInstalled, metaMaskOnboarding, accounts },
    dispatch
  } = useWallet();

  const handleConnectToMetaMask = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      dispatch(createSetAccountsAction(accounts));
    } catch (error) {
      console.error(error);
    }
  };

  const handleInstallMetaMask = () => {
    metaMaskOnboarding.startOnboarding();
  };

  const classes = useStyles();

  const sharedButtonProps = {
    color: (accounts.length ? 'primary' : undefined) as PropTypes.Color | undefined,
    className: classes.metamaskButton,
    variant: 'contained' as const,
    endIcon: <MetaMaskFox />,
    'data-testid': 'metamask-button'
  };

  return (
    <NotificationTooltip>
      {isMetaMaskInstalled ? (
        accounts.length ? (
          <Button {...sharedButtonProps}>Connected</Button>
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
    </NotificationTooltip>
  );
};