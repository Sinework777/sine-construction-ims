// src/pages/admin/AdminDashboard.jsx


import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import TopBar from '../../components/admin/TopBar';
import { useAuth } from '../../context/useAuth';
import axios from '../../axiosInstance';

export default function AdminDashboard() {
  const { currentUser } = useAuth() || {};
  const [stats, setStats] = useState({ users: 0, projects: 0, approvals: 0, modules: 0 });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        const [usersRes, projectsRes, , modulesRes, logsRes] = await Promise.all([
          axios.get('/api/users'),
          axios.get('/api/projects'),
          axios.get('/api/users'),
          Promise.resolve({ data: [
            { name: 'User Management' }, { name: 'System Settings' }, { name: 'Approval Panel' }, { name: 'Audit Log' }, { name: 'Project Configuration' }
          ] }),
          axios.get('/api/audit-logs'),
        ]);
        setStats({
          users: usersRes.data.length,
          projects: projectsRes.data.length,
          approvals: usersRes.data.filter(u => u.status === 'Pending').length,
          modules: modulesRes.data.length,
        });
        setActivities(logsRes.data.slice(0, 6));
      } catch {
        setStats({ users: 0, projects: 0, approvals: 0, modules: 0 });
        setActivities([]);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (!currentUser) return <div style={{textAlign:'center',marginTop:'20vh'}}>Loading...</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-6 md:p-10 bg-gray-50">
          <h1 className="text-2xl font-bold mb-6">System Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <div className="text-3xl font-bold text-blue-600">{loading ? '--' : stats.users}</div>
              <div className="text-gray-700 mt-2">Total Users</div>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <div className="text-3xl font-bold text-green-600">{loading ? '--' : stats.projects}</div>
              <div className="text-gray-700 mt-2">Active Projects</div>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <div className="text-3xl font-bold text-yellow-600">{loading ? '--' : stats.approvals}</div>
              <div className="text-gray-700 mt-2">Pending Approvals</div>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <div className="text-3xl font-bold text-purple-600">{loading ? '--' : stats.modules}</div>
              <div className="text-gray-700 mt-2">Active Modules</div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="font-bold mb-2">System Activity Feed</div>
              {loading ? <div>Loading...</div> : activities.length === 0 ? <div className="text-gray-500">No recent activity.</div> : (
                <ul className="divide-y">
                  {activities.map((a, i) => (
                    <li key={i} className="py-2 text-sm">
                      <span className="font-semibold text-blue-700">{a.user}</span> {a.action} <span className="text-gray-500">({a.date})</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
              <div className="font-bold mb-2">Quick Links</div>
              <div className="flex flex-wrap gap-3 justify-center">
                <a href="/dashboard/admin/users" className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded font-semibold">Manage Users</a>
                <a href="/dashboard/admin/projects" className="bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded font-semibold">Projects</a>
                <a href="/dashboard/admin/approvals" className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-4 py-2 rounded font-semibold">Approvals</a>
                <a href="/dashboard/admin/settings" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded font-semibold">Settings</a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
