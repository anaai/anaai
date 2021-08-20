export const NOTIFICATION_CLOSE_DELAY = 7000;

export const connectToMetaMaskSnackMessage = {
  type: 'info',
  message: 'Please connect your Wallet in order to proceed'
} as const;

export type SnackMessage = typeof connectToMetaMaskSnackMessage | null;