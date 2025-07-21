import React, { useState } from 'react';
import SignaturePad from 'react-signature-canvas';

export default function NewReportForm() {
  const [collapsed, setCollapsed] = useState(false);
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0,10),
    project: 'Tower A',
    shift: 'Day',
    weather: '',
    temperature: '',
    humidity: '',
    wind: '',
    crewCount: '',
    manpower: '',
    subcontractors: '',
    siteCondition: '',
    materialsDelivered: '',
    equipmentUsed: '',
    workCompleted: '',
    tasksPlanned: '',
    delays: '',
    issues: '',
    safetyObservations: '',
    incidents: '',
    visitors: '',
    inspections: '',
    approvals: '',
    photos: [],
    logs: [],
    comments: '',
    status: 'Draft',
    images: [],
    eSign: 'John Doe (Supervisor)',
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImageUpload(e) {
    setForm({ ...form, images: [...form.images, ...Array.from(e.target.files)] });
  }

  function handleClearSignature() {
    sigPad.clear();
    setForm({ ...form, signature: '' });
  }

  function handleSaveSignature() {
    setForm({ ...form, signature: sigPad.getTrimmedCanvas().toDataURL('image/png') });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: Save logic
    alert('Report submitted!');
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-4">
      <button className="mb-4 text-blue-600 font-bold" onClick={() => setCollapsed(c => !c)}>
        {collapsed ? 'Expand New Report Form' : 'Collapse New Report Form'}
      </button>
      {!collapsed && (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">Date</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full rounded-xl border px-3 py-2" required />
            </div>
            <div>
              <label className="block font-semibold">Project</label>
              <input type="text" name="project" value={form.project} onChange={handleChange} className="w-full rounded-xl border px-3 py-2" />
            </div>
            <div>
              <label className="block font-semibold">Shift</label>
              <select name="shift" value={form.shift} onChange={handleChange} className="w-full rounded-xl border px-3 py-2">
                <option>Day</option>
                <option>Night</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold">Weather</label>
              <input type="text" name="weather" value={form.weather} onChange={handleChange} className="w-full rounded-xl border px-3 py-2" placeholder="Sunny" />
            </div>
            <div>
              <label className="block font-semibold">Temperature (°C)</label>
              <input type="number" name="temperature" value={form.temperature} onChange={handleChange} className="w-full rounded-xl border px-3 py-2" />
            </div>
            <div>
              <label className="block font-semibold">Humidity (%)</label>
              <input type="number" name="humidity" value={form.humidity} onChange={handleChange} className="w-full rounded-xl border px-3 py-2" />
            </div>
            <div>
              <label className="block font-semibold">Wind (km/h)</label>
              <input type="number" name="wind" value={form.wind} onChange={handleChange} className="w-full rounded-xl border px-3 py-2" />
            </div>
            <div>
              <label className="block font-semibold">Crew Count</label>
              <input type="number" name="crewCount" value={form.crewCount} onChange={handleChange} className="w-full rounded-xl border px-3 py-2" />
            </div>
            <div>
              <label className="block font-semibold">Manpower</label>
              <input type="number" name="manpower" value={form.manpower} onChange={handleChange} className="w-full rounded-xl border px-3 py-2" />
            </div>
            <div>
              <label className="block font-semibold">Subcontractors</label>
              <input type="text" name="subcontractors" value={form.subcontractors} onChange={handleChange} className="w-full rounded-xl border px-3 py-2" />
            </div>
            <div>
              <label className="block font-semibold">Site Condition</label>
              <input type="text" name="siteCondition" value={form.siteCondition} onChange={handleChange} className="w-full rounded-xl border px-3 py-2" />
            </div>
            <div>
              <label className="block font-semibold">Materials Delivered</label>
              <input type="text" name="materialsDelivered" value={form.materialsDelivered} onChange={handleChange} className="w-full rounded-xl border px-3 py-2" />
            </div>
            <div>
              <label className="block font-semibold">Equipment Used</label>
              <input type="text" name="equipmentUsed" value={form.equipmentUsed} onChange={handleChange} className="w-full rounded-xl border px-3 py-2" />
            </div>
            <div>
              <label className="block font-semibold">Work Completed</label>
              <textarea name="workCompleted" value={form.workCompleted} onChange={handleChange} className="w-full rounded-xl border px-3 py-2" rows={2} />
            </div>
            <div>
              <label className="block font-semibold">Tasks Planned</label>
              <textarea name="tasksPlanned" value={form.tasksPlanned} onChange={handleChange} className="w-full rounded-xl border px-3 py-2" rows={2} />
            </div>
            <div>
              <label className="block font-semibold">Delays</label>
              <textarea name="delays" value={form.delays} onChange={handleChange} className="w-full rounded-xl border px-3 py-2" rows={2} />
            </div>
            <div>
              <label className="block font-semibold">Issues</label>
              <textarea name="issues" value={form.issues} onChange={handleChange} className="w-full rounded-xl border px-3 py-2" rows={2} />
            </div>
            <div>
              <label className="block font-semibold">Safety Observations</label>
              <textarea name="safetyObservations" value={form.safetyObservations} onChange={handleChange} className="w-full rounded-xl border px-3 py-2" rows={2} />
            </div>
            <div>
              <label className="block font-semibold">Incidents</label>
              <textarea name="incidents" value={form.incidents} onChange={handleChange} className="w-full rounded-xl border px-3 py-2" rows={2} />
            </div>
            <div>
              <label className="block font-semibold">Visitors</label>
              <input type="text" name="visitors" value={form.visitors} onChange={handleChange} className="w-full rounded-xl border px-3 py-2" />
            </div>
            <div>
              <label className="block font-semibold">Inspections</label>
              <input type="text" name="inspections" value={form.inspections} onChange={handleChange} className="w-full rounded-xl border px-3 py-2" />
            </div>
            <div>
              <label className="block font-semibold">Approvals</label>
              <input type="text" name="approvals" value={form.approvals} onChange={handleChange} className="w-full rounded-xl border px-3 py-2" />
            </div>
          </div>
          <div>
            <label className="block font-semibold">Upload Photos</label>
            <input type="file" multiple onChange={handleImageUpload} className="w-full" />
            <div className="flex gap-2 mt-2 flex-wrap">
              {form.images.map((img, idx) => (
                <span key={idx} className="inline-block bg-blue-100 px-2 py-1 rounded-xl text-xs">{img.name}</span>
              ))}
            </div>
          </div>
          <div>
            <label className="block font-semibold">Upload Logs</label>
            <input type="file" multiple onChange={handleImageUpload} className="w-full" />
            <div className="flex gap-2 mt-2 flex-wrap">
              {form.logs && form.logs.map((log, idx) => (
                <span key={idx} className="inline-block bg-green-100 px-2 py-1 rounded-xl text-xs">{log.name}</span>
              ))}
            </div>
          </div>
          <div>
            <label className="block font-semibold">Comments / Notes</label>
            <textarea name="comments" value={form.comments} onChange={handleChange} className="w-full rounded-xl border px-3 py-2" rows={2} />
          </div>
          <div>
            <label className="block font-semibold">Supervisor E-Sign</label>
            <input type="text" name="eSign" value={form.eSign} readOnly className="w-full rounded-xl border px-3 py-2 bg-slate-100 font-bold" />
          </div>
          <div>
            <label className="block font-semibold">Upload Images/Logs</label>
            <input type="file" multiple onChange={handleImageUpload} className="w-full" />
            <div className="flex gap-2 mt-2 flex-wrap">
              {form.images.map((img, idx) => (
                <span key={idx} className="inline-block bg-blue-100 px-2 py-1 rounded-xl text-xs">{img.name}</span>
              ))}
            </div>
          </div>
          <div>
            <label className="block font-semibold">Supervisor E-Sign</label>
            <input type="text" name="eSign" value={form.eSign} readOnly className="w-full rounded-xl border px-3 py-2 bg-slate-100 font-bold" />
          </div>
          <div className="flex gap-4 mt-4">
            <button type="submit" className="bg-blue-600 text-white font-bold px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition">📤 Submit</button>
            <button type="button" className="bg-green-600 text-white font-bold px-6 py-2 rounded-xl shadow hover:bg-green-700 transition">Save as Draft</button>
            <button type="button" className="bg-indigo-600 text-white font-bold px-6 py-2 rounded-xl shadow hover:bg-indigo-700 transition">⬇ Export PDF</button>
            <button type="button" className="bg-yellow-500 text-white font-bold px-6 py-2 rounded-xl shadow hover:bg-yellow-600 transition">⬇ Export Excel</button>
          </div>
        </form>
      )}
    </div>
  );
}
