export const injectGlobalResizeObserverMock = () => {
  class ResizeObserverMock {
    observe() {
      // do nothing
    }
    unobserve() {
      // do nothing
    }
    disconnect() {
      // do nothing
    }
  }

  global.ResizeObserver = ResizeObserverMock as any;
};
