import { Box, Button, Typography } from '@material-ui/core';
import { useStyles } from './MainSection.styles';

export const MainSection: React.FC<Record<string, unknown>> = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root} data-testid="MainSection-root-container">
      <Box className={classes.mainSectionContentContainer}>
        <Box className={classes.heroSectionContainer}>
          <Box className={classes.heroTextContainer}>
            <Typography variant="h3" className={classes.heroTitle}>
              ANA
            </Typography>
            <Typography variant="body1" className={classes.heroSubtitle}>
              AI GENERATED ART
            </Typography>
            <Typography variant="body1" className={classes.heroDescription}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus unde, enim illo ea
              velit maiores nihil ipsum. Doloremque amet perspiciatis velit nihil, illum officia
              illo odio quo laudantium ea reprehenderit.
            </Typography>
          </Box>

          <Box className={classes.heroImageContainer}>image placeholder</Box>
        </Box>
      </Box>
    </Box>
  );
};
