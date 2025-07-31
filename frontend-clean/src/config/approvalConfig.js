// approvalConfig.js
// Central config for approval workflow customization
export const APPROVAL_ESCALATION_TIMEOUT_HOURS = 48; // hours before auto-escalation
export const APPROVAL_STEPS = [
  { key: 'pending_tenant', label: 'Tenant Admin Review' },
  { key: 'pending_sysadmin', label: 'System Admin Review' },
  { key: 'approved', label: 'Approved' },
  { key: 'denied', label: 'Denied' },
  { key: 'escalated', label: 'Escalated' },
];
