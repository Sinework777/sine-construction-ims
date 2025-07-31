// This script listens for new user signups and auto-approves them with Demo role/project
const admin = require('firebase-admin');
const { autoApproveAndAssign } = require('./controllers/user.controller');

if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.firestore();

// Firestore trigger simulation: listen for new users in 'users' collection
async function listenForNewUsers() {
  const usersRef = db.collection('users');
  let lastSnapshot = null;

  setInterval(async () => {
    const snapshot = await usersRef.get();
    snapshot.forEach(async doc => {
      const user = doc.data();
      if (!user.autoApproved) {
        await autoApproveAndAssign(doc.id, user.tenantId || 'defaultTenant');
        await usersRef.doc(doc.id).update({ autoApproved: true });
        console.log(`Auto-approved user: ${doc.id}`);
      }
    });
    lastSnapshot = snapshot;
  }, 5000); // Poll every 5 seconds
}

listenForNewUsers();
