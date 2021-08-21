import { Box } from '@material-ui/core';
import { useWallet } from 'contexts/WalletContext';
import { GeneratedImage } from './GeneratedImage/GeneratedImage';
import { PayGenerateForm } from './PayGenerateForm/PayGenerateForm';
import { useStyles } from './GenerateScene.styles';

export const GenerateScene: React.FC<Record<string, unknown>> = () => {
  const {
    state: { mintedToken }
  } = useWallet();

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.contentContainer}>
        <GeneratedImage />
        {mintedToken ? null : <PayGenerateForm />}
      </Box>
    </Box>
  );
};
