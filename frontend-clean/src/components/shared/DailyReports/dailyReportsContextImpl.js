import { createContext, useContext, useState } from 'react';

export const DailyReportsContext = createContext();

export function useDailyReports() {
  return useContext(DailyReportsContext);
}

export function useDailyReportsState() {
  const [reports, setReports] = useState([
    { id: 1, date: '2025-07-20', author: 'HSE Officer', summary: 'Site safety walk, no incidents.' },
    { id: 2, date: '2025-07-19', author: 'QA/QC Engineer', summary: 'Minor PPE violation corrected.' },
  ]);
  const addReport = report => setReports(prev => [...prev, report]);
  const updateReport = updated => setReports(prev => prev.map(r => r.id === updated.id ? updated : r));
  const deleteReport = id => setReports(prev => prev.filter(r => r.id !== id));
  return { reports, addReport, updateReport, deleteReport };
}
