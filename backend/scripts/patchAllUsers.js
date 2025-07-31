// Patch all users in Firestore to have role 'Super Admin' and status 'pending_sysadmin'
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function patchAllUsers() {
  const usersRef = db.collection('users');
  const snapshot = await usersRef.get();
  if (snapshot.empty) {
    console.log('No users found.');
    return;
  }
  const batch = db.batch();
  snapshot.forEach(doc => {
    batch.update(doc.ref, {
      role: 'Super Admin',
      status: 'pending_sysadmin',
    });
  });
  await batch.commit();
  console.log('All users patched to Super Admin and pending_sysadmin.');
}

patchAllUsers().catch(console.error);
