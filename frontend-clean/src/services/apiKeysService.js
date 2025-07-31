import { db } from '../config/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const apiKeysCol = collection(db, 'apiKeys');

export const getAPIKeys = async () => {
  const snapshot = await getDocs(apiKeysCol);
  return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
};

export const addAPIKey = async (data) => {
  const docRef = await addDoc(apiKeysCol, data);
  return { id: docRef.id, ...data };
};

export const updateAPIKey = async (id, data) => {
  await updateDoc(doc(apiKeysCol, id), data);
  return { id, ...data };
};

export const deleteAPIKey = async (id) => {
  await deleteDoc(doc(apiKeysCol, id));
  return { id };
};
