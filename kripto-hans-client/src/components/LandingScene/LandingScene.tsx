import { Box, Button, Typography } from '@material-ui/core';
import { useStyles } from './LandingScene.styles';
import { WalletConnector } from 'components/WalletConnector/WalletConnector';

export const LandingScene: React.FC<Record<string, unknown>> = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.headerContainer}>
        <WalletConnector />
      </Box>
      <Box className={classes.heroContainer}>
        <Typography variant="h1" className={classes.heroTitle}>
          ANA
        </Typography>

        <Typography variant="h6" className={classes.heroSubtitle}>
          AI NFT Art
        </Typography>

        <Box className={classes.ctaButtonsContainer}>
          <Button className={classes.generateButton} color="primary" variant="contained">
            Generate
          </Button>
          <Button className={classes.acquireButton} color="secondary" variant="contained">
            Explore
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
