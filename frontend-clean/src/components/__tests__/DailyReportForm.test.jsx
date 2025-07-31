/* eslint-disable no-undef */
import React from 'react';
import { renderWithProviders } from '../../test-utils';
import DailyReportForm from '../DailyReports/DailyReportForm';
import { screen, fireEvent } from '@testing-library/react';

describe('DailyReportForm', () => {
  it('renders all form fields and buttons', () => {
    renderWithProviders(<DailyReportForm onSave={jest.fn()} onCancel={jest.fn()} />);
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/weather/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/manpower/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('calls onSave with form data when submitted', () => {
    const onSave = jest.fn();
    renderWithProviders(<DailyReportForm onSave={onSave} onCancel={jest.fn()} />);
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2025-07-27' } });
    fireEvent.change(screen.getByLabelText(/weather/i), { target: { value: 'Cloudy' } });
    fireEvent.change(screen.getByLabelText(/manpower/i), { target: { value: '10' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(onSave).toHaveBeenCalledWith({ date: '2025-07-27', weather: 'Cloudy', manpower: '10' });
  });

  it('calls onCancel when Cancel button is clicked', () => {
    const onCancel = jest.fn();
    renderWithProviders(<DailyReportForm onSave={jest.fn()} onCancel={onCancel} />);
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(onCancel).toHaveBeenCalled();
  });
});
