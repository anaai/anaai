import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

test('renders footer root container', () => {
  render(<Footer />);

  const rootContainerElement = screen.getByTestId(/Footer-root-container/i);
  expect(rootContainerElement).toBeInTheDocument();
});
