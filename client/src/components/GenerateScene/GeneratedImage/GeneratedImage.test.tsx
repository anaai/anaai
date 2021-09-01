import { render, screen } from '@testing-library/react';
import { GeneratedImage } from './GeneratedImage';

test('renders GeneratedImage component', () => {
  render(<GeneratedImage />);

  const generatedImageContainerELement = screen.getByTestId('generated-image-container');

  expect(generatedImageContainerELement).toBeInTheDocument();
});
