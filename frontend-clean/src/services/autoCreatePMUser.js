// Auto-create PM user doc in Firestore if missing
import { db } from '../firebase/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Ensures a PM user doc exists in Firestore for the given UID and email.
 * If not, creates it with sensible defaults.
 * @param {string} uid
 * @param {string} email
 * @param {string} [name]
 * @returns {Promise<void>}
 */
export async function ensurePMUser(uid, email, name = 'Project Manager') {
  if (!uid || !email) return;
  const userDocRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userDocRef);
  if (!userSnap.exists()) {
    // Only create as PM if not admin/superadmin
    await setDoc(userDocRef, {
      name,
      email,
      role: 'pm',
      status: 'approved',
      assignedProjects: [],
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    });
    console.log('[ensurePMUser] PM user doc created for', uid);
  } else {
    // Do NOT overwrite any admin/superadmin role (case-insensitive)
    const data = userSnap.data();
    const role = (data.role || '').toLowerCase();
    if ((role === 'pm' || !role) && data.status !== 'approved') {
      await setDoc(userDocRef, {
        ...data,
        role: 'pm',
        status: 'approved',
      }, { merge: true });
      console.log('[ensurePMUser] PM user doc patched for role/status for', uid);
    }
    // If role is admin/superadmin/system admin, do nothing
  }
}
