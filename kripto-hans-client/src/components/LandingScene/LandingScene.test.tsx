import { render, screen } from '@testing-library/react';
import { LandingScene } from './LandingScene';

test('renders ANA title', () => {
  render(<LandingScene />);
  const titleElement = screen.getByText(/ANA/i);
  expect(titleElement).toBeInTheDocument();
});
