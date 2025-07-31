import { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from './AuthContextInstance';

export const RBACContext = createContext();

export function useRBAC() {
  return useContext(RBACContext);
}

export function useRBACState() {
  const { currentUser } = useAuth() || {};
  const [rbac, setRBAC] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchRBAC() {
      if (!currentUser) {
        setRBAC(null);
        setLoading(false);
        return;
      }
      const docRef = doc(db, 'rbac', currentUser.uid);
      const snap = await getDoc(docRef);
      setRBAC(snap.exists() ? snap.data() : null);
      setLoading(false);
    }
    fetchRBAC();
  }, [currentUser]);
  return { rbac, loading };
}
