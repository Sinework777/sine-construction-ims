import React, { useState } from 'react';
import SidebarQAQC from '../components/SidebarQAQC';
import TopNavBar from '../components/TopNavBar.jsx';
import QuickActionButton from '../components/QuickActionButton.jsx';
import DashboardCard from '../components/DashboardCard.jsx';
import RoleGuard from '../components/RoleGuard.jsx';
import { Home, FileText, BarChart2, ListChecks, ClipboardCheck, ShieldCheck, UploadCloud, Bell, Settings } from 'lucide-react';

export default function DashboardQAQC() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <RoleGuard allowedRole="qaqc">
      <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
        <SidebarQAQC collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className="flex-1 flex flex-col">
          <TopNavBar />
          <QuickActionButton />
          <main className={`pt-24 px-8 transition-all duration-300 ${collapsed ? 'ml-20' : 'ml-64'} max-w-7xl mx-auto`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <DashboardCard title="Dashboard Overview" icon={<Home />} link="/dashboard/qaqc">
                Welcome, QA/QC Engineer
              </DashboardCard>
              <DashboardCard title="QA/QC Reports" icon={<FileText />} link="/dashboard/qaqc/reports">
                View and manage QA/QC reports.
              </DashboardCard>
              <DashboardCard title="NCRs" icon={<BarChart2 />} link="/dashboard/qaqc/ncrs">
                Track non-conformance reports.
              </DashboardCard>
              <DashboardCard title="Checklists" icon={<ListChecks />} link="/dashboard/qaqc/checklists">
                Access QA/QC checklists.
              </DashboardCard>
              <DashboardCard title="Inspections" icon={<ClipboardCheck />} link="/dashboard/qaqc/inspections">
                Submit and review inspections.
              </DashboardCard>
              <DashboardCard title="Approvals" icon={<ShieldCheck />} link="/dashboard/qaqc/approvals">
                Manage approvals and workflows.
              </DashboardCard>
              <DashboardCard title="Summary & Charts" icon={<BarChart2 />} link="/dashboard/qaqc/summary">
                View compliance analytics.
              </DashboardCard>
              <DashboardCard title="Export Reports" icon={<UploadCloud />} link="/dashboard/qaqc/reports-export">
                Export QA/QC reports (PDF/Excel).
              </DashboardCard>
              <DashboardCard title="Submittals" icon={<UploadCloud />} link="/dashboard/qaqc/submittals">
                Manage submittals and documents.
              </DashboardCard>
              <DashboardCard title="Notifications" icon={<Bell />} link="/dashboard/qaqc/notifications">
                View alerts and notifications.
              </DashboardCard>
              <DashboardCard title="Settings" icon={<Settings />} link="/dashboard/qaqc/settings">
                Dashboard settings and preferences.
              </DashboardCard>
            </div>
          </main>
        </div>
      </div>
    </RoleGuard>
  );
}
