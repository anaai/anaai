import { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react';
import MetaMaskOnboarding from '@metamask/onboarding';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

const ACTION_TYPES = {
  SET_IS_METAMASK_INSTALLED: 'SET_IS_METAMASK_INSTALLED',
  SET_ACCOUNTS: 'SET_ACCOUNTS',
  SET_WEB_3_INSTANCE: 'SET_WEB_3_INSTANCE',
  SET_CONTRACT_INSTANCE: 'SET_CONTRACT_INSTANCE'
} as const;

const createSetIsMetaMaskInstalledAction = (isMetaMaskInstalled: boolean) =>
  ({
    type: ACTION_TYPES.SET_IS_METAMASK_INSTALLED,
    payload: isMetaMaskInstalled
  } as const);

const createSetAccountsAction = (accounts: string[]) =>
  ({
    type: ACTION_TYPES.SET_ACCOUNTS,
    payload: accounts
  } as const);

const createSetWeb3InstanceAction = (web3Instance: Web3) =>
  ({
    type: ACTION_TYPES.SET_WEB_3_INSTANCE,
    payload: web3Instance
  } as const);

const createSetContractInstanceAction = (contract: Contract) =>
  ({
    type: ACTION_TYPES.SET_CONTRACT_INSTANCE,
    payload: contract
  } as const);

type WalletReducerAction = ReturnType<
  | typeof createSetIsMetaMaskInstalledAction
  | typeof createSetAccountsAction
  | typeof createSetWeb3InstanceAction
  | typeof createSetContractInstanceAction
>;

interface IWalletContextState {
  metaMaskOnboarding: MetaMaskOnboarding;
  isMetaMaskInstalled: boolean;
  accounts: ReadonlyArray<string>;
  web3Instance: Web3 | null;
  contract: Contract | null;
}

interface IWalletContext {
  state: IWalletContextState;
  dispatch: Dispatch<WalletReducerAction>;
}

const initialState: IWalletContextState = {
  metaMaskOnboarding: new MetaMaskOnboarding(),
  isMetaMaskInstalled: false,
  accounts: [],
  web3Instance: null,
  contract: null
} as const;

const WalletContext = createContext({} as IWalletContext); // Initial value is used when context is consumed outside of its provider, a case which shouldn't happen

const walletReducer = (state: IWalletContextState, action: WalletReducerAction) => {
  switch (action.type) {
    case ACTION_TYPES.SET_IS_METAMASK_INSTALLED:
    case ACTION_TYPES.SET_ACCOUNTS:
    case ACTION_TYPES.SET_WEB_3_INSTANCE:
    case ACTION_TYPES.SET_CONTRACT_INSTANCE:
      return state;
    default: {
      throw new Error('unknown action type dispatched to `walletReducer`');
    }
  }
};

const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(walletReducer, initialState);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };
  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

const useWallet = (): IWalletContext => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export { WalletProvider, useWallet };
