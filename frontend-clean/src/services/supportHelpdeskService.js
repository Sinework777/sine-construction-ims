
import { db } from '../firebase/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const ticketsCol = collection(db, 'supportTickets');

export const getTickets = async () => {
  const snapshot = await getDocs(ticketsCol);
  return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
};

export const addTicket = async (data) => {
  const docRef = await addDoc(ticketsCol, data);
  return { id: docRef.id, ...data };
};

export const updateTicket = async (id, data) => {
  await updateDoc(doc(ticketsCol, id), data);
  return { id, ...data };
};

export const deleteTicket = async (id) => {
  await deleteDoc(doc(ticketsCol, id));
  return { id };
};
