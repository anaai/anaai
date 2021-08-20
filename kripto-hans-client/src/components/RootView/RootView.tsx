/* eslint-disable react/no-children-prop */
import { useCallback, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { GenerateScene } from 'components/GenerateScene/GenerateScene';
import { LandingScene } from 'components/LandingScene/LandingScene';
import { WalletConnector } from 'components/WalletConnector/WalletConnector';
import { createSetIsMetaMaskInstalledAction, useWallet } from 'contexts/WalletContext';
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

      <Switch>
        <Route exact path="/" component={LandingScene} />
        <Route exact path="/generate" component={GenerateScene} />
        <Route path="" render={() => <Redirect to="/" />} />
      </Switch>
    </Box>
  );
};
