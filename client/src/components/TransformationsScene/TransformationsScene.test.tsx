import { render, screen } from '@testing-library/react';
import { TransformationsScene } from './TransformationsScene';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { injectGlobalResizeObserverMock } from 'tests/mocks/ResizeObserver';

test('renders transformations scene root container', () => {
  injectGlobalResizeObserverMock();

  const history = createMemoryHistory();
  const route = '/transformations';
  history.push(route);

  render(
    <Router history={history}>
      <TransformationsScene />
    </Router>
  );

  const rootContainerElement = screen.getByTestId(/TransformationsScene-root-container/i);
  expect(rootContainerElement).toBeInTheDocument();
});
