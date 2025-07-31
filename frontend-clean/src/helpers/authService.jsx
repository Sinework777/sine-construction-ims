import { auth } from '../firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

export async function login({ email, password }) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Fetch custom claims (role) via ID token
    const token = await user.getIdTokenResult();
    return {
      success: true,
      token: token.token,
      role: token.claims.role || 'user',
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function logout() {
  await signOut(auth);
}

