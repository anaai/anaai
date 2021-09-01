import { render, screen } from '@testing-library/react';
import { WalletConnector } from './WalletConnector';

test('renders METAMASK button', () => {
  render(<WalletConnector />);
  const metamaskButton = screen.getByTestId(/metamask-button/i);
  expect(metamaskButton).toBeInTheDocument();
});
