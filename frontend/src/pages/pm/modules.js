// List of PM dashboard modules and submodules for sidebar and routing
export const pmModules = [
  { key: 'home', label: 'Dashboard Home', icon: 'Home' },
  { key: 'daily-reports', label: 'Daily Reports', icon: 'FileText' },
  { key: 'qaqc', label: 'QA/QC', icon: 'Flask', route: '/dashboard/qaqc/ncrs' },
  { key: 'hse', label: 'HSE Reports', icon: 'AlertTriangle', submodules: ['incidents', 'observations', 'osha-logs'] },
  { key: 'submittals', label: 'Submittals', icon: 'Upload' },
  { key: 'rfis', label: 'RFIs', icon: 'HelpCircle' },
  { key: 'boq', label: 'BOQ / Quantity Survey', icon: 'ClipboardList' },
  { key: 'schedule', label: 'Schedule', icon: 'CalendarClock', submodules: ['gantt', 'milestones'] },
  { key: 'meetings', label: 'Meetings', icon: 'Users', submodules: ['minutes', 'action-items'] },
  { key: 'document-control', label: 'Document Control', icon: 'FolderOpen' },
  { key: 'material-logs', label: 'Material Logs', icon: 'PackageOpen' },
  { key: 'specifications', label: 'Specifications & Standards', icon: 'FileCheck' },
  { key: 'kpis', label: 'Project KPIs', icon: 'BarChart2' },
  { key: 'approvals', label: 'Approvals', icon: 'Lock' },
];
