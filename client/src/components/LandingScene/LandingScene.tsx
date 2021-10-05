import { Box, Button, Typography } from '@material-ui/core';
import { useWallet } from 'contexts/WalletContext/WalletContext';
import { useHistory } from 'react-router-dom';
import { useStyles } from './LandingScene.styles';

export const LandingScene: React.FC<Record<string, unknown>> = () => {
  const {
    state: { accounts, transformations }
  } = useWallet();

  const isWalletConnected = accounts[0];

  const history = useHistory();

  const handleGenerateClick = () => {
    history.push(`/generate/${transformations?.[0].name}`);
  };

  const handleExploreClick = () => {
    history.push('/explore');
  };

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.heroContainer}>
        <Typography variant="h1" className={classes.heroTitle}>
          ANA
        </Typography>

        <Typography variant="h6" className={classes.heroSubtitle}>
          AI NFT Art
        </Typography>
      </Box>
    </Box>
  );
};
