import React from 'react';
import { useStyles } from './WalletConnector.styles';
import { ReactComponent as MetaMaskFox } from 'assets/images/metamask-fox.svg';
import { Button, Tooltip, Typography } from '@material-ui/core';

import { createSetAccountsAction, useWallet } from 'contexts/WalletContext';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}

export const WalletConnector: React.FC<Record<string, unknown>> = () => {
  const {
    state: { isMetaMaskInstalled, metaMaskOnboarding, accounts, snackMessage },
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
    className: classes.metamaskButton,
    variant: 'contained' as const,
    endIcon: <MetaMaskFox />,
    'data-testid': 'metamask-button'
  };

  return (
    <Tooltip
      arrow
      classes={{
        tooltip: `${classes.tooltipRoot} ${
          snackMessage?.type === 'info' ? classes.infoTooltipRoot : ''
        }`,
        arrow: snackMessage?.type === 'info' ? classes.infoTooltipArrow : ''
      }}
      open={Boolean(snackMessage)}
      title={
        <Typography className={classes.tooltipText} variant="subtitle2">
          {snackMessage?.message}
        </Typography>
      }
    >
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
    </Tooltip>
  );
};
