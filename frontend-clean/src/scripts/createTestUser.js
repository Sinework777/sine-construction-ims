// createTestUser.js
// Script to create a test user in Firestore for approval workflow testing
import { db } from '../config/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export async function createTestUser({
  firstName = 'Test',
  lastName = 'User',
  email = 'test.user@example.com',
  company = 'TestCo',
  requestedRole = 'Client',
  status = 'pending_tenant',
  signupDate = Timestamp.now(),
  tenant = 'TestCo',
}) {
  const docRef = await addDoc(collection(db, 'users'), {
    firstName,
    lastName,
    email,
    company,
    requestedRole,
    status,
    signupDate,
    tenant,
  });
  return docRef.id;
}

// Usage example (in a test or dev page):
// import { createTestUser } from '../scripts/createTestUser';
// createTestUser({ email: 'your.email@domain.com' });
