// Script to create a test user in Firestore for approval queue testing

const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const db = admin.firestore();

async function createTestUser() {
  const testUser = {
    name: 'Test User',
    email: 'testuser@example.com',
    company: 'TestCo',
    requestedRole: 'pm',
    signupDate: new Date().toISOString(),
    status: 'pending_sysadmin',
    role: 'User',
  };
  // Use a fixed UID for repeatability
  const uid = 'testuser-uid-001';
  await db.collection('users').doc(uid).set(testUser, { merge: true });
  console.log('Test user created:', testUser);
}

createTestUser().then(() => process.exit(0));
