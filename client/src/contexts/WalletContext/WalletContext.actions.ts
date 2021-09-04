import { SnackMessage } from 'config/snacks/snacks';
import { MintedToken } from 'models/MintedToken.model';
import { OwnershipTransferredEvent } from 'models/OwnershipTransferredEvent.model';
import { TokenMintedEvent } from 'models/TokenMintedEvent.model';
import { Contract } from 'web3-eth-contract';
import { TokenCollection } from './WalletContext.state';

export const ACTION_TYPES = {
  SET_SNACK_MESSAGE: 'SET_SNACK_MESSAGE',
  SET_ACCOUNTS: 'SET_ACCOUNTS',
  SET_CONTRACT_INSTANCE: 'SET_CONTRACT_INSTANCE',
  SET_PAY_GENERATING_LOADING: 'SET_PAY_GENERATING_LOADING',
  SET_TOKEN_MINTED_EVENT: 'SET_TOKEN_MINTED_EVENT',
  SET_PAY_IMAGE_LOADING: 'SET_PAY_IMAGE_LOADING',
  SET_MINTED_TOKEN: 'SET_MINTED_TOKEN',
  SET_OWNERSHIP_TRANSFERRED_EVENT: 'SET_OWNERSHIP_TRANSFERRED_EVENT',
  ADD_USER_GENERATED_TOKEN_IDS: 'ADD_USER_GENERATED_TOKEN_IDS',
  ADD_USER_GENERATED_TOKEN_ENTITIES: 'ADD_USER_GENERATED_TOKEN_ENTITIES',
  ADD_USER_BOUGHT_TOKEN_IDS: 'ADD_USER_BOUGHT_TOKEN_IDS',
  ADD_USER_BOUGHT_TOKEN_ENTITIES: 'ADD_USER_BOUGHT_TOKEN_ENTITIES'
} as const;

export const createSetSnackMessageAction = (snackMessage: SnackMessage) =>
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

export const createSetMintedTokenAction = (mintedToken: MintedToken) =>
  ({
    type: ACTION_TYPES.SET_MINTED_TOKEN,
    payload: mintedToken
  } as const);

export const createSetOwnershipTransferredEventAction = (event: OwnershipTransferredEvent) =>
  ({
    type: ACTION_TYPES.SET_OWNERSHIP_TRANSFERRED_EVENT,
    payload: event
  } as const);

export const createAddUserGeneratedTokenIdsAction = (userGeneratedTokenIds: string[]) =>
  ({
    type: ACTION_TYPES.ADD_USER_GENERATED_TOKEN_IDS,
    payload: userGeneratedTokenIds
  } as const);

export const createAddUserGeneratedTokenEntitiesAction = (userGeneratedEntities: TokenCollection) =>
  ({
    type: ACTION_TYPES.ADD_USER_GENERATED_TOKEN_ENTITIES,
    payload: userGeneratedEntities
  } as const);

export const createAddUserBoughtTokenIdsAction = (userBoughtTokenIds: string[]) =>
  ({
    type: ACTION_TYPES.ADD_USER_BOUGHT_TOKEN_IDS,
    payload: userBoughtTokenIds
  } as const);

export const createAddUserBoughtTokenEntitiesAction = (userBoughtEntities: TokenCollection) =>
  ({
    type: ACTION_TYPES.ADD_USER_BOUGHT_TOKEN_ENTITIES,
    payload: userBoughtEntities
  } as const);

export type WalletReducerAction = ReturnType<
  | typeof createSetSnackMessageAction
  | typeof createSetAccountsAction
  | typeof createSetContractInstanceAction
  | typeof createSetTokenMintedEventAction
  | typeof createSetPayGeneratingLoadingAction
  | typeof createSetPayImageLoadingAction
  | typeof createSetMintedTokenAction
  | typeof createSetOwnershipTransferredEventAction
  | typeof createAddUserGeneratedTokenIdsAction
  | typeof createAddUserGeneratedTokenEntitiesAction
  | typeof createAddUserBoughtTokenIdsAction
  | typeof createAddUserBoughtTokenEntitiesAction
>;
