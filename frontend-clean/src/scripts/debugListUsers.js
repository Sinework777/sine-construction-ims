// debugListUsers.js
// Script to list all users in Firestore and their status for debugging approval workflow
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

export async function listAllUsers() {
  const usersSnap = await getDocs(collection(db, 'users'));
  const users = usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log('All Firestore users:');
  users.forEach(u => {
    console.log(`ID: ${u.id}, Email: ${u.email}, Status: ${u.status}, Company: ${u.company}`);
  });
  return users;
}

// Usage: import { listAllUsers } from '../scripts/debugListUsers'; listAllUsers();
