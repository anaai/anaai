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

  const handleTransactionInit = async () => {
    // eslint-disable-next-line no-debugger
    // debugger;

    const abi = StyleNFTContract.abi; // some ABI JSON;

    console.warn(abi);

    const address = process.env.REACT_APP_CONTRACT_ADDRESS; // some contract address as string;

    console.warn(address);

    const web3Instance = new Web3(window.ethereum);

    console.warn(web3Instance);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const myContract = new web3Instance.eth.Contract(abi as any, address);

    console.warn(myContract);

    myContract.events.TokenMinted(
      { filter: { payer: accounts![0] } },
      async (error: any, event: any) => {
        console.warn('EVENT RECIEVED: ', event);
      }
    );

    const something = await myContract.methods
      .payGenerating(imageUrl)
      .send({ from: accounts![0], gas: 1_000_000 });

    console.warn(something);

    alert(something.status);

    // txHash is a hex string
    // As with any RPC call, it may throw an error

    // const txHash = await ethereum.request({
    //   method: 'eth_sendTransaction',
    //   params: [transactionParameters]
    // });
  };

  const classes = useStyles();

  const sharedButtonProps = {
    className: classes.metamaskButton,
    variant: 'contained' as const,
    endIcon: <MetaMaskFox />,
    'data-testid': 'metamask-button'
  };

  const [imageUrl, setImageUrl] = useState('');

  return (
    <>
      {isMetaMaskInstalled ? (
        accounts.length ? (
          <Button {...sharedButtonProps} onClick={handleTransactionInit}>
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
      {/* <input name="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} /> */}
    </>
  );
};
