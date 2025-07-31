import { db } from '../config/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const dataBackupCol = collection(db, 'dataBackup');

export const getBackups = async () => {
  const snapshot = await getDocs(dataBackupCol);
  return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
};

export const addBackup = async (data) => {
  const docRef = await addDoc(dataBackupCol, data);
  return { id: docRef.id, ...data };
};

export const updateBackup = async (id, data) => {
  await updateDoc(doc(dataBackupCol, id), data);
  return { id, ...data };
};

export const deleteBackup = async (id) => {
  await deleteDoc(doc(dataBackupCol, id));
  return { id };
};
