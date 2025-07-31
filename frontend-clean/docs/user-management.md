# User Management Module

## Overview
The User Management module allows admins to approve, deny, and manage user accounts. It supports real-time updates, role assignment, and audit logging. There are two main UIs:
- **UserApproval.jsx**: Production UI with Firestore integration and robust error handling.
- **AdminUserManagement.jsx**: Fallback UI using localStorage for demo/testing.

## Features
- Approve, deny, or escalate user requests
- Assign roles and tenants
- Real-time updates (Firestore)
- Error handling and user feedback (snackbars)
- Audit log UI for all user management actions

## Usage
- Access the admin dashboard as a SuperAdmin
- Navigate to the User Approval Queue to manage pending users
- View audit logs at `/admin/logs`

## Error Handling
- All async actions are wrapped in try/catch
- Errors are shown to the user via snackbars or error messages

## Extending
- To add new roles or approval flows, update the backend endpoints and Firestore rules
- For audit log enhancements, update the `UserManagementAuditLog.jsx` component

## Testing
- Run all frontend tests with `npm test` in the `frontend-clean` directory
- Ensure backend endpoints are covered by integration tests

---
For more details, see the code comments in each component and the backend route/controller files.
