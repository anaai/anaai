import { render, screen } from '@testing-library/react';
import { PayImageForm } from './PayImageForm';

test('renders buy button', () => {
  render(<PayImageForm />);
  const buyButton = screen.getByText(/buy image/i);
  expect(buyButton).toBeInTheDocument();
});
