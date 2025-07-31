/* eslint-disable no-undef */
import React from 'react';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewDailyReport from '../DailyReports/NewDailyReport';
import { renderWithProviders } from '../../test-utils';

// Mock jsPDF and html2canvas to prevent errors in Jest
jest.mock('jspdf', () => ({ jsPDF: jest.fn() }));
jest.mock('html2canvas', () => jest.fn());

describe('NewDailyReport', () => {
  it('renders the form and all main fields', () => {
    renderWithProviders(<NewDailyReport />);
    expect(screen.getByText(/New Daily Report/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Project/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Weather/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Attachments/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Signature/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Export PDF/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Export Excel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  it('shows error if viewer tries to submit', async () => {
    // Mock useAuth to return viewer
    jest.spyOn(require('../../context/useAuth'), 'useAuth').mockReturnValue({ userRole: 'viewer' });
    renderWithProviders(<NewDailyReport />);
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    await waitFor(() => {
      expect(screen.getByText(/do not have permission/i)).toBeInTheDocument();
    });
  });

  it('submits form and resets fields for allowed user', async () => {
    jest.spyOn(require('../../context/useAuth'), 'useAuth').mockReturnValue({ userRole: 'admin' });
    renderWithProviders(<NewDailyReport />);
    fireEvent.change(screen.getByLabelText(/Project/i), { target: { value: 'Project A' } });
    fireEvent.change(screen.getByLabelText(/Weather/i), { target: { value: 'Sunny' } });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    await waitFor(() => {
      expect(screen.getByLabelText(/Project/i)).toHaveValue('');
      expect(screen.getByLabelText(/Weather/i)).toHaveValue('');
    });
  });

  it('shows error if PDF export fails', async () => {
    renderWithProviders(<NewDailyReport />);
    // Force html2canvas to throw
    jest.spyOn(document, 'getElementById').mockReturnValue(null);
    fireEvent.click(screen.getByRole('button', { name: /Export PDF/i }));
    await waitFor(() => {
      expect(screen.getByText(/Failed to export PDF/i)).toBeInTheDocument();
    });
  });

  it('shows error if Excel export fails', async () => {
    renderWithProviders(<NewDailyReport />);
    // Force XLSX to throw
    jest.spyOn(require('xlsx').utils, 'json_to_sheet').mockImplementation(() => { throw new Error(); });
    fireEvent.click(screen.getByRole('button', { name: /Export Excel/i }));
    await waitFor(() => {
      expect(screen.getByText(/Failed to export Excel/i)).toBeInTheDocument();
    });
  });
});
