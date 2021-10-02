import { Box } from '@material-ui/core';
import { useStyles } from './TransformationCard.styles';

export const TransformationCard: React.FC<Record<string, unknown>> = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root} data-testid="TransformationCard-root-container">
      Transformation Card works
    </Box>
  );
};
