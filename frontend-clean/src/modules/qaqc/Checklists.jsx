import React from 'react';
export default function Checklists() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">QA/QC Checklists (ASTM/USACE)</h1>
      <form className="bg-white p-4 rounded shadow mb-4 grid grid-cols-2 gap-4">
        <input className="border p-2 rounded" placeholder="Checklist Category" />
        <input className="border p-2 rounded" placeholder="Trade/Material" />
        <input className="border p-2 rounded" placeholder="Inspector" />
        <input className="border p-2 rounded" type="date" placeholder="Date" />
        <textarea className="col-span-2 border p-2 rounded" placeholder="Checklist Items" />
        <button className="col-span-2 bg-blue-600 text-white px-4 py-2 rounded mt-2">Add Checklist</button>
      </form>
      <div className="mt-4">Export: <button className="bg-yellow-500 text-white px-4 py-2 rounded">PDF</button> <button className="bg-yellow-500 text-white px-4 py-2 rounded">Excel</button></div>
    </div>
  );
}
