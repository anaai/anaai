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
import { TokenMintedEvent } from 'models/TokenMintedEvent.model';
import { SnackMessage } from 'models/SnackMessage.model';

const ACTION_TYPES = {
  SET_SNACK_MESSAGE: 'SET_SNACK_MESSAGE',
  SET_ACCOUNTS: 'SET_ACCOUNTS',
  SET_WEB_3_INSTANCE: 'SET_WEB_3_INSTANCE',
  SET_CONTRACT_INSTANCE: 'SET_CONTRACT_INSTANCE',
  SET_PAY_GENERATING_LOADING: 'SET_PAY_GENERATING_LOADING',
  SET_TOKEN_MINTED_EVENT: 'SET_TOKEN_MINTED_EVENT',
  SET_PAY_IMAGE_LOADING: 'SET_PAY_IMAGE_LOADING',
  SET_OWNERSHIP_TRANSFERRED_EVENT: 'SET_OWNERSHIP_TRANSFERRED_EVENT'
} as const;

export const createSetConnectToMetaMaskMessageAction = (snackMessage: SnackMessage) =>
  ({
    type: ACTION_TYPES.SET_SNACK_MESSAGE,
    payload: snackMessage
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

export const createSetPayGeneratingLoadingAction = (loading: boolean) =>
  ({
    type: ACTION_TYPES.SET_PAY_GENERATING_LOADING,
    payload: loading
  } as const);

export const createSetTokenMintedEventAction = (event: TokenMintedEvent) =>
  ({
    type: ACTION_TYPES.SET_TOKEN_MINTED_EVENT,
    payload: event
  } as const);

export const createSetPayImageLoadingAction = (loading: boolean) =>
  ({
    type: ACTION_TYPES.SET_PAY_IMAGE_LOADING,
    payload: loading
  } as const);

export const createSetOwnershipTransferredEventAction = (event: any) =>
  ({
    type: ACTION_TYPES.SET_OWNERSHIP_TRANSFERRED_EVENT,
    payload: event
  } as const);

export type WalletReducerAction = ReturnType<
  | typeof createSetConnectToMetaMaskMessageAction
  | typeof createSetAccountsAction
  | typeof createSetContractInstanceAction
  | typeof createSetTokenMintedEventAction
  | typeof createSetPayGeneratingLoadingAction
  | typeof createSetPayImageLoadingAction
  | typeof createSetOwnershipTransferredEventAction
>;

interface IWalletContextState {
  snackMessage: SnackMessage | null;
  metaMaskOnboarding: MetaMaskOnboarding;
  isMetaMaskInstalled: boolean;
  accounts: ReadonlyArray<string>;
  web3Instance: Web3 | null;
  contract: Contract | null;
  events: {
    tokenMinted: TokenMintedEvent | null;
    ownershipTransferred: any;
  };
  loading: {
    payGenerating: boolean;
    payImage: boolean;
  };
}

interface IWalletContext {
  state: IWalletContextState;
  dispatch: Dispatch<WalletReducerAction>;
}

const initialState: IWalletContextState = {
  snackMessage: null,
  metaMaskOnboarding: new MetaMaskOnboarding(),
  isMetaMaskInstalled: Boolean(window?.ethereum?.isMetaMask),
  accounts: [],
  web3Instance: null,
  contract: null,
  events: { tokenMinted: null, ownershipTransferred: null },
  loading: {
    payGenerating: false,
    payImage: false
  }
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
    case ACTION_TYPES.SET_SNACK_MESSAGE:
      return {
        ...state,
        snackMessage: action.payload
      };
    case ACTION_TYPES.SET_ACCOUNTS:
      return action.payload.length
        ? {
            ...state,
            accounts: action.payload
          }
        : // Cleanup on user wallet account disconnect
          {
            ...state,
            accounts: action.payload,
            contract: null,
            events: { ...initialState.events },
            loading: { ...initialState.loading }
          };

    case ACTION_TYPES.SET_CONTRACT_INSTANCE:
      return {
        ...state,
        contract: action.payload
      };
    case ACTION_TYPES.SET_PAY_GENERATING_LOADING:
      return {
        ...state,
        loading: { ...state.loading, payGenerating: action.payload }
      };
    case ACTION_TYPES.SET_TOKEN_MINTED_EVENT:
      return {
        ...state,
        events: { ...state.events, tokenMinted: action.payload },
        loading: { ...state.loading, payGenerating: false }
      };
    case ACTION_TYPES.SET_PAY_IMAGE_LOADING:
      return {
        ...state,
        loading: { ...state.loading, payImage: action.payload }
      };
    case ACTION_TYPES.SET_OWNERSHIP_TRANSFERRED_EVENT:
      return {
        ...state,
        events: { ...state.events, ownershipTransferred: action.payload },
        loading: { ...state.loading, payImage: false }
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
