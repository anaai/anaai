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
import { Contract } from 'web3-eth-contract';
import { TokenMintedEvent } from 'models/TokenMintedEvent.model';
import { generateSuccessSnackMessage } from 'config/snacks/snacks';
import { matchesConnectedAccount } from 'utils/matchers';
import {
  WalletReducerAction,
  createSetAccountsAction,
  createSetContractInstanceAction,
  createSetTokenMintedEventAction,
  createSetMintedTokenAction,
  createSetSnackMessageAction,
  createSetPayGeneratingLoadingAction,
  createSetOwnershipTransferredEventAction,
  createAddUserGeneratedTokenIdsAction,
  createAddUserBoughtTokenIdsAction,
  createSetTransformationsAction
} from './WalletContext.actions';
import { walletReducer } from './WalletContext.reducer';
import { IWalletContextState, initialState } from './WalletContext.state';
import { ZERO_ADDRESS } from './WalletContext.constants';
import { resolveTokenByTokenId } from 'utils/resolvers';

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
      if (contract && matchesConnectedAccount(accounts, event.returnValues.payer)) {
        dispatch(createSetTokenMintedEventAction(event));
        try {
          const mintedToken = await resolveTokenByTokenId(contract, event.returnValues.tokenId);
          console.debug('mintedToken: ', mintedToken);
          dispatch(createSetMintedTokenAction(mintedToken));
          dispatch(createSetSnackMessageAction(generateSuccessSnackMessage));
        } catch (error) {
          console.error(error);
        }
        dispatch(createSetPayGeneratingLoadingAction(false));
      }
    },
    [accounts, contract]
  );

  const onTokenTransferred = useCallback(
    async (error: Error, event: any) => {
      console.debug('tokenTransferredEvent: ', event);

      // Ignore init transfer on token mint
      if (event.returnValues.from === ZERO_ADDRESS) {
        return;
      }

      if (matchesConnectedAccount(accounts, event.returnValues.to)) {
        dispatch(createSetOwnershipTransferredEventAction(event));
      }
    },
    [accounts]
  );

  useEffect(() => {
    if (contract) {
      // TokenMinted event is sent in addition to Transfer event.
      // It is not possible to evaluate image generate payer (which is required in order to filter the correct pay generate flow result) from Transfer event, hence we need TokenMinted event handled too.
      contract.events.TokenMinted(onTokenMinted);
      contract.events.Transfer(
        {
          filter: { to: accounts }
        },
        onTokenTransferred
      );

      // Get user bought token ids
      getUserTokens(contract, accounts[0], dispatch);
      getTransformations(contract, dispatch);
    }
  }, [accounts, contract, onTokenMinted, onTokenTransferred]);

  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

const getUserTokens = async (
  contract: Contract,
  account: string,
  dispatch: Dispatch<WalletReducerAction>
) => {
  const [userGeneratedTokens, userBoughtTokens] = await Promise.all([
    contract.methods.userGeneratedTokens(account).call() as Promise<string[]>,
    contract.methods.userBoughtTokens(account).call() as Promise<string[]>
  ]);

  dispatch(createAddUserGeneratedTokenIdsAction(userGeneratedTokens));
  dispatch(createAddUserBoughtTokenIdsAction(userBoughtTokens));
};

const getTransformations = async (contract: Contract, dispatch: Dispatch<WalletReducerAction>) => {
  const transformations = (await contract.methods.listTransformations().call()) as any;
  console.log(transformations);

  dispatch(createSetTransformationsAction(transformations));
};

const useWallet = (): IWalletContext => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export { WalletProvider, useWallet };
