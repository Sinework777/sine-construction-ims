// src/firebase/initSuperAdmin.js
import { ensureSuperAdmin } from './firebase';

export default async function initSuperAdmin() {
  await ensureSuperAdmin();
}
