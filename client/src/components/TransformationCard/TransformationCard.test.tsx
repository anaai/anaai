import { render, screen } from '@testing-library/react';
import { TransformationCard } from './TransformationCard';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { injectGlobalResizeObserverMock } from 'tests/mocks/ResizeObserver';
import { Transformation } from 'models/Transformations.model';

test('renders transformation card root container', () => {
  injectGlobalResizeObserverMock();
  const mockTransformation: Transformation = {
    description: 'abc',
    id: '1',
    nTokens: '10',
    name: 'ascii',
    price: '10',
    supply: '10'
  };

  const history = createMemoryHistory();
  const route = '/transformations';
  history.push(route);

  render(
    <Router history={history}>
      <TransformationCard transformation={mockTransformation} />
    </Router>
  );

  const rootContainerElement = screen.getByTestId(/TransformationCard-root-container/i);
  expect(rootContainerElement).toBeInTheDocument();
});
