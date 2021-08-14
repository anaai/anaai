import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { useStyles } from './LandingScene.styles';

export const LandingScene: React.FC<Record<string, unknown>> = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography variant="h1">AI NFT ART</Typography>
    </Box>
  );
};
