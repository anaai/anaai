import { render, screen } from '@testing-library/react';
import { TransformationDetailsScene } from './TransformationDetailsScene';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Route } from 'react-router';

test('renders transformation detail scene root container', () => {
  class ResizeObserver {
    observe() {
      // do nothing
    }
    unobserve() {
      // do nothing
    }
    disconnect() {
      // do nothing
    }
  }

  global.ResizeObserver = ResizeObserver as any;

  const history = createMemoryHistory();
  const route = 'transformations/sketch';
  const initialEntries = [route];
  history.push(route);

  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Route path="transformations/:id" component={TransformationDetailsScene} />
    </MemoryRouter>
  );
  const rootContainerElement = screen.getByTestId(/TransformationDetailsScene-root-container/i);
  expect(rootContainerElement).toBeInTheDocument();
});
