import { render, screen } from '@testing-library/react';
import { GenerateScene } from './GenerateScene';

test('renders generate button', () => {
  render(<GenerateScene />);
  const generateButton = screen.getByText(/generate/i);
  expect(generateButton).toBeInTheDocument();
});
