import React from 'react';
export default function SubmittalLog({ status }) {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-lg font-bold mb-2">Submittal Log ({status})</h2>
      <input className="border p-2 rounded mb-2 w-full" placeholder="Search by title, spec section, contractor..." />
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Title</th>
            <th className="p-2">Spec Section</th>
            <th className="p-2">Type</th>
            <th className="p-2">Contractor</th>
            <th className="p-2">Reviewer</th>
            <th className="p-2">Status</th>
            <th className="p-2">Dates</th>
            <th className="p-2">Remarks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2">Concrete Mix</td>
            <td className="p-2">03300</td>
            <td className="p-2">Material</td>
            <td className="p-2">ABC Construction</td>
            <td className="p-2">John Smith</td>
            <td className="p-2">Pending</td>
            <td className="p-2">2025-07-20</td>
            <td className="p-2">Initial submission</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
