/* eslint-disable react/no-children-prop */
import { LandingScene } from 'components/LandingScene/LandingScene';
import { createSetIsMetaMaskInstalledAction, useWallet } from 'contexts/WalletContext';
import { useCallback, useEffect } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

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

  const location = useLocation();

  return (
    <AnimatedSwitch atEnter={{ opacity: 0 }} atLeave={{ opacity: 0 }} atActive={{ opacity: 1 }}>
      <Route exact path="/" component={LandingScene} />
      <Route path="" render={() => <Redirect to="/" />} />
    </AnimatedSwitch>
  );
};
