import React from 'react';
import { useState } from 'react';
import SidebarDocs from '../components/SidebarDocs';
import { FaUpload, FaFolderOpen, FaFileAlt } from 'react-icons/fa';
export default function DashboardDocs() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex">
      <SidebarDocs collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className="flex-1 ml-20 md:ml-64 p-6">
        <div className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-8">
          <h1 className="text-3xl font-bold mb-6">Welcome, Document Controller</h1>
          {/* ...existing dashboard content... */}
        </div>
      </main>
    </div>
  );
}
