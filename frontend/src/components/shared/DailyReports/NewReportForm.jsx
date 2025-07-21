// Shared NewReportForm for Daily Reports
import React from 'react';
import { RoleGuard } from '../../auth/RoleGuard';

export default function NewReportForm({ userRole, project, onSubmit }) {
  // ...existing logic, fields, and UI from original NewReportForm
  // Add role-based field visibility and permissions
  // Example: show safety fields only for HSE
  // Use userRole to conditionally render fields
  // Example: role-based field visibility
  // PM: full access, QAQC: read/comment, HSE: safety, Superintendent: limited edit
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div>
        <label className="block font-semibold">Project</label>
        <input type="text" name="project" defaultValue={project} className="input" readOnly />
      </div>
      <div>
        <label className="block font-semibold">Date</label>
        <input type="date" name="date" className="input" required />
      </div>
      <div>
        <label className="block font-semibold">Shift</label>
        <select name="shift" className="input">
          <option>Day</option>
          <option>Night</option>
        </select>
      </div>
      <div>
        <label className="block font-semibold">Weather</label>
        <input type="text" name="weather" className="input" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold">Temperature (°C)</label>
          <input type="number" name="temperature" className="input" />
        </div>
        <div>
          <label className="block font-semibold">Humidity (%)</label>
          <input type="number" name="humidity" className="input" />
        </div>
        <div>
          <label className="block font-semibold">Wind (km/h)</label>
          <input type="number" name="wind" className="input" />
        </div>
      </div>
      <div>
        <label className="block font-semibold">Crew Count</label>
        <input type="number" name="crewCount" className="input" />
      </div>
      <div>
        <label className="block font-semibold">Manpower</label>
        <textarea name="manpower" className="input" placeholder="List trades, counts, hours" />
      </div>
      <div>
        <label className="block font-semibold">Subcontractors</label>
        <textarea name="subcontractors" className="input" />
      </div>
      <div>
        <label className="block font-semibold">Site Condition</label>
        <textarea name="siteCondition" className="input" />
      </div>
      <div>
        <label className="block font-semibold">Materials Delivered</label>
        <textarea name="materialsDelivered" className="input" />
      </div>
      <div>
        <label className="block font-semibold">Equipment Used</label>
        <textarea name="equipmentUsed" className="input" />
      </div>
      <div>
        <label className="block font-semibold">Work Completed</label>
        <textarea name="workCompleted" className="input" />
      </div>
      <div>
        <label className="block font-semibold">Tasks Planned</label>
        <textarea name="tasksPlanned" className="input" />
      </div>
      <div>
        <label className="block font-semibold">Delays</label>
        <textarea name="delays" className="input" />
      </div>
      <div>
        <label className="block font-semibold">Issues</label>
        <textarea name="issues" className="input" />
      </div>
      <RoleGuard role={userRole} action="safety">
        <div>
          <label className="block font-semibold">Safety Observations</label>
          <textarea name="safetyObservations" className="input" />
        </div>
        <div>
          <label className="block font-semibold">Incidents</label>
          <textarea name="incidents" className="input" />
        </div>
      </RoleGuard>
      <div>
        <label className="block font-semibold">Visitors</label>
        <textarea name="visitors" className="input" />
      </div>
      <div>
        <label className="block font-semibold">Inspections</label>
        <textarea name="inspections" className="input" />
      </div>
      <div>
        <label className="block font-semibold">Approvals</label>
        <textarea name="approvals" className="input" />
      </div>
      <div>
        <label className="block font-semibold">Photo/Log Uploads</label>
        <input type="file" name="photos" multiple className="input" />
      </div>
      <div>
        <label className="block font-semibold">Comments</label>
        <textarea name="comments" className="input" />
      </div>
      <div>
        <label className="block font-semibold">Status</label>
        <select name="status" className="input">
          <option>Draft</option>
          <option>Submitted</option>
          <option>Approved</option>
        </select>
      </div>
      <div>
        <label className="block font-semibold">Digital E-Sign</label>
        <input type="text" name="esign" className="input" placeholder="Type your name for E-sign" />
      </div>
      <button type="submit" className="btn-primary">Submit Report</button>
    </form>
  );
}
