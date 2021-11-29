import Web3 from 'web3';
import { Box, Button, Typography } from '@material-ui/core';
import { images } from 'config/imageLoader/imageLoader';
import ReactCompareImage from 'react-compare-image';
import { useHistory, useLocation } from 'react-router';
import { useStyles } from './TransformationCard.styles';
import { Transformation } from 'models/Transformations.model';
import { transformationDescriptions } from 'config/transformations/transformations';

interface TransformationCardProps {
  transformation: Transformation;
}

export const TransformationCard: React.FC<TransformationCardProps> = ({ transformation }) => {
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();

  const handleLearnMoreClick = () => {
    history.push(`${location.pathname}/${transformation.name}`);
  };

  const handleGenerateClick = () => {
    history.push(`/generate/${transformation.name}`);
  };

  return (
    <Box className={classes.root} data-testid="TransformationCard-root-container">
      <Box className={classes.tranformationCard}>
        <Box className={classes.transformationInfoContainer}>
          <Typography className={classes.transformationTitle} variant="h5">
            {transformation.name}
          </Typography>

          <Typography className={classes.transformationDescription} variant="body2">
            {transformationDescriptions[transformation.name]}
          </Typography>

          <Box className={classes.transformationStats}>
            <Box className={classes.transformationStat}>
              <Typography className={classes.transformationStatValue} variant="h6">
                {transformation.supply}
              </Typography>
              <Typography>Supply</Typography>
            </Box>

            <Box className={classes.transformationStat}>
              <Typography className={classes.transformationStatValue} variant="h6">
                {transformation.nTokens}
              </Typography>
              <Typography>Minted</Typography>
            </Box>

            <Box className={classes.transformationStat}>
              <Typography className={classes.transformationStatValue} variant="h6">
                {Web3.utils.fromWei(transformation.price.toString())} ETH
              </Typography>
              <Typography>Price</Typography>
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
            leftImage={images[transformation.name].fGirl}
            rightImage={images.base.fGirl}
          />
        </Box>
      </Box>
    </Box>
  );
};
