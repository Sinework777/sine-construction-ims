import React from 'react';
import { Bell, Search, UserCircle, Moon, Sun } from 'lucide-react';

export default function TopbarQAQC({ darkMode, setDarkMode }) {
  return (
    <header className="w-full flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-lg shadow-lg fixed top-0 left-0 z-40">
      <div className="flex items-center gap-4">
        <span className="font-extrabold text-2xl text-blue-700">IMS Dashboard</span>
        <div className="relative">
          <input type="text" placeholder="Search..." className="rounded-xl px-4 py-2 border bg-slate-50" />
          <Search className="absolute right-2 top-2 text-slate-400" size={20} />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button className="relative">
          <Bell size={24} className="text-blue-600" />
          <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full px-2">3</span>
        </button>
        <button onClick={() => setDarkMode(d => !d)}>
          {darkMode ? <Sun size={24} className="text-yellow-500" /> : <Moon size={24} className="text-slate-600" />}
        </button>
        <div className="flex items-center gap-2 cursor-pointer">
          <UserCircle size={32} className="text-blue-700" />
          <span className="font-bold">QA/QC Engineer</span>
        </div>
      </div>
    </header>
  );
}
