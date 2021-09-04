import { Box, Button, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useStyles } from './LandingScene.styles';

export const LandingScene: React.FC<Record<string, unknown>> = () => {
  const history = useHistory();

  const handleGenerateClick = () => {
    history.push('/generate');
  };

  const handleExploreClick = () => {
    history.push('/explore');
  };

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.heroContainer}>
        <Typography variant="h1" className={classes.heroTitle}>
          ANA
        </Typography>

        <Typography variant="h6" className={classes.heroSubtitle}>
          AI NFT Art
        </Typography>

        <Box className={classes.ctaButtonsContainer}>
          <Button
            className={classes.generateButton}
            color="primary"
            variant="contained"
            onClick={handleGenerateClick}
          >
            Generate
          </Button>
          <Button
            className={classes.acquireButton}
            color="secondary"
            variant="contained"
            onClick={handleExploreClick}
          >
            Explore
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
