import MetaMaskOnboarding from '@metamask/onboarding';
import { connectToMetaMaskSnackMessage } from 'config/snacks/snacks';
import {
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
    }
  });
});

test('SET_SNACK_MESSAGE', () => {
  const state = walletReducer(
    initialState,
    createSetSnackMessageAction(connectToMetaMaskSnackMessage)
  );

  const expectedState = {
    snackMessage: {
      type: 'info',
      message: 'Please connect your Wallet in order to proceed'
    },
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
    }
  };

  expect(expectedState).toEqual(state);
});

test('SET_ACCOUNTS', () => {
  const mockAccounts = ['abc'];

  const state = walletReducer(initialState, createSetAccountsAction(mockAccounts));

  const expectedState = {
    snackMessage: null,
    metaMaskOnboarding: expect.any(MetaMaskOnboarding),
    isMetaMaskInstalled: Boolean(window?.ethereum?.isMetaMask),
    accounts: ['abc'],
    web3Instance: null,
    contract: null,
    mintedToken: null,
    events: { tokenMinted: null, ownershipTransferred: null },
    loading: {
      payGenerating: false,
      payImage: false
    }
  };

  expect(expectedState).toEqual(state);
});

test('SET_CONTRACT_INSTANCE', () => {
  const mockContract = {} as Contract;

  const state = walletReducer(initialState, createSetContractInstanceAction(mockContract));

  const expectedState = {
    snackMessage: null,
    metaMaskOnboarding: expect.any(MetaMaskOnboarding),
    isMetaMaskInstalled: Boolean(window?.ethereum?.isMetaMask),
    accounts: [],
    web3Instance: null,
    contract: {},
    mintedToken: null,
    events: { tokenMinted: null, ownershipTransferred: null },
    loading: {
      payGenerating: false,
      payImage: false
    }
  };

  expect(expectedState).toEqual(state);
});

test('SET_PAY_GENERATING_LOADING', () => {
  const isLoading = true;

  const state = walletReducer(initialState, createSetPayGeneratingLoadingAction(isLoading));

  const expectedState = {
    snackMessage: null,
    metaMaskOnboarding: expect.any(MetaMaskOnboarding),
    isMetaMaskInstalled: Boolean(window?.ethereum?.isMetaMask),
    accounts: [],
    web3Instance: null,
    contract: null,
    mintedToken: null,
    events: { tokenMinted: null, ownershipTransferred: null },
    loading: {
      payGenerating: true,
      payImage: false
    }
  };

  expect(expectedState).toEqual(state);
});

test('SET_TOKEN_MINTED_EVENT', () => {
  const mockTokenMintedEvent = {} as TokenMintedEvent;

  const state = walletReducer(initialState, createSetTokenMintedEventAction(mockTokenMintedEvent));

  const expectedState = {
    snackMessage: null,
    metaMaskOnboarding: expect.any(MetaMaskOnboarding),
    isMetaMaskInstalled: Boolean(window?.ethereum?.isMetaMask),
    accounts: [],
    web3Instance: null,
    contract: null,
    mintedToken: null,
    events: { tokenMinted: mockTokenMintedEvent, ownershipTransferred: null },
    loading: {
      payGenerating: false,
      payImage: false
    }
  };

  expect(expectedState).toEqual(state);
});

test('SET_PAY_IMAGE_LOADING', () => {
  const isLoading = true;

  const state = walletReducer(initialState, createSetPayImageLoadingAction(isLoading));

  const expectedState = {
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
      payImage: true
    }
  };

  expect(expectedState).toEqual(state);
});

test('SET_MINTED_TOKEN', () => {
  const mockMintedToken = {} as MintedToken;

  const state = walletReducer(initialState, createSetMintedTokenAction(mockMintedToken));

  const expectedState = {
    snackMessage: null,
    metaMaskOnboarding: expect.any(MetaMaskOnboarding),
    isMetaMaskInstalled: Boolean(window?.ethereum?.isMetaMask),
    accounts: [],
    web3Instance: null,
    contract: null,
    mintedToken: mockMintedToken,
    events: { tokenMinted: null, ownershipTransferred: null },
    loading: {
      payGenerating: false,
      payImage: false
    }
  };

  expect(expectedState).toEqual(state);
});

test('SET_OWNERSHIP_TRANSFERRED_EVENT', () => {
  const mockOwnershipTransferredEvent = {};

  const state = walletReducer(
    initialState,
    createSetOwnershipTransferredEventAction(mockOwnershipTransferredEvent)
  );

  const expectedState = {
    snackMessage: null,
    metaMaskOnboarding: expect.any(MetaMaskOnboarding),
    isMetaMaskInstalled: Boolean(window?.ethereum?.isMetaMask),
    accounts: [],
    web3Instance: null,
    contract: null,
    mintedToken: null,
    events: { tokenMinted: null, ownershipTransferred: {} },
    loading: {
      payGenerating: false,
      payImage: false
    }
  };

  expect(expectedState).toEqual(state);
});
