
import { db } from '../firebase/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const tasksCol = collection(db, 'scheduledTasks');

export const getTasks = async () => {
  const snapshot = await getDocs(tasksCol);
  return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
};

export const addTask = async (data) => {
  const docRef = await addDoc(tasksCol, data);
  return { id: docRef.id, ...data };
};

export const updateTask = async (id, data) => {
  await updateDoc(doc(tasksCol, id), data);
  return { id, ...data };
};

export const deleteTask = async (id) => {
  await deleteDoc(doc(tasksCol, id));
  return { id };
};
