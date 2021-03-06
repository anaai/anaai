import { Box, CircularProgress, Typography } from '@material-ui/core';
import { useWallet } from 'contexts/WalletContext/WalletContext';
import { useStyles } from './GeneratedImage.styles';

export const GeneratedImage: React.FC<Record<string, unknown>> = () => {
  const {
    state: {
      mintedToken,
      loading: { payGenerating: payGeneratingLoading }
    }
  } = useWallet();

  const classes = useStyles();

  return (
    <Box className={classes.root} data-testid="generated-image-container">
      {payGeneratingLoading && (
        <Box className={classes.payGeneratingLoadingContainer}>
          <CircularProgress className={classes.loadingSpinner} />
          <Typography className={classes.loadingText} variant="h6">
            Generating Image
          </Typography>
          <Typography className={classes.loadingText} variant="body2">
            This can take up to a couple of minutes
          </Typography>
        </Box>
      )}
      <Box
        className={`${classes.generatedImageContainer} ${
          mintedToken ? classes.generatedImageContainerImageReady : ''
        }`}
      >
        {mintedToken && (
          <img className={classes.generatedImage} src={mintedToken.image} alt="generated" />
        )}
      </Box>
    </Box>
  );
};
