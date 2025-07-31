import React from 'react';
import NewReportForm from '../../../components/DailyReports/NewReportForm';
import DailyReportList from '../../../components/DailyReports/DailyReportList';

export default function DailyReportsPage() {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Daily Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <NewReportForm />
        </div>
        <div>
          <DailyReportList />
        </div>
      </div>
    </div>
  );
}
