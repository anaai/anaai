import { Box, Button, Typography } from '@material-ui/core';
import { images } from 'config/imageLoader/imageLoader';
import { transformationNames } from 'config/transformations/transformations';
import ReactCompareImage from 'react-compare-image';
import { useHistory, useLocation } from 'react-router';
import { useStyles } from './TransformationCard.styles';

interface TransformationCardProps {
  transformationName: typeof transformationNames[number];
}

export const TransformationCard: React.FC<TransformationCardProps> = ({ transformationName }) => {
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();

  const handleLearnMoreClick = () => {
    history.push(`${location.pathname}/${transformationName}`);
  };

  const handleGenerateClick = () => {
    history.push(`/generate/${transformationName}`);
  };

  return (
    <Box className={classes.root} data-testid="TransformationCard-root-container">
      <Box className={classes.tranformationCard}>
        <Box className={classes.transformationInfoContainer}>
          <Typography className={classes.transformationTitle} variant="h5">
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

          <Box className={classes.transformationCardActionsContainer}>
            <Button
              onClick={handleGenerateClick}
              className={classes.generateNowButton}
              color="primary"
              variant="contained"
            >
              Generate
            </Button>

            <Button
              onClick={handleLearnMoreClick}
              className={classes.learnMoreButton}
              color="secondary"
              variant="contained"
            >
              Learn more
            </Button>
          </Box>
        </Box>

        <Box className={classes.transformationImagesContainer}>
          <ReactCompareImage
            sliderPositionPercentage={0.33}
            leftImage={images[transformationName].fGirl}
            rightImage={images.base.fGirl}
          />
        </Box>
      </Box>
    </Box>
  );
};
