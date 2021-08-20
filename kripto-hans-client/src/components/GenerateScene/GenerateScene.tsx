import { Box, Button, CircularProgress, Paper, Typography } from '@material-ui/core';
import { connectToMetaMaskSnackMessage } from 'config/snacks/snacks';
import {
  createSetPayGeneratingLoadingAction,
  createSetSnackMessageAction,
  useWallet
} from 'contexts/WalletContext';
import { PayGeneratingResult } from 'models/PayGeneratingResult.model';
import { ChangeEventHandler, FocusEventHandler, SyntheticEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { validateAccountConnection, validateUrl } from 'utils/validators';
import { useStyles } from './GenerateScene.styles';

export const GenerateScene: React.FC<Record<string, unknown>> = () => {
  const {
    state: {
      contract,
      accounts,
      loading: { payGenerating: payGeneratingLoading },
      events: { tokenMinted: tokenMintedEvent }
    },
    dispatch
  } = useWallet();

  const [url, setUrl] = useState('');
  const [urlErrorMessage, setUrlErrorMessage] = useState('Invalid URL provided');
  const [urlInputTouched, setUrlInputTouched] = useState(false);

  const handleUrlChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { value }
    } = event;
    setUrl(value);

    const isUrlValid = validateUrl(value);

    setUrlErrorMessage(isUrlValid ? '' : 'Invalid URL provided');
  };
  const handleUrlFocus: FocusEventHandler<HTMLInputElement> = (event) => event.target.select();

  const handleUrlBlur: FocusEventHandler<HTMLInputElement> = () => setUrlInputTouched(true);

  const handlePayGenerating = async () => {
    if (contract) {
      // Loading finish is triggered either on payGenerating error or tokenMintedEvent
      dispatch(createSetPayGeneratingLoadingAction(true));
      try {
        const payGeneratingResult: PayGeneratingResult = await contract.methods
          .payGenerating(url)
          .send({ from: accounts[0], gas: 1_000_000 });

        console.debug('payGeneratingResult: ', payGeneratingResult);

        alert(payGeneratingResult.status);
      } catch (error) {
        console.error(error);
        createSetPayGeneratingLoadingAction(false);
      }
    }
  };

  const handleUrlFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const isAccountConnected = validateAccountConnection(accounts);
    if (!isAccountConnected) {
      return dispatch(createSetSnackMessageAction(connectToMetaMaskSnackMessage));
    }

    const isUrlValid = validateUrl(url);
    if (isUrlValid) {
      handlePayGenerating();
    }
  };

  const history = useHistory();

  const handleBackClick = () => {
    history.goBack();
  };

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.contentContainer}>
        <Box className={classes.generatedImageContainer}>
          {payGeneratingLoading && <CircularProgress className={classes.loadingSpinner} />}
          <Paper className={classes.generatedImagePaper}></Paper>
        </Box>
        <form className={classes.urlForm} onSubmit={handleUrlFormSubmit}>
          <input
            className={classes.imageUrlInput}
            type="url"
            required
            name="url"
            value={url}
            disabled={payGeneratingLoading}
            onChange={handleUrlChange}
            onFocus={handleUrlFocus}
            onBlur={handleUrlBlur}
            placeholder="Add Image URL here"
          />

          <Typography
            className={`${classes.urlErrorMessage} ${
              urlInputTouched ? classes.urlErrorMessageVisible : ''
            }`}
            variant="body2"
          >
            {`${urlErrorMessage || !url ? urlErrorMessage : 'Ready for Liftoff'} `}
          </Typography>

          <Box className={classes.ctaButtonsContainer}>
            <Button
              className={classes.payGenerateButton}
              color="primary"
              variant="contained"
              type="submit"
              disabled={payGeneratingLoading}
            >
              Pay Image Generate
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
      </Box>
    </Box>
  );
};
