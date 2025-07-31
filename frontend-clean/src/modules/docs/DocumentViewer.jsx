import React from 'react';
export default function DocumentViewer() {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-lg font-bold mb-2">Document Viewer</h2>
      <div className="border p-2 rounded bg-gray-100">PDF/Image preview area</div>
      <div className="mt-2 text-xs text-gray-500">Supports inline viewing of drawings, specs, RFIs, and manuals.</div>
    </div>
  );
}
