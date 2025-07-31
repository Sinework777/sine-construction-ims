// src/firebase/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Auto-create SuperAdmin if not present
export async function ensureSuperAdmin() {
  const adminEmail = 'admin@sineims.com';
  const adminPassword = 'Admin@1234';
  try {
    // Try to sign in, or create if not exists
    let userCredential;
    try {
      userCredential = await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        userCredential = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
        await updateProfile(userCredential.user, { displayName: 'Super Admin' });
      } else {
        throw err;
      }
    }
    const user = userCredential.user;
    // Always ensure Firestore doc exists at users/{uid}
    const userDocRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userDocRef);
    if (!userSnap.exists()) {
      await setDoc(userDocRef, {
        name: 'Super Admin',
        email: adminEmail,
        role: 'Super Admin',
        status: 'approved',
        assignedProjects: [],
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      });
      console.log('[SuperAdmin] Firestore doc created.');
    } else {
      // Patch role/status if needed
      const data = userSnap.data();
      if (data.role !== 'Super Admin' || data.status !== 'approved') {
        await setDoc(userDocRef, {
          ...data,
          role: 'Super Admin',
          status: 'approved',
        }, { merge: true });
        console.log('[SuperAdmin] Firestore doc patched for role/status.');
      } else {
        console.log('[SuperAdmin] Firestore doc already correct.');
      }
    }
  } catch (e) {
    console.error('[SuperAdmin] Failed to ensure SuperAdmin:', e);
  }
}

export { app, auth, db };
