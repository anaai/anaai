import { LandingScene } from 'components/LandingScene/LandingScene';
import { createSetIsMetaMaskInstalledAction, useWallet } from 'contexts/WalletContext';
import { useCallback, useEffect } from 'react';

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

  return <LandingScene />;
};
