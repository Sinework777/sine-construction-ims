import React from 'react';
export default function SubmittalAttachments() {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-lg font-bold mb-2">Submittal Attachments</h2>
      <input type="file" multiple className="mb-2" />
      <div className="flex gap-2">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Upload</button>
        <button className="bg-gray-600 text-white px-4 py-2 rounded">Preview</button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded">Export Version</button>
      </div>
      <div className="mt-2 text-xs text-gray-500">Versioning and preview supported for all attachments.</div>
    </div>
  );
}
