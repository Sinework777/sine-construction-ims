import React from 'react';
export default function QAApprovals() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">QA/QC Approvals</h1>
      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="text-lg font-bold mb-2">Approval Workflow</h2>
        <div className="flex gap-2 mb-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded">Approve</button>
          <button className="bg-red-600 text-white px-4 py-2 rounded">Reject</button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded">Comment</button>
        </div>
        <textarea className="border p-2 rounded w-full" placeholder="Add approval comments..." />
        <div className="mt-2 text-xs text-gray-500">Signature and audit trail included.</div>
      </div>
    </div>
  );
}
