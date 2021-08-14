import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders AI NFT ART title', () => {
  render(<App />);
  const titleElement = screen.getByText(/AI NFT ART/i);
  expect(titleElement).toBeInTheDocument();
});

test('no 🦃 in sight', () => {
  render(<App />);
  const turkeyElement = screen.queryByText(/🦃/i);
  expect(turkeyElement).not.toBeInTheDocument();
});
