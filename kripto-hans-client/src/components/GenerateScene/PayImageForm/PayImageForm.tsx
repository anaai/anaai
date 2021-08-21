import { SyntheticEvent } from 'react';
import { Box, Button } from '@material-ui/core';
import { useWallet } from 'contexts/WalletContext';
import { useHistory } from 'react-router-dom';
import { useStyles } from './PayImageForm.styles';

export const PayImageForm: React.FC<Record<string, unknown>> = () => {
  const {
    state: {
      loading: { payImage: payImageLoading }
    }
  } = useWallet();

  const handlePayImageFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    alert('image buy submitted');
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
