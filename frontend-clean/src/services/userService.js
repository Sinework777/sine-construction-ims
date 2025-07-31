// userService.js
// Handles user creation, role assignment, invite email, and audit logging
import { db } from '../config/firebase';
import { collection, doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { logEntityAction } from './entitiesService';

/**
 * Creates a new user in Firestore, assigns roles, and optionally sends an invite email.
 * @param {Object} userData - { fullName, email, phone, company, project, roles, status, sendInvite, groups }
 * @param {string} createdBy - UID of the admin creating the user
 * @returns {Promise<string>} The new user's Firestore UID
 */
export async function createUserWithRole(userData, createdBy) {
  // Check for unique email
  const usersRef = collection(db, 'users');
  const existing = await getDoc(doc(usersRef, userData.email));
  if (existing.exists()) {
    throw new Error('A user with this email already exists.');
  }
  // Create user doc (email as doc ID for uniqueness)
  const userDoc = {
    fullName: userData.fullName,
    email: userData.email,
    phone: userData.phone || '',
    company: userData.company,
    project: userData.project || '',
    roles: userData.roles,
    status: userData.status || 'Pending System Admin',
    groups: userData.groups || [],
    createdAt: serverTimestamp(),
    createdBy,
  };
  await setDoc(doc(usersRef, userData.email), userDoc);
  // Optionally assign to company/project subcollections
  if (userData.company) {
    await setDoc(doc(db, 'companies', userData.company, 'users', userData.email), {
      roles: userData.roles,
      assignedAt: serverTimestamp(),
    });
  }
  if (userData.project) {
    await setDoc(doc(db, 'projects', userData.project, 'users', userData.email), {
      roles: userData.roles,
      assignedAt: serverTimestamp(),
    });
  }
  // Audit log
  await logEntityAction('user', userData.email, 'create', createdBy, userDoc);
  // TODO: Send invite email (integrate with backend/email service)
  return userData.email;
}
