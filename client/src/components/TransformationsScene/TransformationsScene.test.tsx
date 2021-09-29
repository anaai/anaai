import { render, screen } from '@testing-library/react';
import { TransformationsScene } from './TransformationsScene';

test('renders transformations scene root container', () => {
  render(<TransformationsScene />);
  const rootContainerElement = screen.getByTestId(/TransformationsScene-root-container/i);
  expect(rootContainerElement).toBeInTheDocument();
});
