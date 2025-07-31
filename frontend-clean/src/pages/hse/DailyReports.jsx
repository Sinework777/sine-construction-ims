import React from 'react';
import DailyReportsPage from '../shared/DailyReportsPage';

export default function HSEDailyReports() {
  const userRole = 'hse';
  const project = JSON.parse(localStorage.getItem('sessionUser'))?.project || 'Project';
  return <DailyReportsPage userRole={userRole} project={project} />;
}
