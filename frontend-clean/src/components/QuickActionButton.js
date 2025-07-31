import React, { useState } from 'react';
import { PlusCircle, FileText, ListChecks, ClipboardCheck } from 'lucide-react';

export default function QuickActionButton() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        className="bg-blue-600 text-white rounded-full p-4 shadow-xl hover:bg-blue-700 transition-all duration-200 flex items-center gap-2"
        onClick={() => setOpen(o => !o)}
        title="Quick Actions"
      >
        <PlusCircle size={32} />
      </button>
      {open && (
        <div className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-xl p-4 flex flex-col gap-4 animate-fade-in">
          <a href="/dashboard/qaqc/ncrs/add" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500 text-white font-bold hover:bg-indigo-700 transition"><FileText /> Create New NCR</a>
          <a href="/dashboard/qaqc/checklists/add" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500 text-white font-bold hover:bg-green-700 transition"><ListChecks /> Add QA/QC Checklist</a>
          <a href="/dashboard/qaqc/inspections/add" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-500 text-white font-bold hover:bg-yellow-600 transition"><ClipboardCheck /> Submit Inspection Result</a>
        </div>
      )}
    </div>
  );
}
