
import React from 'react';
import { renderWithProviders } from '../../test-utils';
import BOQ from '../BOQ';
/* eslint-env jest */
/* eslint-disable no-undef */

describe('BOQ', () => {
  it('renders without crashing', () => {
    renderWithProviders(<BOQ />);
  });
});
