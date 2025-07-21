import React from 'react';
import SubmittalReview from './SubmittalReview';

const submittals = [
  { id: 1, title: 'Submittal 1', status: 'Pending', date: '2025-07-15' },
  { id: 2, title: 'Submittal 2', status: 'Approved', date: '2025-07-10' },
  { id: 3, title: 'Submittal 3', status: 'Rejected', date: '2025-07-05' },
];

export default function SubmittalLog() {
  return (
    <div className="space-y-6 bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-extrabold text-blue-800">Submittal Log</h2>
      <table className="w-full bg-white rounded-xl shadow-xl">
        <thead>
          <tr className="bg-blue-200">
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {submittals.map(submittal => (
            <tr key={submittal.id} className="hover:bg-blue-50">
              <td className="px-4 py-2">{submittal.title}</td>
              <td className="px-4 py-2">{submittal.status}</td>
              <td className="px-4 py-2">{submittal.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
