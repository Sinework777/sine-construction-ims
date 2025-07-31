/* eslint-disable no-undef */
import React from 'react';
import { renderWithProviders } from '../../test-utils';
import ForgotPassword from '../ForgotPassword';
describe('ForgotPassword', () => {
  it('renders without crashing', () => {
    renderWithProviders(<ForgotPassword />);
  });
});
