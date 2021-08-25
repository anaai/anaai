import { SnackMessage } from 'config/snacks/snacks';
import { MintedToken } from 'models/MintedToken.model';
import { TokenMintedEvent } from 'models/TokenMintedEvent.model';
import { Contract } from 'web3-eth-contract';

export const ACTION_TYPES = {
  SET_SNACK_MESSAGE: 'SET_SNACK_MESSAGE',
  SET_ACCOUNTS: 'SET_ACCOUNTS',
  SET_CONTRACT_INSTANCE: 'SET_CONTRACT_INSTANCE',
  SET_PAY_GENERATING_LOADING: 'SET_PAY_GENERATING_LOADING',
  SET_TOKEN_MINTED_EVENT: 'SET_TOKEN_MINTED_EVENT',
  SET_PAY_IMAGE_LOADING: 'SET_PAY_IMAGE_LOADING',
  SET_MINTED_TOKEN: 'SET_MINTED_TOKEN',
  SET_OWNERSHIP_TRANSFERRED_EVENT: 'SET_OWNERSHIP_TRANSFERRED_EVENT'
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

export const createSetOwnershipTransferredEventAction = (event: any) =>
  ({
    type: ACTION_TYPES.SET_OWNERSHIP_TRANSFERRED_EVENT,
    payload: event
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
>;
