import {
  ACTION_TYPES,
  createSetAccountsAction,
  createSetContractInstanceAction,
  createSetMintedTokenAction,
  createSetOwnershipTransferredEventAction,
  createSetPayGeneratingLoadingAction,
  createSetPayImageLoadingAction,
  createSetSnackMessageAction,
  createSetTokenMintedEventAction,
  createSetTransformationsAction
} from './WalletContext.actions';
import { connectToMetaMaskSnackMessage } from 'config/snacks/snacks';
import { Contract } from 'web3-eth-contract';
import { TokenMintedEvent } from 'models/TokenMintedEvent.model';
import { MintedToken } from 'models/MintedToken.model';
import { OwnershipTransferredEvent } from 'models/OwnershipTransferredEvent.model';
import { Transformations } from 'models/Transformations.model';

test('createSetSnackMessageAction', () => {
  const action = createSetSnackMessageAction(connectToMetaMaskSnackMessage);

  const expectedAction = {
    type: ACTION_TYPES.SET_SNACK_MESSAGE,
    payload: connectToMetaMaskSnackMessage
  };

  expect(action).toEqual(expectedAction);
});

test('createSetAccountsAction', () => {
  const mockAccounts = ['abc'];

  const action = createSetAccountsAction(mockAccounts);

  const expectedAction = {
    type: ACTION_TYPES.SET_ACCOUNTS,
    payload: mockAccounts
  };

  expect(action).toEqual(expectedAction);
});

test('createSetContractInstanceAction', () => {
  const mockContract = {} as Contract;

  const action = createSetContractInstanceAction(mockContract);

  const expectedAction = {
    type: ACTION_TYPES.SET_CONTRACT_INSTANCE,
    payload: mockContract
  };

  expect(action).toEqual(expectedAction);
});

test('createSetPayGeneratingLoadingAction', () => {
  const isLoading = true;

  const action = createSetPayGeneratingLoadingAction(isLoading);

  const expectedAction = {
    type: ACTION_TYPES.SET_PAY_GENERATING_LOADING,
    payload: isLoading
  };

  expect(action).toEqual(expectedAction);
});

test('createSetTokenMintedEventAction', () => {
  const mockTokenMintedEvent = {} as TokenMintedEvent;

  const action = createSetTokenMintedEventAction(mockTokenMintedEvent);

  const expectedAction = {
    type: ACTION_TYPES.SET_TOKEN_MINTED_EVENT,
    payload: mockTokenMintedEvent
  };

  expect(action).toEqual(expectedAction);
});

test('createSetPayImageLoadingAction', () => {
  const isLoading = true;

  const action = createSetPayImageLoadingAction(isLoading);

  const expectedAction = {
    type: ACTION_TYPES.SET_PAY_IMAGE_LOADING,
    payload: isLoading
  };

  expect(action).toEqual(expectedAction);
});

test('createSetMintedTokenAction', () => {
  const mockMintedToken = {} as MintedToken;

  const action = createSetMintedTokenAction(mockMintedToken);

  const expectedAction = {
    type: ACTION_TYPES.SET_MINTED_TOKEN,
    payload: mockMintedToken
  };

  expect(action).toEqual(expectedAction);
});

test('createSetOwnershipTransferredEventAction', () => {
  const mockOwnershipTransferredEvent = {} as OwnershipTransferredEvent;

  const action = createSetOwnershipTransferredEventAction(mockOwnershipTransferredEvent);

  const expectedAction = {
    type: ACTION_TYPES.SET_OWNERSHIP_TRANSFERRED_EVENT,
    payload: mockOwnershipTransferredEvent
  };

  expect(action).toEqual(expectedAction);
});

test('createSetTransformationsAction', () => {
  const mockTransformations = {} as Transformations;

  const action = createSetTransformationsAction(mockTransformations);

  const expectedAction = {
    type: ACTION_TYPES.SET_TRANSFORMATIONS,
    payload: mockTransformations
  };

  expect(action).toEqual(expectedAction);
});
