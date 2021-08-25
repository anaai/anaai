import { Box } from '@material-ui/core';
import { useWallet } from 'contexts/WalletContext/WalletContext';
import { GeneratedImage } from './GeneratedImage/GeneratedImage';
import { PayGenerateForm } from './PayGenerateForm/PayGenerateForm';
import { useStyles } from './GenerateScene.styles';
import { PayImageForm } from './PayImageForm/PayImageForm';

export const GenerateScene: React.FC<Record<string, unknown>> = () => {
  const {
    state: { mintedToken }
  } = useWallet();

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.contentContainer}>
        <GeneratedImage />
        {mintedToken ? <PayImageForm /> : <PayGenerateForm />}
      </Box>
    </Box>
  );
};
