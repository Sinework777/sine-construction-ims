import React from 'react';
export default function NewSubmittalForm() {
  return (
    <form className="bg-white p-4 rounded shadow mb-4 grid grid-cols-2 gap-4">
      <h2 className="col-span-2 text-xl font-bold mb-2">New Submittal (CSI Format)</h2>
      <input className="border p-2 rounded" placeholder="Title" />
      <input className="border p-2 rounded" placeholder="Spec Section" />
      <input className="border p-2 rounded" placeholder="Type" />
      <input className="border p-2 rounded" placeholder="Contractor" />
      <input className="border p-2 rounded" placeholder="Reviewer" />
      <select className="border p-2 rounded"><option>Status</option><option>Pending</option><option>Reviewed</option><option>Approved</option></select>
      <input className="border p-2 rounded" type="date" placeholder="Submission Date" />
      <input className="border p-2 rounded" type="date" placeholder="Review Date" />
      <textarea className="col-span-2 border p-2 rounded" placeholder="Remarks" />
      <button className="col-span-2 bg-blue-600 text-white px-4 py-2 rounded mt-2">Submit</button>
    </form>
  );
}
