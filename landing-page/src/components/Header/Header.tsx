import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useState, MouseEventHandler } from 'react';
import { useStyles } from './Header.styles';
import logo from 'assets/images/logo/anaai-logo.svg';

export const Header: React.FC<Record<string, unknown>> = () => {
  const classes = useStyles();

  const scrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    element && element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    scrollTo('hero-section');
  };
  const handleOurVisionClick = () => {
    scrollTo('our-vision-section');
  };
  const handleHowItWorksClick = () => {
    scrollTo('how-it-works-section');
  };
  const handleExamplesClick = () => {
    scrollTo('examples-section');
  };
  const handleWhatToExpectClick = () => {
    scrollTo('what-to-expect-section');
  };

  const handleContactClick = () => {
    scrollTo('footer-section');
  };

  const [menuAnchorEl, setMenuAnchorEl] = useState<Element | null>(null);

  const handleMenuClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const theme = useTheme();

  const matchesMdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box className={classes.root} data-testid="Header-root-container">
      <Box className={classes.headerContentContainer}>
        <Box onClick={handleLogoClick} className={classes.logoContainer}>
          <img className={classes.logo} src={logo} alt="logo" />
          {/* <Typography variant="h4" className={classes.title}>
            ANA.AI
          </Typography> */}
        </Box>

        <Box className={classes.headerActionsContainer}>
          {matchesMdDown ? (
            <>
              <Button
                size="small"
                className={classes.goToAppButton}
                target="_blank"
                href="https://stg2.anaai.art/"
                color="secondary"
                variant="contained"
                rel="noopener noreferrer"
              >
                Generate your art
              </Button>

              <IconButton size="small" className={classes.menuButton} onClick={handleMenuClick}>
                <MenuIcon />
              </IconButton>

              <Menu
                anchorEl={menuAnchorEl}
                keepMounted
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
                classes={{ paper: classes.dropdownMenuPaper }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                getContentAnchorEl={null}
              >
                <MenuItem className={classes.menuItem} onClick={handleOurVisionClick}>
                  Our Vision
                </MenuItem>
                <MenuItem className={classes.menuItem} onClick={handleHowItWorksClick}>
                  How it works
                </MenuItem>
                <MenuItem className={classes.menuItem} onClick={handleExamplesClick}>
                  Gallery
                </MenuItem>
                <MenuItem className={classes.menuItem} onClick={handleWhatToExpectClick}>
                  What to expect
                </MenuItem>
                <MenuItem className={classes.menuItem} onClick={handleContactClick}>
                  Contact
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button size="small" onClick={handleOurVisionClick}>
                Our Vision
              </Button>
              <Button size="small" onClick={handleHowItWorksClick}>
                How it works
              </Button>
              <Button size="small" onClick={handleExamplesClick}>
                Gallery
              </Button>
              <Button size="small" onClick={handleWhatToExpectClick}>
                What to expect
              </Button>
              <Button size="small" onClick={handleContactClick}>
                Contact
              </Button>
              <Button
                size="small"
                className={classes.goToAppButton}
                target="_blank"
                href="https://stg2.anaai.art/"
                color="secondary"
                variant="contained"
                rel="noopener noreferrer"
              >
                Generate your art
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};
