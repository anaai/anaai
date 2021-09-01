import { render, screen } from '@testing-library/react';
import { PayGenerateForm } from './PayGenerateForm';

test('renders generate button', () => {
  render(<PayGenerateForm />);
  const generateButton = screen.getByText(/generate/i);
  expect(generateButton).toBeInTheDocument();
});
