/* eslint-disable no-undef */
import React from 'react';
import { renderWithProviders } from '../../test-utils';
import DashboardCard from '../DashboardCard';
describe('DashboardCard', () => {
  it('renders without crashing', () => {
    renderWithProviders(<DashboardCard />);
  });
});
