/* eslint-disable react/no-children-prop */
import { Box } from '@material-ui/core';
import { LandingScene } from 'components/LandingScene/LandingScene';
import { WalletConnector } from 'components/WalletConnector/WalletConnector';
import { createSetIsMetaMaskInstalledAction, useWallet } from 'contexts/WalletContext';
import { useCallback, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import { useStyles } from './RootView.styles';

export const RootView: React.FC<Record<string, unknown>> = () => {
  const { dispatch } = useWallet();

  const initMetaMask = useCallback(() => {
    const { ethereum } = window;
    const isMetaMaskInstalled = Boolean(ethereum && ethereum.isMetaMask);
    if (isMetaMaskInstalled) {
      dispatch(createSetIsMetaMaskInstalledAction(isMetaMaskInstalled));
    }
  }, [dispatch]);

  useEffect(() => {
    initMetaMask();
  }, [initMetaMask]);

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.headerContainer}>
        <WalletConnector />
      </Box>

      <AnimatedSwitch
        className={classes.contentContainer}
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
      >
        <Route exact path="/" component={LandingScene} />
        <Route path="" render={() => <Redirect to="/" />} />
      </AnimatedSwitch>
    </Box>
  );
};
