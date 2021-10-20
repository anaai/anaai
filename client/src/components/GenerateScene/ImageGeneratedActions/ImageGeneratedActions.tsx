import { Box, Button } from '@material-ui/core';
import { useWallet } from 'contexts/WalletContext/WalletContext';
import { createSetMintedTokenAction } from 'contexts/WalletContext/WalletContext.actions';

import { useHistory } from 'react-router-dom';
import { useStyles } from './ImageGeneratedActions.styles';

export const ImageGeneratedActions: React.FC<Record<string, unknown>> = () => {
  const { dispatch } = useWallet();

  const history = useHistory();

  const handleBackClick = () => {
    history.goBack();
  };

  const handleGenerateMoreClick = () => {
    dispatch(createSetMintedTokenAction(null));
  };

  const classes = useStyles();

  return (
    <Box className={classes.ctaButtonsContainer}>
      <Button
        className={classes.payGenerateButton}
        color="primary"
        variant="contained"
        type="submit"
        onClick={handleGenerateMoreClick}
      >
        Generate More
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
  );
};
