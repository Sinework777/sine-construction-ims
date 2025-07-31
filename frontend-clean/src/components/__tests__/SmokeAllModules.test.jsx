/* eslint-env jest */
/* global describe, it */
/* eslint-env jest */
import React from 'react';
import { render } from '@testing-library/react';

import ErrorBoundary from '../ErrorBoundary.jsx';
import DocumentControl from '../DocumentControl.jsx';
import QAQCReports from '../QAQCReports.jsx';
import RoleBasedRoute from '../RoleBasedRoute.jsx';
import MeetingMinutes from '../MeetingMinutes/MinutesView.jsx';
import RFIForm from '../RFIForm.jsx';
import RoleGuard from '../RoleGuard.jsx';
import ResetPassword from '../ResetPassword.jsx';
import QuickActionButton from '../QuickActionButton.jsx';
import QuantitySurvey from '../QuantitySurvey.jsx';
import SidebarQAQC from '../SidebarQAQC.jsx';
import SidebarPM from '../SidebarPM.jsx';
import SidebarHSE from '../SidebarHSE.jsx';
import SidebarDocs from '../SidebarDocs.jsx';
import SidebarCost from '../SidebarCost.jsx';
import { AuthProvider } from '../../context/AuthContext.jsx';
// ...add all other modules here

describe('Smoke test all modules', () => {
  it('renders all major modules without crashing', () => {
    const wrap = (node) => (
      <AuthProvider>
        <ErrorBoundary>{node}</ErrorBoundary>
      </AuthProvider>
    );
    render(wrap(<DocumentControl />));
    render(wrap(<QAQCReports />));
    render(wrap(<RoleBasedRoute requiredRole="pm"><div>Test</div></RoleBasedRoute>));
    render(wrap(<MeetingMinutes />));
    render(wrap(<RFIForm />));
    render(wrap(<RoleGuard role="admin"><div>Test</div></RoleGuard>));
    render(wrap(<ResetPassword />));
    render(wrap(<QuickActionButton label="Test" onClick={()=>{}} />));
    render(wrap(<QuantitySurvey />));
    render(wrap(<SidebarQAQC />));
    render(wrap(<SidebarPM />));
    render(wrap(<SidebarHSE />));
    render(wrap(<SidebarDocs />));
    render(wrap(<SidebarCost />));
    // ...add all other modules here
  });
});
