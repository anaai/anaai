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
import Web3 from 'web3';
import StyleNFTContract from 'assets/contracts/StyleNFT.json';
import { TokenMintedEvent } from 'models/TokenMintedEvent.model';
import { generateSuccessSnackMessage } from 'config/snacks/snacks';
import axios from 'axios';
import { matchesConnectedAccount } from 'utils/matchers';
import {
  WalletReducerAction,
  createSetAccountsAction,
  createSetContractInstanceAction,
  createSetTokenMintedEventAction,
  createSetMintedTokenAction,
  createSetSnackMessageAction,
  createSetPayGeneratingLoadingAction
} from './WalletContext.actions';
import { walletReducer } from './WalletContext.reducer';
import { IWalletContextState, initialState } from './WalletContext.state';

interface IWalletContext {
  state: IWalletContextState;
  dispatch: Dispatch<WalletReducerAction>;
}

const WalletContext = createContext({
  state: initialState,
  dispatch: () => {
    void 0;
  }
} as IWalletContext); // Initial value is used when context is consumed outside of its provider, a case which shouldn't happen

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

  const onTokenMinted = useCallback(
    async (error: Error, event: TokenMintedEvent) => {
      console.debug('tokenMintedEvent: ', event);
      if (matchesConnectedAccount(accounts, event.returnValues.payer)) {
        dispatch(createSetTokenMintedEventAction(event));
        try {
          const { data: mintedToken } = await axios.get(event.returnValues.tokenURI);
          console.debug('mintedToken: ', mintedToken);
          dispatch(createSetMintedTokenAction(mintedToken));
          dispatch(createSetSnackMessageAction(generateSuccessSnackMessage));
        } catch (error) {
          console.error(error);
        }
        dispatch(createSetPayGeneratingLoadingAction(false));
      }
    },
    [accounts]
  );

  useEffect(() => {
    if (contract) {
      contract.events.TokenMinted(onTokenMinted);
    }
  }, [accounts, contract, onTokenMinted]);

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
