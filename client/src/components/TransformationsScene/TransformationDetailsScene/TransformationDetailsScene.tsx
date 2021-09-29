import { Box } from '@material-ui/core';
import { useStyles } from './TransformationDetailsScene.styles';

export const TransformationDetailsScene: React.FC<Record<string, unknown>> = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root} data-testid="TransformationDetailsScene-root-container">
      Transformation Details Scene works
    </Box>
  );
};
