import { Box, Typography } from '@material-ui/core';
import { images } from 'config/imageLoader/imageLoader';
import ReactCompareImage from 'react-compare-image';
import { useStyles } from './MainSection.styles';

export const MainSection: React.FC<Record<string, unknown>> = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root} data-testid="MainSection-root-container">
      <Box className={classes.mainSectionContentContainer}>
        <Box className={classes.heroSectionContainer} id="hero-section">
          <Box className={classes.heroTextContainer}>
            <Typography variant="h3" className={classes.heroTitle}>
              ANA
            </Typography>
            {/* <Typography variant="body1" className={classes.heroSubtitle}>
              AI
            </Typography> */}
            <Typography variant="body1" className={classes.heroDescription}>
              Unlock the future of generative digital art.
            </Typography>
          </Box>

          <Box className={classes.heroImageContainer}>
            <Box className={classes.macbookDeviceContainer}></Box>
            <Box className={classes.macbookDeviceContentContainer}>
              <ReactCompareImage
                sliderPositionPercentage={0.5}
                leftImage={images.feathers.mDogs}
                rightImage={images.base.mDogs}
              />
            </Box>
          </Box>
        </Box>

        <Box className={classes.ourVisionContainer} id="our-vision-section">
          <Typography variant="h3" className={classes.title}>
            Our Vision
          </Typography>
          <Typography className={classes.ourVisionText}>
            There is a new art form on the rise.
            <br />
            <br />
            Generative art is a process of algorithmically generating new ideas, forms, shapes,
            colors or patterns.
            <br />
            <br />
            Inspired by maths, AI and blockchain technology, we believe everyone should be able to
            generate, posess or sell their own art.
          </Typography>
        </Box>

        <Box className={classes.howItWorksContainer} id="how-it-works-section">
          <Typography variant="h3" className={classes.title}>
            How it works
          </Typography>

          <Typography className={classes.limitedTransformationsLeadingParahraph}>
            Art is generated used one of our predefined transformations. Each transformation has a
            limited supply meaning that it can be used only a number of times. After that, the
            transformation becomes unavialable for future use.
          </Typography>

          <Box className={classes.howItWorksContentContainer}>
            <Box className={classes.howItWorksVideoContainer}>
              <video className={classes.howItWorksVideo} controls autoPlay>
                <source src="http://www.w3schools.com/html/movie.mp4" type="video/mp4" />
                <track kind="captions"></track>
              </video>
            </Box>

            <Box className={classes.howItWorksTextContainer}>
              <Typography className={classes.howItWorksLeadingParahraph}>
                ANA platform allows you to create a personal art collection in 3 clicks.
              </Typography>

              <ul className={classes.howItWorksList}>
                <li className={classes.howItWorksListItem}>
                  Choose base image to apply transformation to
                </li>
                <li className={classes.howItWorksListItem}>Choose transformation</li>
                <li className={classes.howItWorksListItem}>Generate art</li>
                <li className={classes.howItWorksListItem}>ANA mints the token for you</li>
                <li className={classes.howItWorksListItem}>Enjoy your newly generated art!</li>
              </ul>
            </Box>
          </Box>
        </Box>

        <Box className={classes.examplesContainer} id="examples-section">
          <Typography variant="h3" className={classes.title}>
            Examples
          </Typography>
          <Box className={classes.exampleContainer}>
            <ReactCompareImage
              sliderPositionPercentage={0.33}
              leftImage={images.ascii.mCity}
              rightImage={images.base.mCity}
            />
          </Box>

          <Box className={classes.exampleContainer}>
            <ReactCompareImage
              sliderPositionPercentage={0.33}
              leftImage={images.sketch.mLake}
              rightImage={images.base.mLake}
            />
          </Box>

          <Box className={classes.exampleContainer}>
            <ReactCompareImage
              sliderPositionPercentage={0.33}
              leftImage={images.candy.fGirl}
              rightImage={images.base.fGirl}
            />
          </Box>

          <Box className={classes.exampleContainer}>
            <ReactCompareImage
              sliderPositionPercentage={0.33}
              leftImage={images.feathers.fBeach}
              rightImage={images.base.fBeach}
            />
          </Box>

          <Box className={classes.exampleContainer}>
            <ReactCompareImage
              sliderPositionPercentage={0.33}
              leftImage={images.mosaic.mGirl}
              rightImage={images.base.mGirl}
            />
          </Box>

          <Box className={classes.exampleContainer}>
            <ReactCompareImage
              sliderPositionPercentage={0.33}
              leftImage={images.theScream.fCat}
              rightImage={images.base.fCat}
            />
          </Box>

          <Box className={classes.exampleContainer}>
            <ReactCompareImage
              sliderPositionPercentage={0.33}
              leftImage={images.udnie.mForest}
              rightImage={images.base.mForest}
            />
          </Box>
        </Box>

        <Box className={classes.whatToExpectContainer} id="what-to-expect-section">
          <Typography variant="h3" className={classes.title}>
            What to expect
          </Typography>

          <Typography className={classes.whatToExpectLeadingParahraph}>
            We have big plans for the future, jump along for the ride!
          </Typography>

          <Box className={classes.whatToExpectCardsContainer}>
            <Box className={classes.whatToExpectCard}>
              <img
                src="https://3.img-dpreview.com/files/p/E~TS590x0~articles/8692662059/8283897908.jpeg"
                alt=""
                className={classes.whatToExpectCardImage}
              />

              <Typography variant="h6" className={classes.whatToExpectCardTitle}>
                More transformations
              </Typography>

              <Typography variant="body1" className={classes.whatToExpectCardDescription}>
                Expect new transformations on a regular basis with new cool generative art!
              </Typography>
            </Box>

            <Box className={classes.whatToExpectCard}>
              <img
                src="https://3.img-dpreview.com/files/p/E~TS590x0~articles/8692662059/8283897908.jpeg"
                alt=""
                className={classes.whatToExpectCardImage}
              />

              <Typography variant="h6" className={classes.whatToExpectCardTitle}>
                Support for audio/video
              </Typography>

              <Typography variant="body1" className={classes.whatToExpectCardDescription}>
                Generative art applied to other mediums such as video and audio!
              </Typography>
            </Box>

            <Box className={classes.whatToExpectCard}>
              <img
                src="https://3.img-dpreview.com/files/p/E~TS590x0~articles/8692662059/8283897908.jpeg"
                alt=""
                className={classes.whatToExpectCardImage}
              />

              <Typography variant="h6" className={classes.whatToExpectCardTitle}>
                Open sourcing custom generative models
              </Typography>

              <Typography variant="body1" className={classes.whatToExpectCardDescription}>
                After the supply for a transformation is exhausted, some of our models will sourced!
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
