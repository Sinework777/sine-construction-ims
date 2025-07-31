// emailService.js
// Calls the Cloud Function to send approval workflow emails
import { httpsCallable } from 'firebase/functions';
import { functions } from '../config/firebase';

export async function sendApprovalEmail({ to, type, params }) {
  const sendEmail = httpsCallable(functions, 'sendApprovalEmail');
  return await sendEmail({ to, type, params });
}
