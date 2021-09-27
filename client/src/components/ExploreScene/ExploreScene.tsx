import { Box } from '@material-ui/core';
import { useStyles } from './ExploreScene.styles';
import { ImageGallery } from './ImageGallery/ImageGallery';

export const ExploreScene: React.FC<Record<string, unknown>> = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root} data-testid="ExploreScene-root-container">
      <ImageGallery />
    </Box>
  );
};
