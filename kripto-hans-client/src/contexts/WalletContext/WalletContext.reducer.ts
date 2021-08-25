import { WalletReducerAction, ACTION_TYPES } from './WalletContext.actions';
import { IWalletContextState, initialState } from './WalletContext.state';

export const walletReducer = (
  state: IWalletContextState,
  action: WalletReducerAction
): IWalletContextState => {
  switch (action.type) {
    case ACTION_TYPES.SET_SNACK_MESSAGE:
      return {
        ...state,
        snackMessage: action.payload
      };
    case ACTION_TYPES.SET_ACCOUNTS:
      return action.payload.length
        ? {
            ...state,
            accounts: action.payload
          }
        : // Cleanup on user wallet account disconnect
          {
            ...state,
            accounts: action.payload,
            contract: null,
            events: { ...initialState.events },
            loading: { ...initialState.loading }
          };

    case ACTION_TYPES.SET_CONTRACT_INSTANCE:
      return {
        ...state,
        contract: action.payload
      };
    case ACTION_TYPES.SET_PAY_GENERATING_LOADING:
      return {
        ...state,
        loading: { ...state.loading, payGenerating: action.payload }
      };
    case ACTION_TYPES.SET_TOKEN_MINTED_EVENT:
      return {
        ...state,
        events: { ...state.events, tokenMinted: action.payload }
      };
    case ACTION_TYPES.SET_PAY_IMAGE_LOADING:
      return {
        ...state,
        loading: { ...state.loading, payImage: action.payload }
      };
    case ACTION_TYPES.SET_MINTED_TOKEN:
      return {
        ...state,
        mintedToken: action.payload
      };
    case ACTION_TYPES.SET_OWNERSHIP_TRANSFERRED_EVENT:
      return {
        ...state,
        events: { ...state.events, ownershipTransferred: action.payload },
        loading: { ...state.loading, payImage: false }
      };
    default: {
      throw new Error('unknown action type dispatched to `walletReducer`');
    }
  }
};