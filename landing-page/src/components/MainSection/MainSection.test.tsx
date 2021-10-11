import { render, screen } from '@testing-library/react';
import { MainSection } from './MainSection';

test('renders main section root container', () => {
  render(<MainSection />);

  const rootContainerElement = screen.getByTestId(/MainSection-root-container/i);
  expect(rootContainerElement).toBeInTheDocument();
});
