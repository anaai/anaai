import { render, screen } from '@testing-library/react';
import { TransformationDetailsScene } from './TransformationDetailsScene';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

test('renders transformation detail scene root container', () => {
  const history = createMemoryHistory();
  const route = '/transformations/1';
  history.push(route);

  render(
    <Router history={history}>
      <TransformationDetailsScene />
    </Router>
  );
  const rootContainerElement = screen.getByTestId(/TransformationDetailsScene-root-container/i);
  expect(rootContainerElement).toBeInTheDocument();
});
