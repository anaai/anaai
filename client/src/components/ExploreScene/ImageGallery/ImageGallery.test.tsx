import { render, screen } from '@testing-library/react';
import { galleryTypes } from 'models/ImageGallery.model';
import { ImageGallery } from './ImageGallery';

test('renders image gallery root container', () => {
  render(<ImageGallery galleryType={galleryTypes[0]} />);
  const rootContainerElement = screen.getByTestId(/root-container/i);
  expect(rootContainerElement).toBeInTheDocument();
});
