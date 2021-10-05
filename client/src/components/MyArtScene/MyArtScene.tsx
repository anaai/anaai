import { Box } from '@material-ui/core';
import { useStyles } from './MyArtScene.styles';
import { ImageGallery } from './ImageGallery/ImageGallery';

export const MyArtScene: React.FC<Record<string, unknown>> = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root} data-testid="MyArtScene-root-container">
      <ImageGallery />
    </Box>
  );
};
