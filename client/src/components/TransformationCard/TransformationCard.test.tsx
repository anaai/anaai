import { render, screen } from '@testing-library/react';
import { TransformationCard } from './TransformationCard';

test('renders transformation card root container', () => {
  render(<TransformationCard />);
  const rootContainerElement = screen.getByTestId(/TransformationCard-root-container/i);
  expect(rootContainerElement).toBeInTheDocument();
});
