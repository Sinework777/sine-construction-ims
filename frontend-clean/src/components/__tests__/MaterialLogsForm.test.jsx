/* eslint-disable no-undef */

/* global describe, it, expect */
import React from 'react';

import { screen } from '@testing-library/react';
import MaterialLogs from '../MaterialLogs';
import { renderWithProviders } from '../../test-utils';

// Mock jsPDF and html2canvas to prevent errors in Jest
jest.mock('jspdf', () => ({ jsPDF: jest.fn() }));
jest.mock('html2canvas', () => jest.fn());

describe('MaterialLogs', () => {

  it('renders the Material Logs table and headings', () => {
    renderWithProviders(<MaterialLogs />);
    // There may be multiple headings with the same text, so use getAllByText
    expect(screen.getAllByText(/Material Logs/i).length).toBeGreaterThan(0);
    // Check for table columns using role 'columnheader'
    expect(screen.getByRole('columnheader', { name: /Material/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Quantity/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Unit/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Status/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Date/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Actions/i })).toBeInTheDocument();
    // Check for table rows
    expect(screen.getByRole('cell', { name: /Cement/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /Sand/i })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /View/i }).length).toBeGreaterThan(0);
  });

  // No form fields present in markup, so skip form interaction test
});
