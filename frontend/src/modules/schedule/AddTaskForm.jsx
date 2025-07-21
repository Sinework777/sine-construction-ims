import React from 'react';
export default function AddTaskForm() {
  return (
    <form className="bg-white p-4 rounded shadow mb-4 grid grid-cols-2 gap-4">
      <h2 className="col-span-2 text-xl font-bold mb-2">Add Task</h2>
      <input className="border p-2 rounded" placeholder="Task Name" />
      <input className="border p-2 rounded" placeholder="Phase" />
      <input className="border p-2 rounded" placeholder="Start Date" type="date" />
      <input className="border p-2 rounded" placeholder="End Date" type="date" />
      <input className="border p-2 rounded" placeholder="Dependencies" />
      <input className="border p-2 rounded" placeholder="Assigned To" />
      <textarea className="col-span-2 border p-2 rounded" placeholder="Task Logic/Notes" />
      <button className="col-span-2 bg-blue-600 text-white px-4 py-2 rounded mt-2">Add Task</button>
    </form>
  );
}
