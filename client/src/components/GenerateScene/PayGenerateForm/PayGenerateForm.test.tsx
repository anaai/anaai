import { render, screen } from '@testing-library/react';
import { PayGenerateForm } from './PayGenerateForm';
import { createMemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';

beforeEach(() => {
  const history = createMemoryHistory();
  const route = 'generate/sketch';
  history.push(route);

  render(
    <Router history={history}>
      <Route path="/generate/:transformationName" component={PayGenerateForm} />
    </Router>
  );
});

test('renders pay generate form', () => {
  const rootContainerElement = screen.getByTestId(/PayGenerateForm-root-container/i);
  expect(rootContainerElement).toBeInTheDocument();
});

test('renders generate button', () => {
  const generateButton = screen.getByText(/generate/i);
  expect(generateButton).toBeInTheDocument();
});
