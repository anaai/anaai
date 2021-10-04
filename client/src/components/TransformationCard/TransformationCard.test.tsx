import { render, screen } from '@testing-library/react';
import { TransformationCard } from './TransformationCard';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { injectGlobalResizeObserverMock } from 'tests/mocks/ResizeObserver';

test('renders transformation card root container', () => {
  injectGlobalResizeObserverMock();

  const history = createMemoryHistory();
  const route = '/transformations';
  history.push(route);

  render(
    <Router history={history}>
      <TransformationCard transformationName="sketch" />
    </Router>
  );

  const rootContainerElement = screen.getByTestId(/TransformationCard-root-container/i);
  expect(rootContainerElement).toBeInTheDocument();
});
