import MetaMaskOnboarding from '@metamask/onboarding';
import { connectToMetaMaskSnackMessage } from 'config/snacks/snacks';
import {
  createAddUserBoughtTokenEntitiesAction,
  createAddUserBoughtTokenIdsAction,
  createAddUserGeneratedTokenEntitiesAction,
  createAddUserGeneratedTokenIdsAction,
  createSetAccountsAction,
  createSetContractInstanceAction,
  createSetMintedTokenAction,
  createSetOwnershipTransferredEventAction,
  createSetPayGeneratingLoadingAction,
  createSetPayImageLoadingAction,
  createSetSnackMessageAction,
  createSetTokenMintedEventAction
} from './WalletContext.actions';
import { walletReducer } from './WalletContext.reducer';
import { initialState } from './WalletContext.state';
import { Contract } from 'web3-eth-contract';
import { TokenMintedEvent } from 'models/TokenMintedEvent.model';
import { MintedToken } from 'models/MintedToken.model';
import { OwnershipTransferredEvent } from 'models/OwnershipTransferredEvent.model';

test('Has appropriate initial state', () => {
  expect(initialState).toEqual({
    snackMessage: null,
    metaMaskOnboarding: expect.any(MetaMaskOnboarding),
    isMetaMaskInstalled: Boolean(window?.ethereum?.isMetaMask),
    accounts: [],
    web3Instance: null,
    contract: null,
    mintedToken: null,
    events: { tokenMinted: null, ownershipTransferred: null },
    loading: {
      payGenerating: false,
      payImage: false
    },
    tokens: {
      generated: {},
      bought: {}
    }
  });
});

test('SET_SNACK_MESSAGE', () => {
  const state = walletReducer(
    initialState,
    createSetSnackMessageAction(connectToMetaMaskSnackMessage)
  );

  const expectedState = {
    ...initialState,
    snackMessage: {
      type: 'info',
      message: 'Please connect your Wallet in order to proceed'
    }
  };

  expect(expectedState).toEqual(state);
});

test('SET_ACCOUNTS', () => {
  const mockAccounts = ['abc'];

  const state = walletReducer(initialState, createSetAccountsAction(mockAccounts));

  const expectedState = {
    ...initialState,
    accounts: ['abc']
  };

  expect(expectedState).toEqual(state);
});

test('SET_CONTRACT_INSTANCE', () => {
  const mockContract = {} as Contract;

  const state = walletReducer(initialState, createSetContractInstanceAction(mockContract));

  const expectedState = {
    ...initialState,
    contract: {}
  };

  expect(expectedState).toEqual(state);
});

test('SET_PAY_GENERATING_LOADING', () => {
  const isLoading = true;

  const state = walletReducer(initialState, createSetPayGeneratingLoadingAction(isLoading));

  const expectedState = {
    ...initialState,
    loading: {
      ...initialState.loading,
      payGenerating: true
    }
  };

  expect(expectedState).toEqual(state);
});

test('SET_TOKEN_MINTED_EVENT', () => {
  const mockTokenMintedEvent = {} as TokenMintedEvent;

  const state = walletReducer(initialState, createSetTokenMintedEventAction(mockTokenMintedEvent));

  const expectedState = {
    ...initialState,
    events: { ...initialState.events, tokenMinted: mockTokenMintedEvent }
  };

  expect(expectedState).toEqual(state);
});

test('SET_PAY_IMAGE_LOADING', () => {
  const isLoading = true;

  const state = walletReducer(initialState, createSetPayImageLoadingAction(isLoading));

  const expectedState = {
    ...initialState,
    loading: {
      ...initialState.loading,
      payImage: true
    }
  };

  expect(expectedState).toEqual(state);
});

test('SET_MINTED_TOKEN', () => {
  const mockMintedToken = {} as MintedToken;

  const state = walletReducer(initialState, createSetMintedTokenAction(mockMintedToken));

  const expectedState = {
    ...initialState,
    mintedToken: mockMintedToken
  };

  expect(expectedState).toEqual(state);
});

test('SET_OWNERSHIP_TRANSFERRED_EVENT', () => {
  const mockOwnershipTransferredEvent = {} as OwnershipTransferredEvent;

  const state = walletReducer(
    initialState,
    createSetOwnershipTransferredEventAction(mockOwnershipTransferredEvent)
  );

  const expectedState = {
    ...initialState,
    events: { ...initialState.events, ownershipTransferred: mockOwnershipTransferredEvent }
  };

  expect(expectedState).toEqual(state);
});

test('ADD_USER_GENERATED_TOKEN_IDS', () => {
  const mockTokenIds = ['1', '2'];

  const state = walletReducer(initialState, createAddUserGeneratedTokenIdsAction(mockTokenIds));

  const expectedState = {
    ...initialState,
    tokens: {
      ...initialState.tokens,
      generated: {
        '1': null,
        '2': null
      }
    }
  };

  expect(expectedState).toEqual(state);
});

test('ADD_USER_GENERATED_TOKEN_ENTITIES', () => {
  const mockEntity = {
    image: 'image-url',
    name: 'image-name'
  };
  const mockTokenEntities = { '1': mockEntity, '2': mockEntity };

  const state = walletReducer(
    initialState,
    createAddUserGeneratedTokenEntitiesAction(mockTokenEntities)
  );

  const expectedState = {
    ...initialState,
    tokens: {
      ...initialState.tokens,
      generated: { '1': mockEntity, '2': mockEntity }
    }
  };

  expect(expectedState).toEqual(state);
});

test('ADD_USER_BOUGHT_TOKEN_IDS', () => {
  const mockTokenIds = ['1', '2'];

  const state = walletReducer(initialState, createAddUserBoughtTokenIdsAction(mockTokenIds));

  const expectedState = {
    ...initialState,
    tokens: {
      ...initialState.tokens,
      bought: {
        '1': null,
        '2': null
      }
    }
  };

  expect(expectedState).toEqual(state);
});

test('ADD_USER_BOUGHT_TOKEN_ENTITIES', () => {
  const mockEntity = {
    image: 'image-url',
    name: 'image-name'
  };
  const mockTokenEntities = { '1': mockEntity, '2': mockEntity };

  const state = walletReducer(
    initialState,
    createAddUserBoughtTokenEntitiesAction(mockTokenEntities)
  );

  const expectedState = {
    ...initialState,
    tokens: {
      ...initialState.tokens,
      bought: { '1': mockEntity, '2': mockEntity }
    }
  };

  expect(expectedState).toEqual(state);
});
