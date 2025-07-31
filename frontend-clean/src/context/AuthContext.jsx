// src/context/AuthContext.jsx

import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContextInstance";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { fetchUserRole } from '../services/userRoleService';
import { ensurePMUser } from '../services/autoCreatePMUser';


export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    return userCredential;
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Always fetch the latest role from Firestore
      let role = await fetchUserRole(user.uid);
      let patchedRole = role;
      // Patch Firestore role for admin/superadmin
      const adminEmails = ['admin@sineims.com', 'superadmin@sineims.com'];
      // Ensure superadmin user doc exists and is patched
      if (user.email.trim().toLowerCase() === 'superadmin@sineims.com') {
        try {
          const { db } = await import('../config/firebase');
          const { doc, setDoc } = await import('firebase/firestore');
          await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            role: 'Super Admin',
            tenantId: 'master',
          }, { merge: true });
          patchedRole = 'Super Admin';
          console.warn('[Auth] Patched Firestore role for', user.email, 'to Super Admin');
        } catch (e) {
          console.error('[Auth] Failed to patch Super Admin user doc for', user.email, ':', e);
        }
      } else if (adminEmails.includes(user.email.trim().toLowerCase()) && (!role || role.trim().toLowerCase() !== 'system admin')) {
        // Patch Firestore doc to set role to 'System Admin'
        try {
          const { db } = await import('../config/firebase');
          const { doc, setDoc } = await import('firebase/firestore');
          await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            role: 'System Admin',
            tenantId: 'master',
          }, { merge: true });
          patchedRole = 'System Admin';
          console.warn('[Auth] Patched Firestore role for', user.email, 'to System Admin');
        } catch (e) {
          console.error('[Auth] Failed to patch Firestore role for', user.email, ':', e);
        }
      }
      setUserRole(patchedRole);
      console.log('[Auth] Login debug:', { uid: user.uid, email: user.email, role: patchedRole });
      // Always clear all session/local storage before any redirect
      localStorage.clear();
      sessionStorage.clear();
      // Always check for superadmin email first, regardless of role
      if (user.email.trim().toLowerCase() === 'superadmin@sineims.com') {
        console.log('[Auth] Redirecting superadmin@sineims.com to /sys-admin-dashboard');
        window.location.replace('/sys-admin-dashboard');
        return;
      } else if (patchedRole && patchedRole.trim().toLowerCase() === 'pm') {
        await ensurePMUser(user.uid, user.email, user.displayName || 'Project Manager');
        window.location.replace('/dashboard');
      } else if (patchedRole && patchedRole.trim().toLowerCase() === 'qaqc') {
        window.location.replace('/qaqc-dashboard');
      } else if (patchedRole && patchedRole.trim().toLowerCase() === 'hse') {
        window.location.replace('/hse-dashboard');
      } else if (
        (patchedRole && ['system admin','system_admin'].includes(patchedRole.trim().toLowerCase())) ||
        adminEmails.includes(user.email.trim().toLowerCase())
      ) {
        // Special redirect for admin@sineims.com
        if (user.email.trim().toLowerCase() === 'admin@sineims.com') {
          window.location.replace('/admin/system');
        } else {
          window.location.replace('/system/admin');
        }
      } else {
        // Fallback: go to generic dashboard
        window.location.replace('/dashboard');
      }
      return {
        success: true,
        user: {
          email: user.email,
          uid: user.uid,
          role: patchedRole || 'user',
        },
        message: 'Login successful',
      };
    } catch (error) {
      let message = error.message;
      if (error.code === 'auth/user-not-found') message = 'No user found with this email.';
      if (error.code === 'auth/wrong-password') message = 'Incorrect password.';
      if (error.code === 'auth/too-many-requests') message = 'Too many failed attempts. Please try again later.';
      return {
        success: false,
        user: null,
        message,
      };
    }
  };
  const loginWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());
  const logout = () => {
    // Always clear all session/local storage on logout
    localStorage.clear();
    sessionStorage.clear();
    return signOut(auth);
  };

  useEffect(() => {
    // Restore user from localStorage/sessionStorage if available
    const storedUser = JSON.parse(localStorage.getItem('ims_user') || sessionStorage.getItem('ims_user') || 'null');
    if (storedUser && !currentUser) {
      setCurrentUser(storedUser);
      setLoading(false);
    }
    onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const role = await fetchUserRole(user.uid);
        // Always set userRole for superadmin and force redirect if needed
        if (user.email && user.email.trim().toLowerCase() === 'superadmin@sineims.com') {
          setUserRole('Super Admin');
          if (window.location.pathname !== '/sys-admin-dashboard') {
            localStorage.clear();
            sessionStorage.clear();
            console.log('[Auth] Forced redirect: superadmin@sineims.com detected, redirecting to /sys-admin-dashboard');
            window.location.replace('/sys-admin-dashboard');
            return;
          }
        } else if (user.email && user.email.trim().toLowerCase() === 'admin@sineims.com') {
          setUserRole('System Admin');
        } else if (role && role.trim().toLowerCase() === 'system admin') {
          setUserRole('System Admin');
        } else {
          setUserRole(role === 'System Admin' ? 'System Admin' : role);
        }
      } else {
        setUserRole(null);
      }
      setLoading(false);
      // ...existing code...
    });
    // ...existing code...
  }, [currentUser]);

  const value = { currentUser, userRole, login, signup, logout, loginWithGoogle, loading };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


