/* eslint-disable no-undef */
import React from 'react';
import { renderWithProviders } from '../../test-utils';
import ReportCard from '../DailyReports/ReportCard';
import { screen } from '@testing-library/react';

const mockReport = {
  id: 'RPT-001',
  status: 'Submitted',
  date: '2025-07-27',
  weather: 'Sunny',
  crewCount: 12,
  siteCondition: 'Good',
  materialsDelivered: 'Bricks, Cement',
  workCompleted: 'Foundation',
  delays: 'None',
  safetyObservations: 'All good',
  reviewer: 'John Doe',
};

describe('ReportCard', () => {
  it('renders all report fields', () => {
    renderWithProviders(<ReportCard report={mockReport} />);
    expect(screen.getByText('RPT-001')).toBeInTheDocument();
    expect(screen.getByText('Submitted')).toBeInTheDocument();
    expect(screen.getByText(/Date:/i)).toBeInTheDocument();
    expect(screen.getByText(/Weather:/i)).toBeInTheDocument();
    expect(screen.getByText(/Crew:/i)).toBeInTheDocument();
    expect(screen.getByText(/Site:/i)).toBeInTheDocument();
    expect(screen.getByText(/Materials:/i)).toBeInTheDocument();
    expect(screen.getByText(/Work:/i)).toBeInTheDocument();
    expect(screen.getByText(/Delays:/i)).toBeInTheDocument();
    expect(screen.getByText(/Safety:/i)).toBeInTheDocument();
    // Reviewer is rendered as 'Reviewer: John Doe' but not as a single text node
    expect(
      screen.getByText((content, node) => {
        const hasText = (node) =>
          node.textContent === 'Reviewer: John Doe';
        const nodeHasText = hasText(node);
        const childrenDontHaveText = Array.from(node?.children || []).every(
          (child) => !hasText(child)
        );
        return nodeHasText && childrenDontHaveText;
      })
    ).toBeInTheDocument();
  });

  it('shows Pending if reviewer is missing', () => {
    const noReviewer = { ...mockReport, reviewer: undefined };
    renderWithProviders(<ReportCard report={noReviewer} />);
    // Reviewer is rendered as 'Reviewer: Pending' but not as a single text node
    expect(
      screen.getByText((content, node) => {
        const hasText = (node) =>
          node.textContent === 'Reviewer: Pending';
        const nodeHasText = hasText(node);
        const childrenDontHaveText = Array.from(node?.children || []).every(
          (child) => !hasText(child)
        );
        return nodeHasText && childrenDontHaveText;
      })
    ).toBeInTheDocument();
  });
});
