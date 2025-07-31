import React from 'react';
import * as Icons from 'lucide-react';

export default function QuickActionButton({ label, icon, to }) {
  const IconComponent = Icons[icon] || Icons['PlusCircle'];
  return (
    <a
      href={to}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition"
      title={label}
    >
      <span>{IconComponent && <IconComponent size={24} />}</span>
      <span>{label}</span>
    </a>
  );
}
