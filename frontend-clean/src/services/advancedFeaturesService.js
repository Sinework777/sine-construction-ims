
import { db } from '../firebase/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const featuresCol = collection(db, 'advancedFeatures');

export const getFeatures = async () => {
  const snapshot = await getDocs(featuresCol);
  return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
};

export const addFeature = async (data) => {
  const docRef = await addDoc(featuresCol, data);
  return { id: docRef.id, ...data };
};

export const updateFeature = async (id, data) => {
  await updateDoc(doc(featuresCol, id), data);
  return { id, ...data };
};

export const deleteFeature = async (id) => {
  await deleteDoc(doc(featuresCol, id));
  return { id };
};
