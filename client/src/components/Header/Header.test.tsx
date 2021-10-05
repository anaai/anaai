import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { injectGlobalResizeObserverMock } from 'tests/mocks/ResizeObserver';

test('renders header root container', () => {
  injectGlobalResizeObserverMock();

  const history = createMemoryHistory();
  const route = '/transformations';
  history.push(route);
  render(
    <Router history={history}>
      <Header />
    </Router>
  );

  const rootContainerElement = screen.getByTestId(/Header-root-container/i);
  expect(rootContainerElement).toBeInTheDocument();
});
