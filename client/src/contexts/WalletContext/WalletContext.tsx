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
import StyleArtContract from 'assets/contracts/StyleArt.json';
import { Contract } from 'web3-eth-contract';
import { generateSuccessSnackMessage } from 'config/snacks/snacks';
import {
  WalletReducerAction,
  createSetAccountsAction,
  createSetContractInstanceAction,
  createSetSnackMessageAction,
  createAddUserGeneratedTokenIdsAction,
  createSetTransformationsAction,
  createSetMintedTokenAction,
  createAddUserGeneratedTokenEntitiesAction,
  createSetPayGeneratingLoadingAction
} from './WalletContext.actions';
import { walletReducer } from './WalletContext.reducer';
import { IWalletContextState, initialState } from './WalletContext.state';
import { ZERO_ADDRESS } from './WalletContext.constants';
import { OwnershipTransferredEvent } from 'models/OwnershipTransferredEvent.model';
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
      const abi = StyleArtContract.abi;
      const address = process.env.REACT_APP_CONTRACT_ADDRESS;
      const web3Instance = new Web3(window.ethereum);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const contractInstance = new web3Instance.eth.Contract(abi as any, address);

      dispatch(createSetContractInstanceAction(contractInstance));
    }
  }, [accounts]);

  const onTokenTransferred = useCallback(
    async (error: Error, event: OwnershipTransferredEvent) => {
      console.debug('tokenTransferredEvent: ', event);

      if (contract) {
        // Token minted/image generated conditional
        if (event.returnValues.from === ZERO_ADDRESS) {
          const mintedToken = await resolveTokenByTokenId(contract, event.returnValues.tokenId);
          dispatch(createSetMintedTokenAction(mintedToken));
          dispatch(
            createAddUserGeneratedTokenEntitiesAction({ [event.returnValues.tokenId]: mintedToken })
          );
          dispatch(createSetSnackMessageAction(generateSuccessSnackMessage));
          dispatch(createSetPayGeneratingLoadingAction(false));
        }
      }
    },
    [contract]
  );

  useEffect(() => {
    if (contract) {
      contract.events.Transfer(
        {
          filter: { to: accounts }
        },
        onTokenTransferred
      );

      getUserTokens(contract, accounts[0], dispatch);
      getTransformations(contract, dispatch);
    }
  }, [accounts, contract, onTokenTransferred]);

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
  const [userGeneratedTokens] = await Promise.all([
    contract.methods.userGeneratedTokens(account).call() as Promise<string[]>
  ]);

  dispatch(createAddUserGeneratedTokenIdsAction(userGeneratedTokens));
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
