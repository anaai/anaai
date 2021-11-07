import { render, screen } from '@testing-library/react';
import { injectGlobalResizeObserverMock } from 'tests/mocks/ResizeObserver';
import { MainSection } from './MainSection';

test('renders main section root container', () => {
  injectGlobalResizeObserverMock();

  render(<MainSection />);

  const rootContainerElement = screen.getByTestId(/MainSection-root-container/i);
  expect(rootContainerElement).toBeInTheDocument();
});
