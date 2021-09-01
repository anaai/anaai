export const matchesConnectedAccount = (
  connectedAccounts: readonly string[],
  targetAccount: string
): boolean => connectedAccounts[0].toLowerCase() === targetAccount.toLowerCase();
