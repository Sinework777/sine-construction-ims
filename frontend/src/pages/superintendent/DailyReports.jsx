import React from 'react';
import DailyReportsPage from '../shared/DailyReportsPage';

export default function SuperintendentDailyReports() {
  const userRole = 'superintendent';
  const project = JSON.parse(localStorage.getItem('sessionUser'))?.project || 'Project';
  return <DailyReportsPage userRole={userRole} project={project} />;
}
