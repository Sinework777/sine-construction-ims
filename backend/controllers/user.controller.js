// User Controller for automatic approval, role, and project assignment (Firestore)
const admin = require('firebase-admin');

// Initialize Firestore if not already initialized
if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.firestore();

/**
 * Automatically approve user, assign default role and project on registration
 * @param {string} userId - The UID of the new user
 * @param {string} tenantId - The tenant ID (if multi-tenant)
 */
async function autoApproveAndAssign(userId, tenantId = 'defaultTenant') {
  // Set RBAC doc for user
  const rbacRef = db.collection('tenants').doc(tenantId).collection('rbac').doc(userId);
  await rbacRef.set({
    userId,
    tenantId,
    roles: ['Demo'],
    projectIds: ['Demo'],
    modulePermissions: {},
    featureToggles: {},
    approvalScopes: {},
    lastUpdated: Date.now(),
    status: 'approved',
  }, { merge: true });
  // Optionally, update user profile or send notification here
}

module.exports = { autoApproveAndAssign };
