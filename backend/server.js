// Main server entrypoint
const admin = require('firebase-admin');
if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.firestore();

// Start auto-approve service
const { startAutoApproveService } = require('./autoApproveService');
startAutoApproveService(db);

// ...existing server setup (Express, routes, etc.)
