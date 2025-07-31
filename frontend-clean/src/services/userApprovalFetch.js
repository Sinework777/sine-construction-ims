// Fetches users with status 'Pending System Admin' from Firestore
import { db } from '../config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export async function fetchPendingUsers() {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('status', '==', 'Pending System Admin'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching pending users:', error);
    throw error;
  }
}
