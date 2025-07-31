// src/components/admin/TopBar.jsx
import React from 'react';
import { FaBell, FaUserCircle, FaSearch } from 'react-icons/fa';

export default function TopBar() {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white shadow border-b">
      <div className="flex items-center gap-3">
        <FaSearch className="text-gray-400 w-5 h-5" />
        <input className="bg-gray-100 rounded px-3 py-1 ml-2 focus:outline-none" placeholder="Search..." />
      </div>
      <div className="flex items-center gap-6">
        <button className="relative">
          <FaBell className="w-5 h-5 text-gray-500" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">2</span>
        </button>
        <div className="flex items-center gap-2 cursor-pointer">
          <FaUserCircle className="w-7 h-7 text-blue-700" />
          <span className="font-semibold text-gray-700">SuperAdmin</span>
        </div>
      </div>
    </header>
  );
}
