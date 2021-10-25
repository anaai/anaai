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
          <Button>Our Vision</Button>
          <Button>How it works</Button>
          <Button>Examples</Button>
          <Button>What to expect</Button>
          <Button
            target="_blank"
            href="http://stg.anaai.art/"
            color="secondary"
            variant="contained"
          >
            Generate your art
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
