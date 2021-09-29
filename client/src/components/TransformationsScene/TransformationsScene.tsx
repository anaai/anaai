import { Box } from '@material-ui/core';
import { useStyles } from './TransformationsScene.styles';

export const TransformationsScene: React.FC<Record<string, unknown>> = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root} data-testid="TransformationsScene-root-container">
      Transformation Scene works
    </Box>
  );
};
