import { render, screen } from '@testing-library/react';
import { ExploreScene } from './ExploreScene';

test('renders explore text', () => {
  render(<ExploreScene />);
  const exploreTextElement = screen.getByText(/explore/i);
  expect(exploreTextElement).toBeInTheDocument();
});
