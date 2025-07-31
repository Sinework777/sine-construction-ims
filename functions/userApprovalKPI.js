const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

// Cloud Function: Request approval for new user
exports.requestUserApproval = functions.https.onCall(async (data, context) => {
  const { userId, email } = data;
  if (!userId || !email) throw new functions.https.HttpsError('invalid-argument', 'Missing userId or email');
  const approvalRef = db.collection('approvals').doc(userId);
  await approvalRef.set({
    userId,
    email,
    status: 'pending',
    requestedAt: Date.now()
  }, { merge: true });
  // Optionally notify super admin (e.g., send email, update dashboard)
  return { success: true };
});

// Cloud Function: Update KPI after signup
exports.updateSignupKPI = functions.https.onCall(async (data, context) => {
  const kpiRef = db.collection('kpi').doc('signup');
  await kpiRef.set({ count: admin.firestore.FieldValue.increment(1) }, { merge: true });
  return { success: true };
});
