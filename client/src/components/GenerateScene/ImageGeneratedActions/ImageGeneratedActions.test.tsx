import { render, screen } from '@testing-library/react';
import { ImageGeneratedActions } from './ImageGeneratedActions';

test('renders generate more button', () => {
  render(<ImageGeneratedActions />);
  const generateMoreButton = screen.getByText(/generate more/i);
  expect(generateMoreButton).toBeInTheDocument();
});
