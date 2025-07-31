# Schedule Module

This module manages the project schedule. It allows authorized users to add, view, and inspect scheduled activities.

## Features
- View a list of scheduled activities
- Add new activities (role-restricted)
- View details of an activity
- Role-based access control (RBAC) for add actions
- Error handling and user feedback

## RBAC
- Only users with roles **Planning**, **System Admin**, or **Super Admin** can add new activities.
- Unauthorized users will see the add button disabled and receive a message if they attempt to add.

## Error Handling
- All actions are wrapped in try/catch blocks where applicable.
- User-friendly error messages are displayed for failed or unauthorized actions.

## Future Improvements
- Integrate with backend or Firestore for real data persistence.
- Add edit/delete functionality for activities.
- Add tests for RBAC and error handling.

---
*Location: `frontend-clean/src/components/Schedule/`*
