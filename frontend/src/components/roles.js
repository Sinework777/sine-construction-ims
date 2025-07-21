const rolesConfig = {
  Admin: ['Daily Reports', 'HSE Reports', 'QA/QC Reports', 'Schedule', 'Submittals', 'Material Logs', 'Meeting Minutes', 'Document Control', 'System Settings'],
  Superintendent: ['Daily Reports', 'HSE Reports', 'QA/QC Reports', 'Schedule'],
  'Project Manager': ['Daily Reports', 'QA/QC Reports', 'Schedule', 'Meeting Minutes', 'Submittals'],
  'Construction Manager': ['Daily Reports', 'HSE Reports', 'QA/QC Reports', 'Schedule', 'Submittals', 'Material Logs', 'Meeting Minutes'],
  'QA/QC Engineer': ['QA/QC Reports', 'Deficiencies', 'Checklists', 'NCRs'],
  'HSE Officer': ['HSE Reports', 'Incident Logs', 'Toolbox Talks'],
  'Document Controller': ['Submittals', 'Document Uploads', 'Specs'],
  'Design Engineer': ['Submittals', 'RFIs', 'Drawings', 'Specs'],
  'Cost Engineer': ['BOQ', 'Quantity Survey', 'Progress Payments'],
  'Scheduler/Planner': ['Schedule', 'Milestone Tracker', 'Delay Logs'],
  'Procurement Officer': ['Material Logs', 'Vendor Delivery Logs', 'Submittals'],
  'Client/Owner': ['Reports', 'Submittals', 'Minutes'],
  'Inspector (3rd Party)': ['QA/QC Logs', 'Submit Inspections'],
  'System Admin (IT)': ['System configurations', 'Backup', 'Logs'],
};

export default rolesConfig;
