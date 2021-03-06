import { render, screen } from '@testing-library/react';
import { LandingScene } from './LandingScene';

test('renders ANA title', () => {
  render(<LandingScene />);
  const titleElement = screen.getByText(/ANA/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders AI NFT Art subtitle', () => {
  render(<LandingScene />);
  const subtitleElement = screen.getByText(/AI NFT Art/i);
  expect(subtitleElement).toBeInTheDocument();
});
