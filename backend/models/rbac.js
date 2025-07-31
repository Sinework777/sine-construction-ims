// RBAC Data Model for Multi-Tenant Construction IMS
// Firestore/NoSQL-friendly structure

/**
 * User Roles: system_admin, super_admin, pm, qaqc, hse, client, consultant, owner, support, etc.
 * Permissions: CRUD, approve, assign, manage, view, export, etc.
 * Scopes: tenant, project, team, module, submodule
 */

// Example RBAC document (per user, per tenant)
{
  userId: 'uid',
  tenantId: 'tenantId',
  roles: ['pm', 'qaqc'],
  projectIds: ['project1', 'project2'],
  modulePermissions: {
    dailyReports: { read: true, create: true, update: true, approve: true },
    qaqc: { read: true, create: true, approve: false },
    hse: { read: true },
    boq: { read: true, export: true },
    // ...all modules
  },
  featureToggles: {
    procurement: true,
    integrations: false,
    mobileAccess: true,
    // ...
  },
  approvalScopes: {
    dailyReports: ['project1'],
    submittals: ['project2'],
    // ...
  },
  lastUpdated: Date.now(),
}

// Firestore: /tenants/{tenantId}/rbac/{userId}
// Or: /rbac/{tenantId}_{userId} for global lookup

module.exports = {};
