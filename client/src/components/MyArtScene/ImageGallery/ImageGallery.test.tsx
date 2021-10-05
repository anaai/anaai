import { render, screen } from '@testing-library/react';
import { ImageGallery } from './ImageGallery';

test('renders image gallery root container', () => {
  render(<ImageGallery />);
  const rootContainerElement = screen.getByTestId(/ImageGallery-root-container/i);
  expect(rootContainerElement).toBeInTheDocument();
});
