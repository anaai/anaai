import { Box, Typography } from '@material-ui/core';
import { images } from 'config/imageLoader/imageLoader';
import ReactCompareImage from 'react-compare-image';
import { useParams } from 'react-router';
import { useStyles } from './TransformationDetailsScene.styles';

export const TransformationDetailsScene: React.FC<Record<string, unknown>> = () => {
  const classes = useStyles();

  const { id } = useParams<{ id: string }>();

  return (
    <Box className={classes.root} data-testid="TransformationDetailsScene-root-container">
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
        </Box>

        <Box className={classes.transformationImagesContainer}>
          <ReactCompareImage
            // hover
            // handle={<></>}
            sliderPositionPercentage={0.33}
            leftImage={images.skectch.gril}
            rightImage={images.base.gril}
          />
          {/* <img
            className={classes.tranformationImage}
            src="https://trello.com/1/cards/614765dca3613935ccdc0650/attachments/615335823572a21f5a51ee0f/previews/615335823572a21f5a51ee55/download/lake.jpeg.jpg"
            alt="example"
          />
          <img
            className={classes.tranformationImage}
            src="https://trello.com/1/cards/614765dca3613935ccdc0650/attachments/6153357c9744274e1150b8cd/previews/6153357e9744274e1150b901/download/gril.jpeg.jpg"
            alt="example"
          />
          <img
            className={classes.tranformationImage}
            src="https://trello.com/1/cards/614765dca3613935ccdc0650/attachments/61533574ebd5aa595af3b47a/previews/61533575ebd5aa595af3b4be/download/nature.jpeg.jpg"
            alt="example"
          />
          <img
            className={classes.tranformationImage}
            src="https://trello.com/1/cards/614765dca3613935ccdc0650/attachments/61533570863d532acf250fce/previews/61533571863d532acf250fe7/download/dogo.jpeg.jpg"
            alt="example"
          /> */}
        </Box>
      </Box>
    </Box>
  );
};
