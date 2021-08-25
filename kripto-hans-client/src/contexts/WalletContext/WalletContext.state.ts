import { SnackMessage } from 'config/snacks/snacks';
import { MintedToken } from 'models/MintedToken.model';
import { TokenMintedEvent } from 'models/TokenMintedEvent.model';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import MetaMaskOnboarding from '@metamask/onboarding';

export type IWalletContextState = Readonly<{
  snackMessage: SnackMessage | null;
  metaMaskOnboarding: MetaMaskOnboarding;
  isMetaMaskInstalled: boolean;
  accounts: ReadonlyArray<string>;
  web3Instance: Web3 | null;
  contract: Contract | null;
  mintedToken: MintedToken | null;
  events: Readonly<{
    tokenMinted: TokenMintedEvent | null;
    ownershipTransferred: any;
  }>;
  loading: Readonly<{
    payGenerating: boolean;
    payImage: boolean;
  }>;
}>;

export const initialState: IWalletContextState = {
  snackMessage: null,
  metaMaskOnboarding: new MetaMaskOnboarding(),
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
} as const;
