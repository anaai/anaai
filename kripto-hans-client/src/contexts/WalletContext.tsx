/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer
} from 'react';
import MetaMaskOnboarding from '@metamask/onboarding';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import StyleNFTContract from 'assets/contracts/StyleNFT.json';

const ACTION_TYPES = {
  SET_IS_METAMASK_INSTALLED: 'SET_IS_METAMASK_INSTALLED',
  SET_ACCOUNTS: 'SET_ACCOUNTS',
  SET_WEB_3_INSTANCE: 'SET_WEB_3_INSTANCE',
  SET_CONTRACT_INSTANCE: 'SET_CONTRACT_INSTANCE',
  SET_TOKEN_MINTED_EVENT: 'SET_TOKEN_MINTED_EVENT'
} as const;

export const createSetIsMetaMaskInstalledAction = (isMetaMaskInstalled: boolean) =>
  ({
    type: ACTION_TYPES.SET_IS_METAMASK_INSTALLED,
    payload: isMetaMaskInstalled
  } as const);

export const createSetAccountsAction = (accounts: string[]) =>
  ({
    type: ACTION_TYPES.SET_ACCOUNTS,
    payload: accounts
  } as const);

export const createSetContractInstanceAction = (contract: Contract) =>
  ({
    type: ACTION_TYPES.SET_CONTRACT_INSTANCE,
    payload: contract
  } as const);

export const createSetTokenMintedEventAction = (event: any) =>
  ({
    type: ACTION_TYPES.SET_TOKEN_MINTED_EVENT,
    payload: event
  } as const);

export type WalletReducerAction = ReturnType<
  | typeof createSetIsMetaMaskInstalledAction
  | typeof createSetAccountsAction
  | typeof createSetContractInstanceAction
  | typeof createSetTokenMintedEventAction
>;

interface IWalletContextState {
  metaMaskOnboarding: MetaMaskOnboarding;
  isMetaMaskInstalled: boolean;
  accounts: ReadonlyArray<string>;
  web3Instance: Web3 | null;
  contract: Contract | null;
  tokenMintedEvent: any;
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
  contract: null,
  tokenMintedEvent: null
} as const;

const WalletContext = createContext({
  state: initialState,
  dispatch: () => {
    void 0;
  }
} as IWalletContext); // Initial value is used when context is consumed outside of its provider, a case which shouldn't happen

const walletReducer = (
  state: IWalletContextState,
  action: WalletReducerAction
): IWalletContextState => {
  switch (action.type) {
    case ACTION_TYPES.SET_IS_METAMASK_INSTALLED:
      return {
        ...state,
        isMetaMaskInstalled: action.payload
      };
    case ACTION_TYPES.SET_ACCOUNTS:
      return action.payload.length
        ? {
            ...state,
            accounts: action.payload
          }
        : {
            ...state,
            accounts: action.payload,
            // Cleanup on user wallet account disconnect
            contract: null,
            tokenMintedEvent: null
          };

    case ACTION_TYPES.SET_CONTRACT_INSTANCE:
      return {
        ...state,
        contract: action.payload
      };
    case ACTION_TYPES.SET_TOKEN_MINTED_EVENT:
      return {
        ...state,
        tokenMintedEvent: action.payload
      };
    default: {
      throw new Error('unknown action type dispatched to `walletReducer`');
    }
  }
};

const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(walletReducer, initialState);

  const { isMetaMaskInstalled, accounts, contract } = state;

  const watchEthereumAccountsChange = useCallback(() => {
    const onAccountsChanged = (newAccounts: string[]) => {
      dispatch(createSetAccountsAction(newAccounts));
    };
    const { ethereum } = window;
    ethereum.on('accountsChanged', onAccountsChanged);
  }, [dispatch]);

  useEffect(() => {
    if (isMetaMaskInstalled) {
      watchEthereumAccountsChange();
    }
  }, [isMetaMaskInstalled, watchEthereumAccountsChange]);

  useEffect(() => {
    if (accounts.length) {
      const abi = StyleNFTContract.abi;
      const address = process.env.REACT_APP_CONTRACT_ADDRESS;
      const web3Instance = new Web3(window.ethereum);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const contractInstance = new web3Instance.eth.Contract(abi as any, address);

      dispatch(createSetContractInstanceAction(contractInstance));
    }
  }, [accounts]);

  useEffect(() => {
    if (contract) {
      contract.events.TokenMinted(
        { filter: { payer: accounts[0] } },
        async (error: Error, event: any) => {
          console.warn('EVENT RECIEVED: ', event);
          dispatch(createSetTokenMintedEventAction(event));
        }
      );
    }
  }, [contract, accounts]);

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
