import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme
} from '@material-ui/core';
import { WalletConnector } from 'components/WalletConnector/WalletConnector';
import { useWallet } from 'contexts/WalletContext/WalletContext';
import { useHistory, useLocation } from 'react-router';
import { useStyles } from './Header.styles';
import MenuIcon from '@material-ui/icons/Menu';
import { MouseEventHandler, useState } from 'react';
import AnaAILogo from 'assets/images/logos/anaai-logo.svg';

export const Header: React.FC<Record<string, unknown>> = () => {
  const {
    state: { accounts, transformations, chainIdHex }
  } = useWallet();

  const isWalletConnected = accounts[0];
  const isCorrectChainId = chainIdHex === process.env.REACT_APP_CHAIN_ID_HEX;
  const shouldAllowEntry = isWalletConnected && isCorrectChainId;

  const history = useHistory();
  const location = useLocation();

  const handleHomeClick = () => {
    history.push('/');
  };

  const handleGenerateClick = () => {
    history.push(`/generate/${transformations?.[0].name}`);
    handleMenuClose();
  };

  const handleTransformationsClick = () => {
    history.push('/transformations');
    handleMenuClose();
  };

  const handleMyArtClick = () => {
    history.push('/my-art');
    handleMenuClose();
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

  const classes = useStyles();

  return (
    <Box className={classes.root} data-testid="Header-root-container">
      <Box className={classes.appBar}>
        <Box className={classes.toolbar}>
          <Box className={classes.logoContainer} onClick={handleHomeClick}>
            <img className={classes.logo} src={AnaAILogo} alt="anaai logo" />
          </Box>
          <Box className={classes.spacerBox} />

          {matchesMdDown ? (
            <>
              <WalletConnector />

              <IconButton
                size="small"
                className={`${classes.menuButton} ${shouldAllowEntry && classes.show}`}
                onClick={handleMenuClick}
              >
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
                <MenuItem
                  className={`${classes.menuItem} ${
                    location.pathname.startsWith('/generate') ? classes.activeButton : 'undefined'
                  }`}
                  onClick={handleGenerateClick}
                >
                  Generate
                </MenuItem>
                <MenuItem
                  className={`${classes.menuItem} ${
                    location.pathname.startsWith('/transformations')
                      ? classes.activeButton
                      : 'undefined'
                  }`}
                  onClick={handleTransformationsClick}
                >
                  Transformations
                </MenuItem>
                <MenuItem
                  className={`${classes.menuItem} ${
                    location.pathname.startsWith('/my-art') ? classes.activeButton : 'undefined'
                  }`}
                  onClick={handleMyArtClick}
                >
                  My Art
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Box className={`${classes.ctaButtonsContainer} ${shouldAllowEntry && classes.show}`}>
                <Button
                  size="small"
                  className={`${classes.generateButton} ${
                    location.pathname.startsWith('/generate') ? classes.activeButton : 'undefined'
                  }`}
                  onClick={handleGenerateClick}
                >
                  Generate
                </Button>

                <Button
                  size="small"
                  className={`${classes.transformationsButton} ${
                    location.pathname.startsWith('/transformations')
                      ? classes.activeButton
                      : 'undefined'
                  }`}
                  onClick={handleTransformationsClick}
                >
                  Transformations
                </Button>

                <Button
                  size="small"
                  className={`${classes.myArtButton} ${
                    location.pathname.startsWith('/my-art') ? classes.activeButton : 'undefined'
                  }`}
                  onClick={handleMyArtClick}
                >
                  My Art
                </Button>
              </Box>

              <WalletConnector />
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};
