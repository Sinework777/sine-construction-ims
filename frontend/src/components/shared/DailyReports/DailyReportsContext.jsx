import React, { createContext, useContext, useState } from 'react';

const DailyReportsContext = createContext();

export function DailyReportsProvider({ children }) {
  const [reports, setReports] = useState([
    // Example initial data
    { id: 1, date: '2025-07-20', author: 'HSE Officer', summary: 'Site safety walk, no incidents.' },
    { id: 2, date: '2025-07-19', author: 'QA/QC Engineer', summary: 'Minor PPE violation corrected.' },
  ]);

  // Add, update, delete functions
  const addReport = report => setReports(prev => [...prev, report]);
  const updateReport = updated => setReports(prev => prev.map(r => r.id === updated.id ? updated : r));
  const deleteReport = id => setReports(prev => prev.filter(r => r.id !== id));

  return (
    <DailyReportsContext.Provider value={{ reports, addReport, updateReport, deleteReport }}>
      {children}
    </DailyReportsContext.Provider>
  );
}

export function useDailyReports() {
  return useContext(DailyReportsContext);
}
