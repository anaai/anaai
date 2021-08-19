import { Box, Button, Typography } from '@material-ui/core';
import { useWallet } from 'contexts/WalletContext';
import { ChangeEventHandler, FocusEventHandler, SyntheticEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useStyles } from './GenerateScene.styles';

export const GenerateScene: React.FC<Record<string, unknown>> = () => {
  const {
    state: { contract, accounts }
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

  const handleUrlFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
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
        <form className={classes.urlForm} onSubmit={handleUrlFormSubmit}>
          <input
            className={classes.imageUrlInput}
            type="url"
            required
            name="url"
            value={url}
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
