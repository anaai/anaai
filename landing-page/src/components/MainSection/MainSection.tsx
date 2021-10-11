import { Box, Button, Typography } from '@material-ui/core';
import { useStyles } from './MainSection.styles';

export const MainSection: React.FC<Record<string, unknown>> = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root} data-testid="MainSection-root-container">
      <Box className={classes.mainSectionContentContainer}>Main section works</Box>
    </Box>
  );
};
