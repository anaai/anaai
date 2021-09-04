import { Box } from '@material-ui/core';
import { useStyles } from './ExploreScene.styles';

export const ExploreScene: React.FC<Record<string, unknown>> = () => {
  const classes = useStyles();

  return <Box className={classes.root}>ExploreScene works</Box>;
};
