import { render, screen } from '@testing-library/react';
import { GenerateScene } from './GenerateScene';
import { createMemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';

beforeEach(() => {
  const history = createMemoryHistory();
  const route = 'generate/sketch';
  history.push(route);

  render(
    <Router history={history}>
      <Route path="/generate/:transformationName" component={GenerateScene} />
    </Router>
  );
});

test('renders generate scene root container', () => {
  const rootContainerElement = screen.getByTestId(/GenerateScene-root-container/i);
  expect(rootContainerElement).toBeInTheDocument();
});
