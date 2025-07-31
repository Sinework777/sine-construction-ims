// Central icon map for SystemAdminDashboard modules
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import BackupIcon from '@mui/icons-material/Backup';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import FlagIcon from '@mui/icons-material/Flag';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';

export const moduleIcons = {
  multitenancy: PeopleIcon,
  globalusers: PeopleIcon,
  roles: SecurityIcon,
  licensebilling: SubscriptionsIcon,
  auditlogging: ListAltIcon,
  securitycompliance: SecurityIcon,
  settings: SettingsIcon,
  backupsrecovery: BackupIcon,
  supportannouncements: SupportAgentIcon,
  platformanalytics: BarChartIcon,
  apikeys: VpnKeyIcon,
  featureflags: FlagIcon,
  projects: AssignmentIcon,
  monitoring: BarChartIcon,
  workflows: FlagIcon,
  support: SupportAgentIcon,
  data: BackupIcon,
  tasks: ScheduleIcon,
  licenses: SubscriptionsIcon,
};
