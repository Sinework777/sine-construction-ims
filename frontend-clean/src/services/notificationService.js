// notificationService.js
// Handles in-app notification creation and retrieval for user approval workflow
import { db } from '../config/firebase';
import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';

import { doc, updateDoc } from 'firebase/firestore';

export async function sendNotification({ to, type, message, link, meta }) {
  await addDoc(collection(db, 'notifications'), {
    to,
    type,
    message,
    link: link || '',
    meta: meta || {},
    read: false,
    createdAt: Timestamp.now(),
  });
}

export async function getUserNotifications(userId) {
  const q = query(collection(db, 'notifications'), where('to', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Marks a notification as read
export async function markNotificationRead(notificationId) {
  const notificationRef = doc(db, 'notifications', notificationId);
  await updateDoc(notificationRef, { read: true });
}

