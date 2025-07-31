
import React from 'react';
import { renderWithProviders } from '../../test-utils';
import DocumentControl from '../DocumentControl';
/* eslint-env jest */
/* eslint-disable no-undef */

describe('DocumentControl', () => {
  it('renders without crashing', () => {
    renderWithProviders(<DocumentControl />);
  });
});
