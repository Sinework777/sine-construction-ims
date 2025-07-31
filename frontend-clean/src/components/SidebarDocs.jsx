import React from 'react';
import { FileText, UploadCloud, Tag, Layers } from 'lucide-react';
const modules = [
  { name: 'Document Register', icon: <Layers />, route: '/dashboard/docs/document-register' },
  { name: 'Uploads & Versioning', icon: <UploadCloud />, route: '/dashboard/docs/uploads' },
  { name: 'Tags & Filters', icon: <Tag />, route: '/dashboard/docs/tags' },
  { name: 'Submittals', icon: <FileText />, route: '/dashboard/docs/submittals' },
];
export default function SidebarDocs({ collapsed, setCollapsed }) {
  return (
    <aside className={`h-screen fixed left-0 top-0 z-30 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} bg-gradient-to-br from-yellow-50 to-slate-100 shadow-xl flex flex-col`}>
      <div className="flex items-center justify-between px-4 py-6">
        <span className="font-extrabold text-xl text-yellow-700">Docs</span>
        <button onClick={() => setCollapsed && setCollapsed(c => !c)} className="text-yellow-600 font-bold">{collapsed ? '>' : '<'}</button>
      </div>
      <nav className="flex-1 flex flex-col gap-2 px-2">
        {modules.map(mod => (
          <a key={mod.name} href={mod.route} className={`flex items-center gap-3 px-3 py-2 rounded-xl font-semibold text-white bg-yellow-500 hover:scale-105 transition-all duration-200 shadow-lg`}>
            <span className="text-xl">{mod.icon}</span>
            {!collapsed && <span>{mod.name}</span>}
          </a>
        ))}
      </nav>
    </aside>
  );
}
