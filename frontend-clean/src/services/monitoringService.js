import { db } from '../firebase/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const monitoringCol = collection(db, 'monitoring');

export const getMonitors = async () => {
  const snapshot = await getDocs(monitoringCol);
  return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
};

export const addMonitor = async (data) => {
  const docRef = await addDoc(monitoringCol, data);
  return { id: docRef.id, ...data };
};

export const updateMonitor = async (id, data) => {
  await updateDoc(doc(monitoringCol, id), data);
  return { id, ...data };
};

export const deleteMonitor = async (id) => {
  await deleteDoc(doc(monitoringCol, id));
  return { id };
};
