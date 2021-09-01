import { render, screen } from '@testing-library/react';
import App from 'components/App';

test('no 🦃 in sight', () => {
  render(<App />);
  const turkeyElement = screen.queryByText(/🦃/i);
  expect(turkeyElement).not.toBeInTheDocument();
});
