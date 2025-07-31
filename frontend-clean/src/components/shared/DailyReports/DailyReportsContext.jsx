import React from 'react';
import { DailyReportsContext, useDailyReportsState } from './dailyReportsContextImpl';

export function DailyReportsProvider({ children }) {
  const value = useDailyReportsState();
  return (
    <DailyReportsContext.Provider value={value}>
      {children}
    </DailyReportsContext.Provider>
  );
}

