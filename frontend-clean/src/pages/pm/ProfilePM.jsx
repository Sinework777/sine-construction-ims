import React, { useState } from 'react';
import Modal from '../../components/Modal'; // Assume a Modal component exists or will be created
import { LogOut, Settings, User } from 'lucide-react';

export default function ProfilePM({ pmName, email, role, project, onLogout, onProfileUpdate, onPasswordReset }) {
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [editName, setEditName] = useState(pmName);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      await onProfileUpdate({ name: editName });
      setShowSettings(false);
    } catch {
      setError('Failed to update profile.');
    }
    setSaving(false);
  };

  return (
    <div className="relative">
      <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition" onClick={() => setOpen(o => !o)}>
        <User className="w-6 h-6" />
        <span className="font-semibold">{pmName}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl ring-1 ring-slate-200 z-40 p-4 animate-fade-in">
          <div className="font-bold mb-1">{pmName}</div>
          <div className="text-xs text-slate-600 mb-1">{email}</div>
          <div className="text-xs text-slate-500 mb-2">Role: {role}</div>
          <div className="text-sm text-slate-600 mb-2">Project: {project}</div>
          <button className="w-full text-left px-2 py-2 rounded hover:bg-slate-100 transition" onClick={() => setShowSettings(true)}><Settings className="inline mr-2" />Profile Settings</button>
          <button className="w-full text-left px-2 py-2 rounded hover:bg-slate-100 transition" onClick={onLogout}><LogOut className="inline mr-2" />Logout</button>
        </div>
      )}
      {showSettings && (
        <Modal onClose={() => setShowSettings(false)}>
          <div className="p-4 w-80">
            <h2 className="text-lg font-bold mb-2">Edit Profile</h2>
            <label className="block text-sm mb-1">Name</label>
            <input className="w-full border rounded px-2 py-1 mb-2" value={editName} onChange={e => setEditName(e.target.value)} />
            <label className="block text-sm mb-1">Email</label>
            <input className="w-full border rounded px-2 py-1 mb-2 bg-slate-100" value={email} disabled />
            <label className="block text-sm mb-1">Role</label>
            <input className="w-full border rounded px-2 py-1 mb-2 bg-slate-100" value={role} disabled />
            {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
            <div className="flex gap-2 mt-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
              <button className="bg-slate-200 px-4 py-2 rounded hover:bg-slate-300" onClick={() => setShowSettings(false)}>Cancel</button>
            </div>
            <button className="mt-4 text-blue-600 underline text-sm" onClick={onPasswordReset}>Send Password Reset Email</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
