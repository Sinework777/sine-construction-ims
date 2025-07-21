import { Outlet } from 'react-router-dom';
import TopNavBar from '../../components/TopNavBar.jsx';
import QuickActionButton from '../../components/QuickActionButton.jsx';

export default function DashboardQAQC() {
  // Dummy user info for QA/QC workflow
  const user = {
    name: 'QA/QC Engineer',
    role: 'QAQC',
    avatar: 'https://ui-avatars.com/api/?name=QAQC+Engineer',
  };
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top NavBar */}
        <TopNavBar user={user} />
        {/* Quick Actions */}
        <div className="px-6 pt-4 flex gap-4">
          <QuickActionButton label="New NCR" icon="FilePlus" to="/dashboard/qaqc/ncrs/new" />
          <QuickActionButton label="New Checklist" icon="ClipboardCheck" to="/dashboard/qaqc/checklists/new" />
          <QuickActionButton label="New Inspection" icon="SearchCheck" to="/dashboard/qaqc/inspections/new" />
          <QuickActionButton label="Export" icon="Download" to="/dashboard/qaqc/export" />
        </div>
        {/* Main QA/QC module content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* Render QA/QC submodules via router */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
