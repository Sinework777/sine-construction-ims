import React from 'react';
export default function SpecList({ onAdd, onView }) {
  const specs = [
    { id: 1, name: 'Concrete Spec', status: 'Active', date: '2025-07-10' },
    { id: 2, name: 'Steel Spec', status: 'Obsolete', date: '2025-07-12' },
  ];
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold">Specifications</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition" onClick={onAdd}>+ Add Spec</button>
      </div>
      <ul className="divide-y divide-slate-200">
        {specs.map(spec => (
          <li key={spec.id} className="py-3 flex justify-between items-center hover:bg-blue-50 rounded-xl transition">
            <span className="font-semibold">{spec.name}</span>
            <span className={`text-xs px-2 py-1 rounded ${spec.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{spec.status}</span>
            <span className="text-sm text-slate-500">{spec.date}</span>
            <button className="ml-4 text-blue-600 underline" onClick={() => onView(spec)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
