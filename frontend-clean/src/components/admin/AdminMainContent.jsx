
import Overview from './Overview.jsx';

console.log('AdminMainContent mounted');
import UserApprovalLanding from './UserApprovalLanding.jsx';
import ManageUsersLanding from './ManageUsersLanding.jsx';
import EntitiesManagementLanding from './EntitiesManagementLanding.jsx';
import Analytics from './Analytics.jsx';
import GlobalSearch from './GlobalSearch.jsx';
import Notifications from './Notifications.jsx';
import Projects from './Projects.jsx';
import Compliance from './Compliance.jsx';
import SupportLanding from './SupportLanding.jsx';
import APIIntegrations from './APIIntegrations.jsx';
import Security from './Security.jsx';
import Automation from './Automation.jsx';
import Settings from './Settings.jsx';

import { useParams } from 'react-router-dom';

// Placeholder for main content routing and widgets
export default function AdminMainContent() {
  const { module } = useParams();
  // Map sidebar keys to actual module components

  const modules = {
    dashboard: <Overview />,
    'user-approval': <UserApprovalLanding />,
    'manage-users': <ManageUsersLanding />,
    entities: <EntitiesManagementLanding />,
    analytics: <Analytics />,
    search: <GlobalSearch />,
    notifications: <Notifications />,
    projects: <Projects />,
    compliance: <Compliance />,
    support: <SupportLanding />,
    api: <APIIntegrations />,
    security: <Security />,
    automation: <Automation />,
    settings: <Settings />,
  };
  return (
    <Box sx={{ p: 3 }}>
      {modules[module] || <NotFoundModule />}
    </Box>
  );
}
