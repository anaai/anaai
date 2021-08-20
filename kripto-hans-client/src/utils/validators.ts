export const validateUrl = (urlString: string): boolean => {
  let url;

  try {
    url = new URL(urlString);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
};

export const validateAccountConnection = (accounts: readonly string[]): boolean =>
  Boolean(accounts.length);
