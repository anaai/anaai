import { render, screen } from '@testing-library/react';
import { ExploreScene } from './ExploreScene';

test('renders explore scene root container', () => {
  render(<ExploreScene />);
  const rootContainerElement = screen.getByTestId(/ExploreScene-root-container/i);
  expect(rootContainerElement).toBeInTheDocument();
});
