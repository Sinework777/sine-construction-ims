// Firestore-native user role fetching
import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

/**
 * Fetches the user's role(s) from Firestore by UID.
 * @param {string} uid
 * @returns {Promise<string|null>} The user's role (e.g., 'admin', 'superadmin', 'user', etc.) or null if not found.
 */
export async function fetchUserRole(uid) {
  if (!uid) return null;
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      console.log('[fetchUserRole] Firestore role for uid', uid, ':', data.role, '| email:', data.email);
      return data.role || null;
    } else {
      console.warn(`[fetchUserRole] No user doc found for uid: ${uid}`);
    }
    return null;
  } catch (error) {
    console.error(`[fetchUserRole] Firestore error for uid: ${uid}`, error);
    throw error;
  }
}

/**
 * Checks if the user has one of the allowed roles.
 * @param {string} uid
 * @param {string[]} allowedRoles
 * @returns {Promise<boolean>}
 */
export async function hasRole(uid, allowedRoles = []) {
  const role = await fetchUserRole(uid);
  return allowedRoles.includes(role);
}
