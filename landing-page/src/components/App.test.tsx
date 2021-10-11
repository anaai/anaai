import { render, screen } from '@testing-library/react';
import App from 'components/App';
import { injectGlobalResizeObserverMock } from 'tests/mocks/ResizeObserver';

test('no 🦃 in sight', () => {
  injectGlobalResizeObserverMock();
  render(<App />);
  const turkeyElement = screen.queryByText(/🦃/i);
  expect(turkeyElement).not.toBeInTheDocument();
});
