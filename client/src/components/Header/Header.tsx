import { AppBar, Box, Button, Toolbar, Typography } from '@material-ui/core';
import { WalletConnector } from 'components/WalletConnector/WalletConnector';
import { useWallet } from 'contexts/WalletContext/WalletContext';
import { useHistory, useLocation } from 'react-router';
import { useStyles } from './Header.styles';

export const Header: React.FC<Record<string, unknown>> = () => {
  const {
    state: { accounts, transformations }
  } = useWallet();

  const isWalletConnected = accounts[0];

  const history = useHistory();
  const location = useLocation();

  const handleHomeClick = () => {
    history.push('/');
  };

  const handleGenerateClick = () => {
    history.push(`/generate/${transformations?.[0].name}`);
  };

  const handleTransformationsClick = () => {
    history.push('/transformations');
  };

  const handleMyArtClick = () => {
    history.push('/my-art');
  };

  const classes = useStyles();

  return (
    <Box className={classes.root} data-testid="Header-root-container">
      <AppBar position="static" color="secondary" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.logo}>
            ANA.AI
          </Typography>

          <WalletConnector />

          <Box className={`${classes.ctaButtonsContainer} ${isWalletConnected && classes.show}`}>
            <Button
              className={`${classes.generateButton} ${
                location.pathname === '/' ? classes.activeButton : 'undefined'
              }`}
              onClick={handleHomeClick}
            >
              Home
            </Button>

            <Button
              className={`${classes.generateButton} ${
                location.pathname.startsWith('/generate') ? classes.activeButton : 'undefined'
              }`}
              onClick={handleGenerateClick}
            >
              Generate
            </Button>

            <Button
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
              className={`${classes.myArtButton} ${
                location.pathname.startsWith('/my-art') ? classes.activeButton : 'undefined'
              }`}
              onClick={handleMyArtClick}
            >
              My Art
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
