// Master config for all modules, submodules, and sub-submodules in the System Admin Dashboard
// Add/expand as needed for full enterprise IMS coverage
export const adminDashboardModules = [
  {
    key: 'user-management',
    label: 'User Management',
    icon: 'FaUsers',
    submodules: [
      { key: 'roles', label: 'Roles & Permissions' },
      { key: 'access-matrix', label: 'Access Matrix' },
      { key: 'audit-log', label: 'Audit Log', submodules: [
        { key: 'filters', label: 'Filters', submodules: [
          { key: 'advanced-criteria', label: 'Advanced Criteria' },
        ] },
        { key: 'export', label: 'Export Logs' },
      ] },
    ],
  },
  {
    key: 'system-settings',
    label: 'System Settings',
    icon: 'FaCog',
    submodules: [
      { key: 'feature-flags', label: 'Feature Flags' },
      { key: 'notifications', label: 'Notifications' },
      { key: 'update-manager', label: 'System Update Manager' },
    ],
  },
  {
    key: 'project-management',
    label: 'Project Management',
    icon: 'FaProjectDiagram',
    submodules: [
      { key: 'projects', label: 'Projects' },
      { key: 'assignments', label: 'Assignments' },
      { key: 'kpi', label: 'KPIs & Analytics' },
    ],
  },
  {
    key: 'qaqc',
    label: 'QA/QC',
    icon: 'FaTools',
    submodules: [
      { key: 'reports', label: 'QA/QC Reports' },
      { key: 'ncrs', label: 'NCRs', submodules: [
        { key: 'add', label: 'Add NCR' },
        { key: 'summary', label: 'Summary' },
        { key: 'filters', label: 'Filters', submodules: [
          { key: 'advanced', label: 'Advanced Filters' },
        ] },
        { key: 'export', label: 'Export' },
        { key: 'notifications', label: 'Notifications' },
        { key: 'approval', label: 'Approval Workflow' },
      ] },
      { key: 'checklists', label: 'Inspection Checklists' },
      { key: 'submittals', label: 'Submittals' },
      { key: 'approvals', label: 'Approvals' },
    ],
  },
  {
    key: 'hse',
    label: 'HSE',
    icon: 'FaFireExtinguisher',
    submodules: [
      { key: 'reports', label: 'HSE Reports' },
      { key: 'incidents', label: 'Incident Logs' },
      { key: 'observations', label: 'Safety Observations' },
      { key: 'toolbox-talks', label: 'Toolbox Talks' },
      { key: 'osha-logs', label: 'OSHA Logs' },
      { key: 'training', label: 'Training & Certifications' },
    ],
  },
  {
    key: 'submittals',
    label: 'Submittals',
    icon: 'FaUpload',
    submodules: [
      { key: 'dashboard', label: 'Submittal Dashboard' },
      { key: 'log', label: 'Submittal Log' },
      { key: 'review', label: 'Review & Approvals' },
      { key: 'attachments', label: 'Attachments' },
      { key: 'export', label: 'Export' },
    ],
  },
  {
    key: 'document-control',
    label: 'Document Control',
    icon: 'FaFolderOpen',
    submodules: [
      { key: 'library', label: 'Document Library' },
      { key: 'revisions', label: 'Revision Tracking' },
      { key: 'uploads', label: 'Uploads' },
      { key: 'versioning', label: 'Versioning' },
    ],
  },
  {
    key: 'finance',
    label: 'Finance',
    icon: 'FaMoneyBillWave',
    submodules: [
      { key: 'boq', label: 'BOQ / Quantity Survey' },
      { key: 'cost-logs', label: 'Cost Logs' },
      { key: 'payments', label: 'Payment Tracking' },
    ],
  },
  {
    key: 'schedule',
    label: 'Schedule',
    icon: 'FaCalendarAlt',
    submodules: [
      { key: 'gantt', label: 'Gantt View' },
      { key: 'milestones', label: 'Milestones' },
      { key: 'progress', label: 'Progress Logs' },
    ],
  },
  {
    key: 'assets',
    label: 'Asset Register',
    icon: 'FaCogs',
    submodules: [
      { key: 'equipment', label: 'Equipment Logs' },
      { key: 'maintenance', label: 'Maintenance' },
    ],
  },
  {
    key: 'notifications',
    label: 'Notifications',
    icon: 'FaBell',
    submodules: [
      { key: 'system', label: 'System Notifications' },
      { key: 'user', label: 'User Notifications' },
    ],
  },
  {
    key: 'reporting',
    label: 'Reporting & Exports',
    icon: 'FaChartBar',
    submodules: [
      { key: 'pdf', label: 'Export PDF' },
      { key: 'excel', label: 'Export Excel' },
      { key: 'custom', label: 'Custom Reports' },
    ],
  },
];
