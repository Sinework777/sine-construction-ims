import React from 'react';
export default function DocumentRegister() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Document Register</h1>
      <table className="w-full text-sm mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Title</th>
            <th className="p-2">Type</th>
            <th className="p-2">Phase</th>
            <th className="p-2">Revision</th>
            <th className="p-2">Uploader</th>
            <th className="p-2">Tags</th>
            <th className="p-2">Download</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2">Structural Drawing S-101</td>
            <td className="p-2">Drawing</td>
            <td className="p-2">IFC</td>
            <td className="p-2">A</td>
            <td className="p-2">Jane Doe</td>
            <td className="p-2">Structural</td>
            <td className="p-2"><button className="bg-blue-600 text-white px-2 py-1 rounded">Download</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
