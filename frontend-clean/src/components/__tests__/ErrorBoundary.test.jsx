/* eslint-disable no-undef */
import React from 'react';
import { renderWithProviders } from '../../test-utils';
import ErrorBoundary from '../ErrorBoundary';
describe('ErrorBoundary', () => {
  it('renders without crashing', () => {
    renderWithProviders(<ErrorBoundary><div>Child</div></ErrorBoundary>);
  });
});
