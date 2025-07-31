/* global describe, it, expect */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WorkflowApprovals from '../WorkflowApprovals';

describe('WorkflowApprovals', () => {
  it('renders workflow configuration and pending approvals', () => {
    render(<WorkflowApprovals />);
    expect(screen.getByText('Workflow & Approvals')).toBeInTheDocument();
    expect(screen.getByText('Workflow Configuration')).toBeInTheDocument();
    expect(screen.getByText('Pending Approvals')).toBeInTheDocument();
  });

  it('can add a new workflow', () => {
    render(<WorkflowApprovals />);
    fireEvent.change(screen.getByPlaceholderText('New workflow'), { target: { value: 'Test Workflow' } });
    fireEvent.change(screen.getByPlaceholderText('Approvers'), { target: { value: 'Test Approver' } });
    fireEvent.click(screen.getByText('Add'));
    expect(screen.getByText('Test Workflow')).toBeInTheDocument();
    expect(screen.getByText('Test Approver')).toBeInTheDocument();
  });
});
