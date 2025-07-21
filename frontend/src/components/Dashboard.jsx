import React from 'react';
import { useNavigate } from 'react-router-dom';
import rolesConfig from './roles';
import Sidebar from './Sidebar';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    navigate('/login');
    return null;
  }

  const allowedModules = rolesConfig[user.role] || [];

  function handleLogout() {
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar allowedModules={allowedModules} />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Welcome, {user.email}</h1>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded bg-blue-500 text-white text-sm">{user.role}</span>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allowedModules.map((module) => (
            <div
              key={module}
              className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
            >
              <h3 className="text-lg font-semibold">{module}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
