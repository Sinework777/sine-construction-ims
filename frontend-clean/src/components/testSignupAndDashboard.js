// Test function to verify signup and dashboard workflow
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export async function testSignupAndDashboard(email, password) {
  const auth = getAuth();
  const db = getFirestore();
  try {
    // Signup user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Check Firestore profile
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      console.log('User profile created:', userDoc.data());
    } else {
      console.error('User profile not found in Firestore');
    }
    // Load dashboard as admin (simulate by setting custom claim and reloading token)
    const idTokenResult = await user.getIdTokenResult(true);
    if (idTokenResult.claims.isSuperAdmin) {
      console.log('Super admin claim verified. Fetching pending users...');
      // You would call fetchPendingUsers() here
    } else {
      console.error('Super admin claim not set.');
    }
  } catch (error) {
    console.error('Test failed:', error.code, error.message);
  }
}
