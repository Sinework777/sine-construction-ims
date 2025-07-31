// userApprovalService.js
// Calls Cloud Functions for user approval workflow
import { httpsCallable } from 'firebase/functions';
import { functions } from '../config/firebase';

export async function approveUser({ userId, role, tenant, approvedBy }) {
  const fn = httpsCallable(functions, 'approveUser');
  return await fn({ userId, role, tenant, approvedBy });
}

export async function denyUser({ userId, deniedBy, reason }) {
  const fn = httpsCallable(functions, 'denyUser');
  return await fn({ userId, deniedBy, reason });
}

export async function escalateUser({ userId, escalatedBy }) {
  const fn = httpsCallable(functions, 'escalateUser');
  return await fn({ userId, escalatedBy });
}

