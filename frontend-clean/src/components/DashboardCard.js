import React from 'react';

export default function DashboardCard({ title, icon, link, children }) {
  return (
    <a href={link} className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center gap-2 hover:scale-105 transition-all duration-200 cursor-pointer">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="font-bold text-lg">{title}</div>
      <div className="text-sm text-gray-600">{children}</div>
    </a>
  );
}
