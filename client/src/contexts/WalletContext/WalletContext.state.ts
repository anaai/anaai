import { SnackMessage } from 'config/snacks/snacks';
import { MintedToken } from 'models/MintedToken.model';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import MetaMaskOnboarding from '@metamask/onboarding';
import { Transformations } from 'models/Transformations.model';

export type IWalletContextState = Readonly<{
  snackMessage: SnackMessage | null;
  metaMaskOnboarding: MetaMaskOnboarding;
  isMetaMaskInstalled: boolean;
  accounts: ReadonlyArray<string>;
  chainIdHex: string | null;
  web3Instance: Web3 | null;
  contract: Contract | null;
  transformations: Transformations | null;
  mintedToken: MintedToken | null;
  loading: Readonly<{
    payGenerating: boolean;
  }>;
  tokens: Readonly<{
    generated: TokenCollection;
  }>;
}>;

export type TokenCollection = Readonly<{
  [tokenId: string]: MintedToken | null;
}>;

export const initialState: IWalletContextState = {
  snackMessage: null,
  metaMaskOnboarding: new MetaMaskOnboarding(),
  isMetaMaskInstalled: Boolean(window?.ethereum?.isMetaMask),
  accounts: [],
  chainIdHex: null,
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
} as const;
