import { Box } from '@material-ui/core';
import { useWallet } from 'contexts/WalletContext';
import { useState } from 'react';
import { useStyles } from './GenerateScene.styles';

export const GenerateScene: React.FC<Record<string, unknown>> = () => {
  const {
    state: { contract, accounts }
  } = useWallet();

  const [inputImageUrl, setInputImageUrl] = useState('');

  const handlePayGenerating = async () => {
    if (contract) {
      const payGeneratingResult = await contract.methods
        .payGenerating(inputImageUrl)
        .send({ from: accounts[0], gas: 1_000_000 });

      console.warn('payGeneratingResult: ', payGeneratingResult);

      alert(payGeneratingResult.status);

      // txHash is a hex string
      // As with any RPC call, it may throw an error

      // const txHash = await ethereum.request({
      //   method: 'eth_sendTransaction',
      //   params: [transactionParameters]
      // });
    }
  };

  const classes = useStyles();

  return <Box className={classes.root}>Generate scene works</Box>;
};
