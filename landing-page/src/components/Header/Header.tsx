import { Box, Button, Typography } from '@material-ui/core';
import { useStyles } from './Header.styles';

export const Header: React.FC<Record<string, unknown>> = () => {
  const classes = useStyles();

  const scrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    element && element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogoClick = () => scrollTo('hero-section');
  const handleOurVisionClick = () => scrollTo('our-vision-section');
  const handleHowItWorksClick = () => scrollTo('how-it-works-section');
  const handleExamplesClick = () => scrollTo('examples-section');
  const handleWhatToExpectClick = () => scrollTo('what-to-expect-section');

  return (
    <Box className={classes.root} data-testid="Header-root-container">
      <Box className={classes.headerContentContainer}>
        <Box onClick={handleLogoClick} className={classes.logoContainer}>
          <Typography variant="h4" className={classes.title}>
            ANA.AI
          </Typography>
        </Box>

        <Box className={classes.headerActionsContainer}>
          <Button onClick={handleOurVisionClick}>Our Vision</Button>
          <Button onClick={handleHowItWorksClick}>How it works</Button>
          <Button onClick={handleExamplesClick}>Examples</Button>
          <Button onClick={handleWhatToExpectClick}>What to expect</Button>
          <Button
            className={classes.goToAppButton}
            target="_blank"
            href="http://stg.anaai.art/"
            color="secondary"
            variant="contained"
          >
            Generate your art
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
