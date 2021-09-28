import { Box, Button } from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import { useStyles } from './ImageGeneratedActions.styles';

export const ImageGeneratedActions: React.FC<Record<string, unknown>> = () => {
  const history = useHistory();

  const handleBackClick = () => {
    history.goBack();
  };

  const handleGenerateMoreClick = () => {
    alert('generate more click');
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
