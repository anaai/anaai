import { SyntheticEvent } from 'react';
import { Box, Button } from '@material-ui/core';
import { useWallet } from 'contexts/WalletContext/WalletContext';
import { useHistory } from 'react-router-dom';
import { useStyles } from './PayImageForm.styles';
import { validateAccountConnection } from 'utils/validators';
import {
  createSetPayImageLoadingAction,
  createSetSnackMessageAction
} from 'contexts/WalletContext/WalletContext.actions';
import {
  connectToMetaMaskSnackMessage,
  imagePaymentAbandonSnackMessage
} from 'config/snacks/snacks';
import { PayImageResult } from 'models/PayImageResult.model';

export const PayImageForm: React.FC<Record<string, unknown>> = () => {
  const {
    state: {
      accounts,
      contract,
      loading: { payImage: payImageLoading },
      events: { tokenMinted: tokenMintedEvent }
    },
    dispatch
  } = useWallet();

  const handlePayImage = async () => {
    if (contract) {
      // Loading finish is triggered either on payImage error or tokenMintedEvent
      dispatch(createSetPayImageLoadingAction(true));
      try {
        const payImageResult: PayImageResult = await contract.methods
          .payImage(tokenMintedEvent?.returnValues.tokenId)
          .send({ from: accounts[0], gas: 1_000_000 });

        console.debug('payImageResult: ', payImageResult);

        console.debug(
          'userGeneratedTokens #: ',
          await contract.methods.userGeneratedTokens(accounts[0]).call()
        );
        console.debug(
          'userBoughtTokens #: ',
          await contract.methods.userBoughtTokens(accounts[0]).call()
        );

        console.debug(
          'special #####: ',
          await contract.methods
            .tokenURI((await contract.methods.userBoughtTokens(accounts[0]).call())[0])
            .call()
        );

        setTimeout(async () => {
          console.debug(
            'userGeneratedTokens ##: ',
            contract.methods.userGeneratedTokens(accounts[0]).call()
          );
          console.debug(
            'userBoughtTokens ##: ',
            contract.methods.userBoughtTokens(accounts[0]).call()
          );
        }, 60_000);
      } catch (error) {
        console.error(error);
        dispatch(createSetPayImageLoadingAction(false));
        dispatch(createSetSnackMessageAction(imagePaymentAbandonSnackMessage));
      }
    }
  };

  const handlePayImageFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const isAccountConnected = validateAccountConnection(accounts);
    if (!isAccountConnected) {
      return dispatch(createSetSnackMessageAction(connectToMetaMaskSnackMessage));
    }

    handlePayImage();
  };

  const history = useHistory();

  const handleBackClick = () => {
    history.goBack();
  };

  const classes = useStyles();

  return (
    <form className={classes.root} onSubmit={handlePayImageFormSubmit}>
      <Box className={classes.ctaButtonsContainer}>
        <Button
          className={classes.payGenerateButton}
          color="primary"
          variant="contained"
          type="submit"
          disabled={payImageLoading}
        >
          Buy Image
        </Button>
        <Button
          className={classes.backButton}
          color="secondary"
          variant="contained"
          onClick={handleBackClick}
        >
          Back
        </Button>
      </Box>
    </form>
  );
};
