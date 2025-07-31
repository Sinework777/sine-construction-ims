// Approve user: sets status, role, project, logs action, sends email
exports.approveUser = functions.https.onCall(async (data, context) => {
  const { userId, role, project } = data;
  const userRef = admin.firestore().collection('users').doc(userId);
  await userRef.update({
    status: 'approved',
    role,
    project,
    approvedAt: Date.now(),
  });
  // Write audit log
  await admin.firestore().collection('audit_logs').add({
    userId,
    action: 'approved',
    role,
    project,
    timestamp: Date.now(),
    admin: context.auth?.uid || 'system',
  });
  // Send email (if desired, reuse sendApprovalEmail)
  // await exports.sendApprovalEmail({ to: ..., type: 'approved', params: {...} }, context);
  return { success: true };
});

// Deny user: sets status, logs action, sends email
exports.denyUser = functions.https.onCall(async (data, context) => {
  const { userId } = data;
  const userRef = admin.firestore().collection('users').doc(userId);
  await userRef.update({
    status: 'denied',
    deniedAt: Date.now(),
  });
  // Write audit log
  await admin.firestore().collection('audit_logs').add({
    userId,
    action: 'denied',
    timestamp: Date.now(),
    admin: context.auth?.uid || 'system',
  });
  // Send email (if desired)
  // await exports.sendApprovalEmail({ to: ..., type: 'denied', params: {...} }, context);
  return { success: true };
});

// Assign role/project to user (can be used for updates)
exports.assignRoleProject = functions.https.onCall(async (data, context) => {
  const { userId, role, project } = data;
  const userRef = admin.firestore().collection('users').doc(userId);
  await userRef.update({
    role,
    project,
    updatedAt: Date.now(),
  });
  // Write audit log
  await admin.firestore().collection('audit_logs').add({
    userId,
    action: 'assignRoleProject',
    role,
    project,
    timestamp: Date.now(),
    admin: context.auth?.uid || 'system',
  });
  return { success: true };
});
// Cloud Function: Auto-approve user and assign Demo role/project
exports.autoApproveUser = functions.firestore.document('users/{userId}')
    .onCreate(async (snap, context) => {
        const userId = context.params.userId;
        const user = snap.data();
        const tenantId = user.tenantId || 'defaultTenant';
        // Set RBAC doc for user
        await admin.firestore().collection('tenants').doc(tenantId).collection('rbac').doc(userId).set({
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
        // Mark user as auto-approved
        await admin.firestore().collection('users').doc(userId).update({ autoApproved: true });
        return null;
    });
// Email notification logic for user approval workflow
const sgMail = require('@sendgrid/mail');
const { templates } = require('./emailTemplates');
sgMail.setApiKey(functions.config().sendgrid.key);

exports.sendApprovalEmail = functions.https.onCall(async (data, context) => {
  const { to, type, params } = data;
  if (!to || !type || !templates[type]) throw new functions.https.HttpsError('invalid-argument', 'Missing or invalid email type');
  const { subject, html } = templates[type](params || {});
  const msg = {
    to,
    from: 'noreply@sine-cons-ims.com',
    subject,
    html,
  };
  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
});
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Example: User registration Cloud Function
exports.registerUser = functions.https.onCall(async (data, context) => {
  const { email, password, role } = data;
  try {
    const userRecord = await admin.auth().createUser({ email, password });
    await admin.auth().setCustomUserClaims(userRecord.uid, { role });
    return { success: true, uid: userRecord.uid };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Example: Get users (admin only)
exports.getUsers = functions.https.onCall(async (data, context) => {
  if (!context.auth || context.auth.token.role !== 'System Admin') {
    throw new functions.https.HttpsError('permission-denied', 'Not authorized');
  }
  const list = await admin.auth().listUsers();
  return list.users.map(u => ({ email: u.email, uid: u.uid, role: u.customClaims?.role || 'user' }));
});

// Add more functions for project management, settings, etc.
