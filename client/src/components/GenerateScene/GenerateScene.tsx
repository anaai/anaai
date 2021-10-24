import { Box, Typography } from '@material-ui/core';
import { useWallet } from 'contexts/WalletContext/WalletContext';
import { GeneratedImage } from './GeneratedImage/GeneratedImage';
import { PayGenerateForm } from './PayGenerateForm/PayGenerateForm';
import { useStyles } from './GenerateScene.styles';
import { ImageGeneratedActions } from './ImageGeneratedActions/ImageGeneratedActions';

export const GenerateScene: React.FC<Record<string, unknown>> = () => {
  const {
    state: { mintedToken }
  } = useWallet();

  const classes = useStyles();

  return (
    <Box className={classes.root} data-testid="GenerateScene-root-container">
      <Box className={classes.contentContainer}>
        <Typography variant="h2" gutterBottom>
          Generate
        </Typography>
        {mintedToken ? <GeneratedImage /> : <Box>test description</Box>}
        {mintedToken ? <ImageGeneratedActions /> : <PayGenerateForm />}
      </Box>
    </Box>
  );
};
