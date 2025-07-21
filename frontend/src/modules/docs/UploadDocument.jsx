import React from 'react';
export default function UploadDocument() {
  return (
    <form className="bg-white p-4 rounded shadow mb-4 grid grid-cols-2 gap-4">
      <h2 className="col-span-2 text-xl font-bold mb-2">Upload Document</h2>
      <input className="border p-2 rounded" placeholder="Title" />
      <select className="border p-2 rounded"><option>Type</option><option>Drawing</option><option>Spec</option><option>RFI</option><option>O&M Manual</option></select>
      <input className="border p-2 rounded" placeholder="Phase" />
      <input className="border p-2 rounded" placeholder="Revision" />
      <input className="border p-2 rounded" placeholder="Uploader" />
      <input className="border p-2 rounded" placeholder="Tags (comma separated)" />
      <input type="file" className="col-span-2 border p-2 rounded" multiple />
      <button className="col-span-2 bg-blue-600 text-white px-4 py-2 rounded mt-2">Upload</button>
    </form>
  );
}
