import { Box, Button, Typography } from '@material-ui/core';
import { useStyles } from './Header.styles';

export const Header: React.FC<Record<string, unknown>> = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root} data-testid="Header-root-container">
      <Box className={classes.headerContentContainer}>
        <Box className={classes.logoContainer}>
          <Typography variant="h4" className={classes.title}>
            ANA
          </Typography>
        </Box>

        <Box className={classes.headerActionsContainer}>
          <Button>How it works</Button>
          <Button>Examples</Button>
          <Button color="secondary" variant="contained">
            App
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
