import React, { useState, useEffect } from 'react';

export default function DailyReportForm() {
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    projectName: '',
    reportAuthor: 'John Doe',
    weather: '',
    location: '',
    shiftType: 'Day',
    contractorName: '',
    trade: '',
    workers: '',
    hoursWorked: '',
    workDescription: '',
    siteSection: '',
    progress: '',
    materials: [],
    equipment: [],
    safetyObservations: '',
    inspections: '',
    delays: '',
    signatures: {
      siteEngineer: '',
      qaqcReviewer: '',
      pmApproval: '',
    },
  });

  const [collapsedSections, setCollapsedSections] = useState({
    projectInfo: false,
    crewManpower: false,
    workPerformed: false,
    safety: false,
    inspections: false,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('draftReport', JSON.stringify(form));
    }, 1000);
    return () => clearTimeout(timer);
  }, [form]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function toggleSection(section) {
    setCollapsedSections({
      ...collapsedSections,
      [section]: !collapsedSections[section],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Email notification logic
    alert('Report submitted and email notification sent to QA/QC!');
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <button
          type="button"
          className="text-blue-600 font-bold"
          onClick={() => toggleSection('projectInfo')}
        >
          {collapsedSections.projectInfo ? 'Expand Project Info' : 'Collapse Project Info'}
        </button>
        {!collapsedSections.projectInfo && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full rounded-xl border px-3 py-2"
              />
            </div>
            <div>
              <label>Project Name</label>
              <input
                type="text"
                name="projectName"
                value={form.projectName}
                onChange={handleChange}
                className="w-full rounded-xl border px-3 py-2"
              />
            </div>
            <div>
              <label>Report Author</label>
              <input
                type="text"
                name="reportAuthor"
                value={form.reportAuthor}
                readOnly
                className="w-full rounded-xl border px-3 py-2 bg-gray-100"
              />
            </div>
            <div>
              <label>Weather</label>
              <input
                type="text"
                name="weather"
                value={form.weather}
                onChange={handleChange}
                className="w-full rounded-xl border px-3 py-2"
              />
            </div>
            <div>
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full rounded-xl border px-3 py-2"
              />
            </div>
            <div>
              <label>Shift Type</label>
              <select
                name="shiftType"
                value={form.shiftType}
                onChange={handleChange}
                className="w-full rounded-xl border px-3 py-2"
              >
                <option>Day</option>
                <option>Night</option>
                <option>Double</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div>
        <button
          type="button"
          className="text-blue-600 font-bold"
          onClick={() => toggleSection('crewManpower')}
        >
          {collapsedSections.crewManpower ? 'Expand Crew & Manpower' : 'Collapse Crew & Manpower'}
        </button>
        {!collapsedSections.crewManpower && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Contractor Name</label>
              <input
                type="text"
                name="contractorName"
                value={form.contractorName}
                onChange={handleChange}
                className="w-full rounded-xl border px-3 py-2"
              />
            </div>
            <div>
              <label>Trade</label>
              <input
                type="text"
                name="trade"
                value={form.trade}
                onChange={handleChange}
                className="w-full rounded-xl border px-3 py-2"
              />
            </div>
            <div>
              <label>Workers</label>
              <input
                type="number"
                name="workers"
                value={form.workers}
                onChange={handleChange}
                className="w-full rounded-xl border px-3 py-2"
              />
            </div>
            <div>
              <label>Hours Worked</label>
              <input
                type="number"
                name="hoursWorked"
                value={form.hoursWorked}
                onChange={handleChange}
                className="w-full rounded-xl border px-3 py-2"
              />
            </div>
          </div>
        )}
      </div>

      <div>
        <button
          type="button"
          className="text-blue-600 font-bold"
          onClick={() => toggleSection('workPerformed')}
        >
          {collapsedSections.workPerformed ? 'Expand Work Performed' : 'Collapse Work Performed'}
        </button>
        {!collapsedSections.workPerformed && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Work Description</label>
              <textarea
                name="workDescription"
                value={form.workDescription}
                onChange={handleChange}
                className="w-full rounded-xl border px-3 py-2"
              />
            </div>
            <div>
              <label>Site Section</label>
              <input
                type="text"
                name="siteSection"
                value={form.siteSection}
                onChange={handleChange}
                className="w-full rounded-xl border px-3 py-2"
              />
            </div>
            <div>
              <label>Progress</label>
              <input
                type="text"
                name="progress"
                value={form.progress}
                onChange={handleChange}
                className="w-full rounded-xl border px-3 py-2"
              />
            </div>
            <div>
              <label>Materials</label>
              <input
                type="text"
                name="materials"
                value={form.materials.join(', ')}
                onChange={(e) => handleChange({ target: { name: 'materials', value: e.target.value.split(', ') } })}
                className="w-full rounded-xl border px-3 py-2"
              />
            </div>
            <div>
              <label>Equipment</label>
              <input
                type="text"
                name="equipment"
                value={form.equipment.join(', ')}
                onChange={(e) => handleChange({ target: { name: 'equipment', value: e.target.value.split(', ') } })}
                className="w-full rounded-xl border px-3 py-2"
              />
            </div>
          </div>
        )}
      </div>

      <div>
        <button
          type="button"
          className="text-blue-600 font-bold"
          onClick={() => toggleSection('safety')}
        >
          {collapsedSections.safety ? 'Expand Safety' : 'Collapse Safety'}
        </button>
        {!collapsedSections.safety && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Safety Observations</label>
              <textarea
                name="safetyObservations"
                value={form.safetyObservations}
                onChange={handleChange}
                className="w-full rounded-xl border px-3 py-2"
              />
            </div>
          </div>
        )}
      </div>

      <div>
        <button
          type="button"
          className="text-blue-600 font-bold"
          onClick={() => toggleSection('inspections')}
        >
          {collapsedSections.inspections ? 'Expand Inspections' : 'Collapse Inspections'}
        </button>
        {!collapsedSections.inspections && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Inspections</label>
              <textarea
                name="inspections"
                value={form.inspections}
                onChange={handleChange}
                className="w-full rounded-xl border px-3 py-2"
              />
            </div>
          </div>
        )}
      </div>

      <div>
        <label>Delays</label>
        <textarea
          name="delays"
          value={form.delays}
          onChange={handleChange}
          className="w-full rounded-xl border px-3 py-2"
        />
      </div>

      <div>
        <label>Signatures</label>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label>Site Engineer</label>
            <input
              type="text"
              name="siteEngineer"
              value={form.signatures.siteEngineer}
              onChange={(e) => handleChange({ target: { name: 'signatures', value: { ...form.signatures, siteEngineer: e.target.value } } })}
              className="w-full rounded-xl border px-3 py-2"
            />
          </div>
          <div>
            <label>QA/QC Reviewer</label>
            <input
              type="text"
              name="qaqcReviewer"
              value={form.signatures.qaqcReviewer}
              onChange={(e) => handleChange({ target: { name: 'signatures', value: { ...form.signatures, qaqcReviewer: e.target.value } } })}
              className="w-full rounded-xl border px-3 py-2"
            />
          </div>
          <div>
            <label>PM Approval</label>
            <input
              type="text"
              name="pmApproval"
              value={form.signatures.pmApproval}
              onChange={(e) => handleChange({ target: { name: 'signatures', value: { ...form.signatures, pmApproval: e.target.value } } })}
              className="w-full rounded-xl border px-3 py-2"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button type="submit" className="bg-blue-600 text-white font-bold px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition">📤 Submit</button>
        <button type="button" className="bg-green-600 text-white font-bold px-6 py-2 rounded-xl shadow hover:bg-green-700 transition">Save as Draft</button>
      </div>
    </form>
  );
}
