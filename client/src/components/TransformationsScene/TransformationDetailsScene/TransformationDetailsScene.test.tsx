import { render, screen } from '@testing-library/react';
import { TransformationDetailsScene } from './TransformationDetailsScene';

test('renders transformations scene root container', () => {
  render(<TransformationDetailsScene />);
  const rootContainerElement = screen.getByTestId(/TransformationDetailsScene-root-container/i);
  expect(rootContainerElement).toBeInTheDocument();
});
