
import { db } from '../config/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const licensesCol = collection(db, 'licenses');

export const getLicenses = async () => {
  const snapshot = await getDocs(licensesCol);
  return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
};

export const addLicense = async (data) => {
  const docRef = await addDoc(licensesCol, data);
  return { id: docRef.id, ...data };
};

export const updateLicense = async (id, data) => {
  await updateDoc(doc(licensesCol, id), data);
  return { id, ...data };
};

export const deleteLicense = async (id) => {
  await deleteDoc(doc(licensesCol, id));
  return { id };
};
