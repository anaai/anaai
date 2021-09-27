import MetaMaskOnboarding from '@metamask/onboarding';
import { connectToMetaMaskSnackMessage } from 'config/snacks/snacks';
import {
  createAddUserGeneratedTokenEntitiesAction,
  createAddUserGeneratedTokenIdsAction,
  createSetAccountsAction,
  createSetContractInstanceAction,
  createSetMintedTokenAction,
  createSetPayGeneratingLoadingAction,
  createSetSnackMessageAction,
  createSetTransformationsAction
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
    transformations: null,
    mintedToken: null,
    loading: {
      payGenerating: false
    },
    tokens: {
      generated: {}
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

test('SET_MINTED_TOKEN', () => {
  const mockMintedToken = {} as MintedToken;

  const state = walletReducer(initialState, createSetMintedTokenAction(mockMintedToken));

  const expectedState = {
    ...initialState,
    mintedToken: mockMintedToken
  };

  expect(expectedState).toEqual(state);
});

test('SET_TRANSFORMATIONS', () => {
  const mockTransformations = [
    {
      id: 'a',
      name: 'b',
      price: '1'
    }
  ];

  const state = walletReducer(initialState, createSetTransformationsAction(mockTransformations));

  const expectedState = {
    ...initialState,
    transformations: mockTransformations
  };

  expect(expectedState).toEqual(state);
});

describe('ADD_USER_GENERATED_TOKEN_IDS', () => {
  test('token collection is empty', () => {
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

  test('token collection is not empty', () => {
    const mockTokenIds = ['3', '4'];

    const state = walletReducer(
      {
        ...initialState,
        tokens: {
          ...initialState.tokens,
          generated: {
            '1': null,
            '2': null
          }
        }
      },
      createAddUserGeneratedTokenIdsAction(mockTokenIds)
    );

    const expectedState = {
      ...initialState,
      tokens: {
        ...initialState.tokens,
        generated: {
          '1': null,
          '2': null,
          '3': null,
          '4': null
        }
      }
    };

    expect(expectedState).toEqual(state);
  });

  test('token collection already contains token id', () => {
    const mockTokenIds = ['2', '3'];

    const state = walletReducer(
      {
        ...initialState,
        tokens: {
          ...initialState.tokens,
          generated: {
            '1': null,
            '2': null
          }
        }
      },
      createAddUserGeneratedTokenIdsAction(mockTokenIds)
    );

    const expectedState = {
      ...initialState,
      tokens: {
        ...initialState.tokens,
        generated: {
          '1': null,
          '2': null,
          '3': null
        }
      }
    };

    expect(expectedState).toEqual(state);
  });

  test('token collection already contains token metadata', () => {
    const mockTokenIds = ['2', '3'];
    const mockTokenEntities = { image: 'image-url', name: 'image-name' };

    const state = walletReducer(
      {
        ...initialState,
        tokens: {
          ...initialState.tokens,
          generated: {
            '1': null,
            '2': mockTokenEntities
          }
        }
      },
      createAddUserGeneratedTokenIdsAction(mockTokenIds)
    );

    const expectedState = {
      ...initialState,
      tokens: {
        ...initialState.tokens,
        generated: {
          '1': null,
          '2': mockTokenEntities,
          '3': null
        }
      }
    };

    expect(expectedState).toEqual(state);
  });
});

describe('ADD_USER_GENERATED_TOKEN_ENTITIES', () => {
  test('token collection is empty', () => {
    const mockTokenEntity = {
      image: 'image-url',
      name: 'image-name'
    };
    const mockTokenEntities = { '1': mockTokenEntity, '2': mockTokenEntity };

    const state = walletReducer(
      initialState,
      createAddUserGeneratedTokenEntitiesAction(mockTokenEntities)
    );

    const expectedState = {
      ...initialState,
      tokens: {
        ...initialState.tokens,
        generated: { '1': mockTokenEntity, '2': mockTokenEntity }
      }
    };

    expect(expectedState).toEqual(state);
  });

  test('token collection is not empty', () => {
    const mockTokenEntity = {
      image: 'image-url',
      name: 'image-name'
    };
    const mockTokenEntities = { '3': mockTokenEntity, '4': mockTokenEntity };

    const state = walletReducer(
      {
        ...initialState,
        tokens: {
          ...initialState.tokens,
          generated: {
            '1': mockTokenEntity,
            '2': mockTokenEntity
          }
        }
      },
      createAddUserGeneratedTokenEntitiesAction(mockTokenEntities)
    );

    const expectedState = {
      ...initialState,
      tokens: {
        ...initialState.tokens,
        generated: {
          '1': mockTokenEntity,
          '2': mockTokenEntity,
          '3': mockTokenEntity,
          '4': mockTokenEntity
        }
      }
    };

    expect(expectedState).toEqual(state);
  });

  test('token collection already contains token metadata', () => {
    const mockTokenEntity = {
      image: 'image-url',
      name: 'image-name'
    };
    const mockTokenEntities = { '2': mockTokenEntity, '3': mockTokenEntity };

    const state = walletReducer(
      {
        ...initialState,
        tokens: {
          ...initialState.tokens,
          generated: {
            '1': mockTokenEntity,
            '2': mockTokenEntity
          }
        }
      },
      createAddUserGeneratedTokenEntitiesAction(mockTokenEntities)
    );

    const expectedState = {
      ...initialState,
      tokens: {
        ...initialState.tokens,
        generated: {
          '1': mockTokenEntity,
          '2': mockTokenEntity,
          '3': mockTokenEntity
        }
      }
    };

    expect(expectedState).toEqual(state);
  });

  test('token collection is injected with token metadata if metadata is not present', () => {
    const mockTokenEntity = {
      image: 'image-url',
      name: 'image-name'
    };
    const mockTokenEntities = { '1': mockTokenEntity, '2': mockTokenEntity };

    const state = walletReducer(
      {
        ...initialState,
        tokens: {
          ...initialState.tokens,
          generated: {
            '1': null
            // token id '2' is not present in token collection
          }
        }
      },
      createAddUserGeneratedTokenEntitiesAction(mockTokenEntities)
    );

    const expectedState = {
      ...initialState,
      tokens: {
        ...initialState.tokens,
        generated: {
          '1': mockTokenEntity,
          '2': mockTokenEntity
        }
      }
    };

    expect(expectedState).toEqual(state);
  });
});
