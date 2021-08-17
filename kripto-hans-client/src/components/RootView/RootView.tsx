import { LandingScene } from 'components/LandingScene/LandingScene';
import { createSetIsMetaMaskInstalledAction, useWallet } from 'contexts/WalletContext';
import { useEffect } from 'react';

export const RootView: React.FC<Record<string, unknown>> = () => {
  const { dispatch } = useWallet();

  const initMetaMask = () => {
    const { ethereum } = window;
    const isMetaMaskInstalled = Boolean(ethereum && ethereum.isMetaMask);
    if (isMetaMaskInstalled) {
      dispatch(createSetIsMetaMaskInstalledAction(isMetaMaskInstalled));
    }
  };

  useEffect(() => {
    initMetaMask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <LandingScene />;
};
