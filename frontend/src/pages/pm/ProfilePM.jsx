import React, { useState } from 'react';
import { LogOut, Settings, User } from 'lucide-react';

export default function ProfilePM({ pmName, project, onLogout }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition" onClick={() => setOpen(o => !o)}>
        <User className="w-6 h-6" />
        <span className="font-semibold">{pmName}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl ring-1 ring-slate-200 z-40 p-4 animate-fade-in">
          <div className="font-bold mb-2">{pmName}</div>
          <div className="text-sm text-slate-600 mb-2">Project: {project}</div>
          <button className="w-full text-left px-2 py-2 rounded hover:bg-slate-100 transition"><Settings className="inline mr-2" />Profile Settings</button>
          <button className="w-full text-left px-2 py-2 rounded hover:bg-slate-100 transition" onClick={onLogout}><LogOut className="inline mr-2" />Logout</button>
        </div>
      )}
    </div>
  );
}
