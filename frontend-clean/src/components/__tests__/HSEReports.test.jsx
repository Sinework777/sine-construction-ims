
import React from 'react';
import { renderWithProviders } from '../../test-utils';
import HSEReports from '../HSEReports';
/* eslint-env jest */
/* eslint-disable no-undef */

describe('HSEReports', () => {
  it('renders without crashing', () => {
    renderWithProviders(<HSEReports />);
  });
});
