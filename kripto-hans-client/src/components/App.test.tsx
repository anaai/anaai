import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Krypto Hans title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Krypto Hans/i);
  expect(titleElement).toBeInTheDocument();
});

test('no 🦃 in sight', () => {
  render(<App />);
  const turkeyElement = screen.queryByText(/🦃/i);
  expect(turkeyElement).not.toBeInTheDocument();
});
