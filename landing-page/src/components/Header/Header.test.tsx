import { render, screen } from '@testing-library/react';
import { Header } from './Header';

test('renders header root container', () => {
  render(<Header />);

  const rootContainerElement = screen.getByTestId(/Header-root-container/i);
  expect(rootContainerElement).toBeInTheDocument();
});
