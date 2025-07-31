import React from 'react';
export default function BOQList({ items, onAdd, onView, canEdit }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold">BOQ Items</h3>
        <button
          className={`bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition ${!canEdit ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={onAdd}
          disabled={!canEdit}
        >
          + Add Item
        </button>
      </div>
      <ul className="divide-y divide-slate-200">
        {items.map(item => (
          <li key={item.id} className="py-3 flex justify-between items-center hover:bg-blue-50 rounded-xl transition">
            <span className="font-semibold">{item.description}</span>
            <span className="text-sm text-slate-500">{item.qty} {item.unit}</span>
            <span className={`text-xs px-2 py-1 rounded ${item.status === 'Verified' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-700'}`}>{item.status}</span>
            <button className="ml-4 text-blue-600 underline" onClick={() => onView(item)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
