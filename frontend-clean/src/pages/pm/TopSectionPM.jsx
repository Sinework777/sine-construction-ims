import React from 'react';
import { Bell, ClipboardList, Brain, Activity, Sun } from 'lucide-react';

export default function TopSectionPM({ pmName, project, notifications, tasks, aiInsights, projectHealth, weather }) {
  return (
    <section className="mb-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">Welcome Project Manager {pmName}</h1>
      <div className="text-lg text-blue-700 font-semibold mb-6">Project: {project}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <div className="bg-white/80 rounded-xl p-6 shadow flex flex-col items-center">
          <Bell className="w-8 h-8 text-blue-500 mb-2" />
          <div className="font-bold">Latest Notifications</div>
          <ul className="text-sm mt-2 text-slate-700">
            {notifications.map((n, i) => <li key={i}>{n}</li>)}
          </ul>
        </div>
        <div className="bg-white/80 rounded-xl p-6 shadow flex flex-col items-center">
          <ClipboardList className="w-8 h-8 text-indigo-500 mb-2" />
          <div className="font-bold">Today's Tasks</div>
          <ul className="text-sm mt-2 text-slate-700">
            {tasks.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
        <div className="bg-white/80 rounded-xl p-6 shadow flex flex-col items-center">
          <Brain className="w-8 h-8 text-pink-500 mb-2" />
          <div className="font-bold">AI Insights</div>
          <ul className="text-sm mt-2 text-slate-700">
            {aiInsights.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </div>
        <div className="bg-white/80 rounded-xl p-6 shadow flex flex-col items-center">
          <Activity className={`w-8 h-8 mb-2 ${projectHealth === 'Good' ? 'text-green-500' : projectHealth === 'Risk' ? 'text-yellow-500' : 'text-red-500'}`} />
          <div className="font-bold">Project Health</div>
          <div className="text-lg mt-2 font-semibold">{projectHealth}</div>
        </div>
        <div className="bg-white/80 rounded-xl p-6 shadow flex flex-col items-center">
          <Sun className="w-8 h-8 text-yellow-400 mb-2" />
          <div className="font-bold">Weather</div>
          <div className="text-lg mt-2 font-semibold">{weather}</div>
        </div>
      </div>
    </section>
  );
}
