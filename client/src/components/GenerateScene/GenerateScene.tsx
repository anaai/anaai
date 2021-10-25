import { Box, Typography } from '@material-ui/core';
import { useWallet } from 'contexts/WalletContext/WalletContext';
import { GeneratedImage } from './GeneratedImage/GeneratedImage';
import { PayGenerateForm } from './PayGenerateForm/PayGenerateForm';
import { useStyles } from './GenerateScene.styles';
import { ImageGeneratedActions } from './ImageGeneratedActions/ImageGeneratedActions';

export const GenerateScene: React.FC<Record<string, unknown>> = () => {
  const {
    state: {
      mintedToken,
      loading: { payGenerating: payGeneratingLoading }
    }
  } = useWallet();

  const classes = useStyles();

  return (
    <Box className={classes.root} data-testid="GenerateScene-root-container">
      <Box className={classes.contentContainer}>
        <Typography variant="h2" gutterBottom>
          Generate
        </Typography>
        {mintedToken || payGeneratingLoading ? (
          <GeneratedImage />
        ) : (
          <Box className={classes.description}>
            Get started with these 3 easy steps:
            <br />
            <br />
            1. Enter an image URL
            <br />
            2. Choose a transformation
            <br />
            3. Press PAY IMAGE GENERATE button
            <br />
            <br />
            The image generation process takes a couple of minutes. If you happen to navigate away,
            you will be able to find your generated art within the MY ART section
          </Box>
        )}
        {mintedToken ? <ImageGeneratedActions /> : <PayGenerateForm />}
      </Box>
    </Box>
  );
};
