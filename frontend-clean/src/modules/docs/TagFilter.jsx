import React from 'react';
export default function TagFilter() {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-lg font-bold mb-2">Tag Filter</h2>
      <input className="border p-2 rounded mb-2 w-full" placeholder="Search by tag, discipline, uploader..." />
      <div className="flex gap-2">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Structural</button>
        <button className="bg-green-600 text-white px-4 py-2 rounded">Mechanical</button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded">Electrical</button>
        <button className="bg-gray-600 text-white px-4 py-2 rounded">Specs</button>
      </div>
    </div>
  );
}
