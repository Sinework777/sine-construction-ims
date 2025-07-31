
import React from 'react';
import { renderWithProviders } from '../../test-utils';
import Dashboard from '../../pages/Dashboard.jsx';
/* eslint-env jest */
/* eslint-disable no-undef */

describe('Dashboard', () => {
  it('renders without crashing', () => {
    renderWithProviders(<Dashboard />);
  });
});
