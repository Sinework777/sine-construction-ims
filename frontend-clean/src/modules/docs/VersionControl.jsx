import React from 'react';
export default function VersionControl() {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-lg font-bold mb-2">Version Control</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Revision</th>
            <th className="p-2">Date</th>
            <th className="p-2">Uploader</th>
            <th className="p-2">Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2">A</td>
            <td className="p-2">2025-07-20</td>
            <td className="p-2">Jane Doe</td>
            <td className="p-2">Initial upload</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
