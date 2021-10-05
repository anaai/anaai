import { render, screen } from '@testing-library/react';
import { MyArtScene } from './MyArtScene';

test('renders explore scene root container', () => {
  render(<MyArtScene />);
  const rootContainerElement = screen.getByTestId(/MyArtScene-root-container/i);
  expect(rootContainerElement).toBeInTheDocument();
});
