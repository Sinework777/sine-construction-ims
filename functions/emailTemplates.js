// emailTemplates.js
exports.templates = {
  user_approved: ({ name }) => ({
    subject: 'Your Construction IMS Account is Approved',
    html: `<p>Hi ${name},</p><p>Your account has been approved. You can now log in and start using the platform.</p>`
  }),
  user_denied: ({ name, reason }) => ({
    subject: 'Your Construction IMS Account Request was Denied',
    html: `<p>Hi ${name},</p><p>Your account request was denied. Reason: ${reason}</p>`
  }),
  user_escalated: ({ name, email }) => ({
    subject: 'User Escalation: System Admin Review Needed',
    html: `<p>System Admin,</p><p>User ${name} (${email}) has been escalated for your review.</p>`
  }),
  user_pending: ({ name }) => ({
    subject: 'Your Construction IMS Account is Pending Approval',
    html: `<p>Hi ${name},</p><p>Your account is pending admin approval. You will be notified when a decision is made.</p>`
  })
};
