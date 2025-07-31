
import { db } from '../firebase/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const featureFlagsCol = collection(db, 'featureFlags');

export const getFeatureFlags = async () => {
  const snapshot = await getDocs(featureFlagsCol);
  return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
};

export const addFeatureFlag = async (data) => {
  const docRef = await addDoc(featureFlagsCol, data);
  return { id: docRef.id, ...data };
};

export const updateFeatureFlag = async (id, data) => {
  await updateDoc(doc(featureFlagsCol, id), data);
  return { id, ...data };
};

export const deleteFeatureFlag = async (id) => {
  await deleteDoc(doc(featureFlagsCol, id));
  return { id };
};
