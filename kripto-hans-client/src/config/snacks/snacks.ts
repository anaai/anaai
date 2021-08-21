export const NOTIFICATION_CLOSE_DELAY = 7000;

export const connectToMetaMaskSnackMessage = {
  type: 'info',
  message: 'Please connect your Wallet in order to proceed'
} as const;

export const generatePaymentAbandonSnackMessage = {
  type: 'info',
  message: 'Image generate payment rejected'
} as const;

export const generateSuccessSnackMessage = {
  type: 'success',
  message: 'Image generate successful'
} as const;

export type SnackMessage =
  | typeof connectToMetaMaskSnackMessage
  | typeof generatePaymentAbandonSnackMessage
  | typeof generateSuccessSnackMessage
  | null;
