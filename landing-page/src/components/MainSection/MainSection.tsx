import {
  Box,
  ImageList,
  ImageListItem,
  Link,
  Typography,
  useMediaQuery,
  useTheme
} from '@material-ui/core';
import { images } from 'config/imageLoader/imageLoader';
import ReactCompareImage from 'react-compare-image';
import { useStyles } from './MainSection.styles';

import caterpillar from 'assets/images/news-cards/caterpillar.jpg';
import lightBulb from 'assets/images/news-cards/light-bulb.jpg';
import cassette from 'assets/images/news-cards/cassette.jpg';

export const MainSection: React.FC<Record<string, unknown>> = () => {
  const imageExamples = [
    {
      leftImage: images.ascii.mCity,
      rightImage: images.base.mCity,
      transformationName: 'ASCII art'
    },
    {
      leftImage: images.sketch.mLake,
      rightImage: images.base.mLake,
      transformationName: 'Sketch'
    },
    {
      leftImage: images.candy.fGirl,
      rightImage: images.base.fGirl,
      transformationName: 'Candy'
    },
    {
      leftImage: images.feathers.fBeach,
      rightImage: images.base.fBeach,
      transformationName: 'Feathers style transfer'
    },
    {
      leftImage: images.mosaic.mGirl,
      rightImage: images.base.mGirl,
      transformationName: 'Mosaic style transfer'
    },
    {
      leftImage: images.theScream.fCat,
      rightImage: images.base.fCat,
      transformationName: 'The Scream style transfer'
    }
  ] as const;

  const theme = useTheme();
  const matchesSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  return (
    <Box className={classes.root} data-testid="MainSection-root-container">
      <Box className={classes.mainSectionContentContainer}>
        <Box className={classes.heroSectionContainer} id="hero-section">
          <Box className={classes.heroTextContainer}>
            <Typography variant="h2" className={classes.heroTitle}>
              ANA
            </Typography>
            <br />
            <Typography variant="h5" className={classes.heroDescription}>
              There is a new art form on the rise.
            </Typography>
            <br />
            <Typography className={classes.heroDescription}>
              Unlock the future of generative digital art using the first generative art platform on
              blockchain.
              {/* As generative art is getting more and more popular, ANA helps everyone become an
              artist using state of the art generative and AI models to create your own art. */}
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
          <Typography variant="h3" className={classes.ourVisionTitle}>
            Our Vision
          </Typography>
          <Typography className={classes.ourVisionText}>
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
            Art is generated using one of our predefined transformations. Each transformation has a
            limited supply meaning that it can be used only a number of times. After that, the
            transformation becomes unavialable for future use.
            <br />
            <br />
            Each transformation is a mathematical or AI model developed that can be used for
            generating different content in the space of images, audio, video and text.
          </Typography>

          <Box className={classes.howItWorksContentContainer}>
            <Box className={classes.howItWorksVideoContainer}>
              <video className={classes.howItWorksVideo} controls autoPlay>
                <source src="https://www.w3schools.com/html/movie.mp4" type="video/mp4" />
                <track kind="captions"></track>
              </video>
            </Box>

            <Box className={classes.howItWorksTextContainer}>
              <Typography className={classes.howItWorksLeadingParahraph}>
                ANA allows you to create a personal art collection in 3 clicks.
              </Typography>

              <ul className={classes.howItWorksList}>
                <li className={classes.howItWorksListItem}>
                  Choose base content to apply transformation to
                </li>
                <li className={classes.howItWorksListItem}>Select desired transformation</li>
                <li className={classes.howItWorksListItem}>Generate your art</li>
              </ul>
            </Box>
          </Box>
        </Box>

        <Typography className={classes.howItWorksLeadingParahraph}>
          Enjoy your token that ANA has minted for you. ANA is erc721 compatible, so your tokens can
          be found on{' '}
          <Link
            href="https://opensea.io/"
            className={classes.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Opensea
          </Link>
          .
        </Typography>

        <Box className={classes.examplesContainer} id="examples-section">
          <Typography variant="h3" className={classes.title}>
            Gallery
          </Typography>

          <Box className={classes.galleryContainerInner}>
            <ImageList
              rowHeight={theme.spacing(30)}
              className={classes.imageList}
              cols={matchesSmDown ? 1 : 2}
              gap={theme.spacing(1.5)}
            >
              {imageExamples.map(({ leftImage, rightImage, transformationName }) => (
                <Box key={leftImage} className={classes.galleryCardContainer}>
                  <Typography>{transformationName}</Typography>
                  <ImageListItem className={classes.galleryImageContainer} cols={1}>
                    <ReactCompareImage
                      sliderPositionPercentage={0.33}
                      leftImage={leftImage}
                      rightImage={rightImage}
                    />
                  </ImageListItem>
                </Box>
              ))}
            </ImageList>
          </Box>
        </Box>

        <Box className={classes.whatToExpectContainer} id="what-to-expect-section">
          <Typography variant="h3" className={classes.title}>
            What to expect
          </Typography>

          <Typography className={classes.whatToExpectLeadingParahraph}>
            We have big plans for the future, jump along for the ride!
            <br />
            <br />
            ANA will keep developing new generative models and release the best of them for you to
            create your own original art. The supply will always be limited to reward people who
            believed in our vision early.
            <br />
            <br />
            Follow us on twitter and join our discord to share your ideas with us. We want our
            models to be a collaborative effort with the community. Expect interesting features in
            the future!
          </Typography>

          <Box className={classes.whatToExpectCardsContainer}>
            <Box className={classes.whatToExpectCard}>
              <img src={caterpillar} alt="" className={classes.whatToExpectCardImage} />

              <Typography variant="h6" className={classes.whatToExpectCardTitle}>
                More transformations
              </Typography>

              <Typography variant="body1" className={classes.whatToExpectCardDescription}>
                Expect new transformations on a regular basis with new cool generative art!
              </Typography>
            </Box>

            <Box className={classes.whatToExpectCard}>
              <img src={cassette} alt="" className={classes.whatToExpectCardImage} />

              <Typography variant="h6" className={classes.whatToExpectCardTitle}>
                Support for audio/video
              </Typography>

              <Typography variant="body1" className={classes.whatToExpectCardDescription}>
                Generative art applied to other mediums such as video and audio!
              </Typography>
            </Box>

            <Box className={classes.whatToExpectCard}>
              <img src={lightBulb} alt="" className={classes.whatToExpectCardImage} />

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
