
import React from 'react';
import { render } from '@testing-library/react';
import { AuthProvider } from './context/AuthContext';
import { MemoryRouter } from 'react-router-dom';

export function renderWithProviders(ui, { providerProps = {}, ...renderOptions } = {}) {
  return render(
    <MemoryRouter>
      <AuthProvider {...providerProps}>{ui}</AuthProvider>
    </MemoryRouter>,
    renderOptions
  );
}
