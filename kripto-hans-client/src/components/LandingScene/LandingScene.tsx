import { Box, Button, Typography } from '@material-ui/core';
import React from 'react';
import { useStyles } from './LandingScene.styles';

export const LandingScene: React.FC<Record<string, unknown>> = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography variant="h1" className={classes.heroTitle}>
        Ana
      </Typography>

      <Box className={classes.ctaButtonsContainer}>
        <Button className={classes.generateButton} color="primary" variant="contained">
          Generate
        </Button>
        <Button className={classes.acquireButton} color="secondary" variant="contained">
          Buy
        </Button>
      </Box>
    </Box>
  );
};
