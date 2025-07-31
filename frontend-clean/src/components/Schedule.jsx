import React, { useState } from 'react';
import ScheduleList from './Schedule/ScheduleList';
import ScheduleForm from './Schedule/ScheduleForm';
import ScheduleView from './Schedule/ScheduleView';

export default function Schedule() {
  const [tab, setTab] = useState('list');
  const [schedules, setSchedules] = useState([
    { id: 1, activity: 'Excavation', start: '2025-07-05', end: '2025-07-10', status: 'Completed' },
    { id: 2, activity: 'Foundation', start: '2025-07-12', end: '2025-07-20', status: 'Ongoing' },
  ]);
  const [selected, setSelected] = useState(null);

  function handleAdd() {
    setTab('form');
  }
  function handleSave(activity) {
    setSchedules([...schedules, { ...activity, id: schedules.length + 1 }]);
    setTab('list');
  }
  function handleCancel() {
    setTab('list');
  }
  function handleView(activity) {
    setSelected(activity);
    setTab('view');
  }
  function handleBack() {
    setSelected(null);
    setTab('list');
  }

  return (
    <div className="p-6 rounded-2xl shadow-md bg-white/90 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Schedule</h2>
      <div className="mb-4 flex gap-2">
        <button className={`px-4 py-2 rounded-xl shadow font-bold transition ${tab === 'list' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-blue-700'}`} onClick={() => setTab('list')}>Activity List</button>
        <button className={`px-4 py-2 rounded-xl shadow font-bold transition ${tab === 'form' ? 'bg-green-600 text-white' : 'bg-slate-200 text-green-700'}`} onClick={handleAdd}>+ Add Activity</button>
      </div>
      <div className="mt-4">
        {tab === 'list' && <ScheduleList onAdd={handleAdd} onView={handleView} />}
        {tab === 'form' && <ScheduleForm onSave={handleSave} onCancel={handleCancel} />}
        {tab === 'view' && <ScheduleView activity={selected} onBack={handleBack} />}
      </div>
    </div>
  );
}
