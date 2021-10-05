import { Box, Button } from '@material-ui/core';
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
      <Box className={`${classes.ctaButtonsContainer} ${isWalletConnected && classes.show}`}>
        <Button
          className={classes.generateButton}
          variant="contained"
          color={location.pathname === '/' ? 'primary' : 'secondary'}
          onClick={handleHomeClick}
        >
          Home
        </Button>

        <Button
          className={classes.generateButton}
          variant="contained"
          color={location.pathname.startsWith('/generate') ? 'primary' : 'secondary'}
          onClick={handleGenerateClick}
        >
          Generate
        </Button>

        <Button
          className={classes.transformationsButton}
          variant="contained"
          color={location.pathname.startsWith('/transformations') ? 'primary' : 'secondary'}
          onClick={handleTransformationsClick}
        >
          Transformations
        </Button>

        <Button
          className={classes.myArtButton}
          variant="contained"
          color={location.pathname.startsWith('/my-art') ? 'primary' : 'secondary'}
          onClick={handleMyArtClick}
        >
          My Art
        </Button>
      </Box>

      <WalletConnector />
    </Box>
  );
};
