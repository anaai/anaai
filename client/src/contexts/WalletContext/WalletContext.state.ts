import { SnackMessage } from 'config/snacks/snacks';
import { MintedToken } from 'models/MintedToken.model';
import { TokenMintedEvent } from 'models/TokenMintedEvent.model';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import MetaMaskOnboarding from '@metamask/onboarding';
import { OwnershipTransferredEvent } from 'models/OwnershipTransferredEvent.model';
import { Transformations } from 'models/Transformations.model';

export type IWalletContextState = Readonly<{
  snackMessage: SnackMessage | null;
  metaMaskOnboarding: MetaMaskOnboarding;
  isMetaMaskInstalled: boolean;
  accounts: ReadonlyArray<string>;
  web3Instance: Web3 | null;
  contract: Contract | null;
  transformations: Transformations | null;
  mintedToken: MintedToken | null;
  events: Readonly<{
    tokenMinted: TokenMintedEvent | null;
    ownershipTransferred: OwnershipTransferredEvent | null;
  }>;
  loading: Readonly<{
    payGenerating: boolean;
    payImage: boolean;
  }>;
  tokens: Readonly<{
    generated: TokenCollection;
    bought: TokenCollection;
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
  web3Instance: null,
  contract: null,
  transformations: null,
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
} as const;
