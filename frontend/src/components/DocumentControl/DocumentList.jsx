import React from 'react';
export default function DocumentList({ onAdd, onView }) {
  const docs = [
    { id: 1, name: 'Site Plan.pdf', type: 'Drawing', status: 'Current', date: '2025-07-10' },
    { id: 2, name: 'Specs.docx', type: 'Specification', status: 'Obsolete', date: '2025-07-12' },
  ];
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold">Documents</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition" onClick={onAdd}>+ Add Document</button>
      </div>
      <ul className="divide-y divide-slate-200">
        {docs.map(doc => (
          <li key={doc.id} className="py-3 flex justify-between items-center hover:bg-blue-50 rounded-xl transition">
            <span className="font-semibold">{doc.name}</span>
            <span className="text-sm text-slate-500">{doc.type}</span>
            <span className={`text-xs px-2 py-1 rounded ${doc.status === 'Current' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{doc.status}</span>
            <span className="text-sm text-slate-500">{doc.date}</span>
            <button className="ml-4 text-blue-600 underline" onClick={() => onView(doc)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
