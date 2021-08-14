import { render, screen } from '@testing-library/react';
import { LandingScene } from './LandingScene';

test('renders AI NFT ART title', () => {
  render(<LandingScene />);
  const titleElement = screen.getByText(/ana/i);
  expect(titleElement).toBeInTheDocument();
});
