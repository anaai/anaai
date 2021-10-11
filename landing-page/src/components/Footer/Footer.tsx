import { Box } from '@material-ui/core';
import { useStyles } from './Footer.styles';

export const Footer: React.FC<Record<string, unknown>> = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root} data-testid="Footer-root-container">
      <Box className={classes.footerContentContainer}>Footer works</Box>
    </Box>
  );
};
