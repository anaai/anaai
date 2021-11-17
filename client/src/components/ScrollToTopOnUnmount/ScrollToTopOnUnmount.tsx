import { useEffect } from 'react';

export const mainScrollContainerId = 'main-scroll-container';

export const ScrollToTopOnUnmount = () => {
  useEffect(() => {
    return () => document.getElementById(mainScrollContainerId)?.scrollTo(0, 0);
  }, []);

  return null;
};
