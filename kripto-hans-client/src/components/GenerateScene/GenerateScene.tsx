import { Box, Button, Typography } from '@material-ui/core';
import { useWallet } from 'contexts/WalletContext';
import { ChangeEventHandler, FocusEventHandler, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useStyles } from './GenerateScene.styles';

export const GenerateScene: React.FC<Record<string, unknown>> = () => {
  const {
    state: { contract, accounts }
  } = useWallet();

  const [url, setUrl] = useState('');
  const [urlErrorMessage, setUrlErrorMessage] = useState('');
  const [urlErrorShown, setUrlErrorShown] = useState(false);

  const handleUrlChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { value }
    } = event;
    setUrl(value);

    const isUrlValid = validateUrl(value);

    setUrlErrorMessage(isUrlValid ? '' : 'Invalid URL provided');
  };
  const handleUrlFocus: FocusEventHandler<HTMLInputElement> = (event) => event.target.select();

  const handleUrlBlur: FocusEventHandler<HTMLInputElement> = () => setUrlErrorShown(true);

  const validateUrl = (urlString: string) => {
    let url;

    try {
      url = new URL(urlString);
    } catch (_) {
      return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
  };

  const handlePayGenerating = async () => {
    if (contract) {
      const payGeneratingResult = await contract.methods
        .payGenerating(url)
        .send({ from: accounts[0], gas: 1_000_000 });

      console.warn('payGeneratingResult: ', payGeneratingResult);

      alert(payGeneratingResult.status);
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
        <form
          className={classes.urlForm}
          onSubmit={() => {
            void 0;
          }}
        >
          <input
            className={classes.imageUrlInput}
            type="url"
            required
            name="url"
            value={url}
            onChange={handleUrlChange}
            onFocus={handleUrlFocus}
            onBlur={handleUrlBlur}
            placeholder="Add remote image url here"
          />

          <Typography
            className={`${classes.urlErrorMessage} ${
              urlErrorShown ? classes.urlErrorMessageVisible : ''
            }`}
            variant="body2"
          >
            {`${urlErrorMessage ? urlErrorMessage : 'Ready for Liftoff'} `}
          </Typography>

          <Box className={classes.ctaButtonsContainer}>
            <Button
              className={classes.payGenerateButton}
              color="primary"
              variant="contained"
              onClick={handlePayGenerating}
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
