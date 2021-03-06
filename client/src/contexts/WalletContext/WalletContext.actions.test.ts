import {
  ACTION_TYPES,
  createAddUserGeneratedTokenEntitiesAction,
  createAddUserGeneratedTokenIdsAction,
  createSetAccountsAction,
  createSetChainIdHexAction,
  createSetContractInstanceAction,
  createSetMintedTokenAction,
  createSetPayGeneratingLoadingAction,
  createSetSnackMessageAction,
  createSetTransformationsAction
} from './WalletContext.actions';
import { connectToMetaMaskSnackMessage } from 'config/snacks/snacks';
import { Contract } from 'web3-eth-contract';
import { MintedToken } from 'models/MintedToken.model';
import { OwnershipTransferredEvent } from 'models/OwnershipTransferredEvent.model';
import { Transformations } from 'models/Transformations.model';
import { TokenCollection } from './WalletContext.state';

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

test('createSetMintedTokenAction', () => {
  const mockMintedToken = {} as MintedToken;

  const action = createSetMintedTokenAction(mockMintedToken);

  const expectedAction = {
    type: ACTION_TYPES.SET_MINTED_TOKEN,
    payload: mockMintedToken
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

test('createSetChainIdHexAction', () => {
  const mockChainIdHex = '0x1';

  const action = createSetChainIdHexAction(mockChainIdHex);

  const expectedAction = {
    type: ACTION_TYPES.SET_CHAIN_ID_HEX,
    payload: mockChainIdHex
  };

  expect(action).toEqual(expectedAction);
});

test('createAddUserGeneratedTokenIdsAction', () => {
  const mockUserGeneratedTokenIds = ['1', '2', '3'];

  const action = createAddUserGeneratedTokenIdsAction(mockUserGeneratedTokenIds);

  const expectedAction = {
    type: ACTION_TYPES.ADD_USER_GENERATED_TOKEN_IDS,
    payload: mockUserGeneratedTokenIds
  };

  expect(action).toEqual(expectedAction);
});

test('createAddUserGeneratedTokenEntitiesAction', () => {
  const mockUserGeneratedEntities = {
    '1': {
      image: 'mockUrl',
      name: 'mockName'
    }
  } as TokenCollection;
  const action = createAddUserGeneratedTokenEntitiesAction(mockUserGeneratedEntities);

  const expectedAction = {
    type: ACTION_TYPES.ADD_USER_GENERATED_TOKEN_ENTITIES,
    payload: mockUserGeneratedEntities
  };

  expect(action).toEqual(expectedAction);
});
