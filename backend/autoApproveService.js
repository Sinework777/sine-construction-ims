// Auto-approve service to be integrated into main server
const { autoApproveAndAssign } = require('./controllers/user.controller');

function startAutoApproveService(db) {
  const usersRef = db.collection('users');
  setInterval(async () => {
    const snapshot = await usersRef.get();
    snapshot.forEach(async doc => {
      const user = doc.data();
      if (!user.autoApproved) {
        await autoApproveAndAssign(doc.id, user.tenantId || 'defaultTenant');
        await usersRef.doc(doc.id).update({ autoApproved: true });
        console.log(`Auto-approved user: ${doc.id}`);
      }
    });
  }, 5000); // Poll every 5 seconds
}

module.exports = { startAutoApproveService };
