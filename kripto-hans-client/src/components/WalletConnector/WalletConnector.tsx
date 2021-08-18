import React, { useState } from 'react';
import MetaMaskOnboarding from '@metamask/onboarding';
import { useStyles } from './WalletConnector.styles';
import { ReactComponent as MetaMaskFox } from 'assets/images/metamask-fox.svg';
import { Button } from '@material-ui/core';

import StyleNFTContract from 'assets/contracts/StyleNFT.json';
import Web3 from 'web3';
import { createSetAccountsAction, useWallet } from 'contexts/WalletContext';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}

export const WalletConnector: React.FC<Record<string, unknown>> = () => {
  const onboarding = React.useRef<MetaMaskOnboarding>(new MetaMaskOnboarding());

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
    className: classes.metamaskButton,
    variant: 'contained' as const,
    endIcon: <MetaMaskFox />,
    'data-testid': 'metamask-button'
  };

  return (
    <>
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
      {/* <input name="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} /> */}
    </>
  );
};
