import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  Typography,
  useMediaQuery
} from '@material-ui/core';
import { useTheme } from '@material-ui/core';
import { images } from 'config/imageLoader/imageLoader';
import { ImageName, TransformationName } from 'config/transformations/transformations';
import ReactCompareImage from 'react-compare-image';
import { useHistory, useParams } from 'react-router';
import { useStyles } from './TransformationDetailsScene.styles';

interface TransformationDetailsParams {
  transformationName: TransformationName;
}

export const TransformationDetailsScene: React.FC<Record<string, unknown>> = () => {
  const { transformationName } = useParams<TransformationDetailsParams>();

  const history = useHistory();
  const handleExploreOtherTransformationsClick = () => {
    history.push('/transformations');
  };

  const handleGenerateClick = () => {
    history.push(`/generate/${transformationName}`);
  };

  const theme = useTheme();
  const matchesSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  return (
    <Box className={classes.root} data-testid="TransformationDetailsScene-root-container">
      <Box>
        <Box className={classes.transformationInfoContainer}>
          <Typography className={classes.transformationTitle} variant="h3">
            Transformation title
          </Typography>

          <Typography className={classes.transformationDescription} variant="body2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis iure ipsa
            necessitatibus provident nam quaerat quas. Maiores consequuntur iusto, temporibus quam
            beatae culpa libero dicta quidem repellat earum repellendus soluta!
          </Typography>

          <Box className={classes.transformationStats}>
            <Box className={classes.transformationStat}>
              <Typography className={classes.transformationStatValue} variant="h6">
                15
              </Typography>
              <Typography>Lorem start</Typography>
            </Box>

            <Box className={classes.transformationStat}>
              <Typography className={classes.transformationStatValue} variant="h6">
                15
              </Typography>
              <Typography>Lorem start</Typography>
            </Box>

            <Box className={classes.transformationStat}>
              <Typography className={classes.transformationStatValue} variant="h6">
                15
              </Typography>
              <Typography>Lorem start</Typography>
            </Box>
          </Box>
        </Box>

        <Box className={classes.transformationDetailsActionsContainer}>
          <Button
            onClick={handleGenerateClick}
            className={classes.generateNowButton}
            color="primary"
            variant="contained"
          >
            Generate
          </Button>

          <Button
            onClick={handleExploreOtherTransformationsClick}
            className={classes.exploreOtherTransformations}
            color="secondary"
            variant="contained"
          >
            Explore other transformations
          </Button>
        </Box>
      </Box>

      <Box className={classes.galleryContainer}>
        <Typography variant="h3" className={classes.examplesTitle}>
          Examples
        </Typography>

        <Box className={classes.galleryContainerInner}>
          <ImageList
            rowHeight={theme.spacing(30)}
            className={classes.imageList}
            cols={matchesSmDown ? 1 : 2}
            gap={theme.spacing(1.5)}
          >
            {Object.entries(images[transformationName]).map(([imageName, imageUrl]) => (
              <ImageListItem className={classes.galleryImageContainer} key={imageUrl} cols={1}>
                <ReactCompareImage
                  sliderPositionPercentage={0.33}
                  leftImage={imageUrl}
                  rightImage={images.base[imageName as ImageName]}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      </Box>
    </Box>
  );
};
