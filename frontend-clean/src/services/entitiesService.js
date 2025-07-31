// src/services/entitiesService.js
import { db } from '../config/firebase';
import {
  collection, doc, getDocs, getDoc, addDoc, setDoc, updateDoc, deleteDoc, query, where, serverTimestamp
} from 'firebase/firestore';

// PROJECTS CRUD
export async function getProjects() {
  const q = query(collection(db, 'projects'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function createProject(data) {
  const docRef = await addDoc(collection(db, 'projects'), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateProject(id, data) {
  await updateDoc(doc(db, 'projects', id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProject(id) {
  await deleteDoc(doc(db, 'projects', id));
}

// COMPANIES CRUD
export async function getCompanies() {
  const q = query(collection(db, 'companies'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function createCompany(data) {
  const docRef = await addDoc(collection(db, 'companies'), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateCompany(id, data) {
  await updateDoc(doc(db, 'companies', id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteCompany(id) {
  await deleteDoc(doc(db, 'companies', id));
}

// ASSIGNMENT
export async function assignUserToProject(projectId, userId, role) {
  // Add user to project_users subcollection
  await setDoc(doc(db, 'projects', projectId, 'users', userId), {
    role,
    assignedAt: serverTimestamp(),
  });
}

export async function removeUserFromProject(projectId, userId) {
  await deleteDoc(doc(db, 'projects', projectId, 'users', userId));
}

export async function assignUserToCompany(companyId, userId, role) {
  await setDoc(doc(db, 'companies', companyId, 'users', userId), {
    role,
    assignedAt: serverTimestamp(),
  });
}

export async function removeUserFromCompany(companyId, userId) {
  await deleteDoc(doc(db, 'companies', companyId, 'users', userId));
}

// BULK IMPORT/EXPORT (CSV/JSON helpers can be added in UI)

// AUDIT LOGGING (simple example)
export async function logEntityAction(entityType, entityId, action, userId, details = {}) {
  await addDoc(collection(db, 'audit_logs'), {
    entityType,
    entityId,
    action,
    userId,
    details,
    timestamp: serverTimestamp(),
  });
}
