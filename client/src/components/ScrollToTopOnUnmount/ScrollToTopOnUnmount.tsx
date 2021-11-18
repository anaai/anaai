import { useEffect } from 'react';

export const mainScrollContainerId = 'main-scroll-container';

export const ScrollToTopOnUnmount: React.FC<Record<string, unknown>> = () => {
  useEffect(() => () => document.getElementById(mainScrollContainerId)?.scrollTo(0, 0), []);

  return null;
};
