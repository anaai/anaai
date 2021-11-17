import { Box, Typography } from '@material-ui/core';
import { useStyles } from './MyArtScene.styles';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ScrollToTopOnUnmount } from 'components/ScrollToTopOnUnmount/ScrollToTopOnUnmount';

export const MyArtScene: React.FC<Record<string, unknown>> = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root} data-testid="MyArtScene-root-container">
      <ScrollToTopOnUnmount />

      <Typography variant="h2" gutterBottom>
        My Art
      </Typography>
      <ImageGallery />
    </Box>
  );
};
