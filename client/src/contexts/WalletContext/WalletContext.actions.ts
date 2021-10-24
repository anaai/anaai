import { SnackMessage } from 'config/snacks/snacks';
import { MintedToken } from 'models/MintedToken.model';
import { Transformations } from 'models/Transformations.model';
import { Contract } from 'web3-eth-contract';
import { TokenCollection } from './WalletContext.state';

export const ACTION_TYPES = {
  SET_SNACK_MESSAGE: 'SET_SNACK_MESSAGE',
  SET_ACCOUNTS: 'SET_ACCOUNTS',
  SET_CONTRACT_INSTANCE: 'SET_CONTRACT_INSTANCE',
  SET_PAY_GENERATING_LOADING: 'SET_PAY_GENERATING_LOADING',
  SET_MINTED_TOKEN: 'SET_MINTED_TOKEN',
  SET_TRANSFORMATIONS: 'SET_TRANSFORMATIONS',
  SET_CHAIN_ID_HEX: 'SET_CHAIN_ID_HEX',
  ADD_USER_GENERATED_TOKEN_IDS: 'ADD_USER_GENERATED_TOKEN_IDS',
  ADD_USER_GENERATED_TOKEN_ENTITIES: 'ADD_USER_GENERATED_TOKEN_ENTITIES'
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

export const createSetMintedTokenAction = (mintedToken: MintedToken | null) =>
  ({
    type: ACTION_TYPES.SET_MINTED_TOKEN,
    payload: mintedToken
  } as const);

export const createSetTransformationsAction = (transformations: Transformations) =>
  ({
    type: ACTION_TYPES.SET_TRANSFORMATIONS,
    payload: transformations
  } as const);

export const createSetChainIdHexAction = (chainIdHex: string) => ({
  type: ACTION_TYPES.SET_CHAIN_ID_HEX,
  payload: chainIdHex
});

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

export type WalletReducerAction = ReturnType<
  | typeof createSetSnackMessageAction
  | typeof createSetAccountsAction
  | typeof createSetContractInstanceAction
  | typeof createSetPayGeneratingLoadingAction
  | typeof createSetMintedTokenAction
  | typeof createSetTransformationsAction
  | typeof createSetChainIdHexAction
  | typeof createAddUserGeneratedTokenIdsAction
  | typeof createAddUserGeneratedTokenEntitiesAction
>;
