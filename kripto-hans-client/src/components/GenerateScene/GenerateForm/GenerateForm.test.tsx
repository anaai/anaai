import { render, screen } from '@testing-library/react';
import { GenerateForm } from './GenerateForm';

test('renders generate button', () => {
  render(<GenerateForm />);
  const generateButton = screen.getByText(/generate/i);
  expect(generateButton).toBeInTheDocument();
});
