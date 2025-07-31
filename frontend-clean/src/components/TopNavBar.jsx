import React from 'react';
import { UserCircle, ChevronDown } from 'lucide-react';

export default function TopNavBar({ user }) {
  function handleLogout() {
    localStorage.removeItem('sessionUser');
    window.location.href = '/login';
  }
  return (
    <header className="w-full flex items-center justify-end px-8 py-4 bg-white/80 backdrop-blur-lg shadow-lg fixed top-0 left-0 z-40">
      <div className="flex items-center gap-4">
        <span className="font-bold text-blue-700">{user?.name || 'QA/QC Engineer'}</span>
        <div className="relative group">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-100 hover:bg-blue-200 font-bold">
            <UserCircle size={28} className="text-blue-700" />
            <ChevronDown size={18} />
          </button>
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg py-2 hidden group-hover:block">
            <a href="/profile" className="block px-4 py-2 hover:bg-blue-50">Profile</a>
            <a href="/settings" className="block px-4 py-2 hover:bg-blue-50">Settings</a>
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-red-500">Logout</button>
          </div>
        </div>
      </div>
    </header>
  );
}
