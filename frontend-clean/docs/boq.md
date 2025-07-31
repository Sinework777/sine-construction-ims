# BOQ Module

This module manages the Bill of Quantities (BOQ) for the project. It allows authorized users to view, add, and inspect BOQ items.

## Features
- View a list of BOQ items
- Add new BOQ items (role-restricted)
- View details of a BOQ item
- Role-based access control (RBAC) for add actions
- Error handling and user feedback

## RBAC
- Only users with roles **System Admin**, **Super Admin**, or **PM** can add new BOQ items.
- Unauthorized users will see the add button disabled and receive a message if they attempt to add.

## Error Handling
- All actions are wrapped in try/catch blocks.
- User-friendly error messages are displayed for failed actions.

## Future Improvements
- Integrate with backend or Firestore for real data persistence.
- Add edit/delete functionality for BOQ items.
- Add tests for RBAC and error handling.

---
*Location: `frontend-clean/src/components/BOQ/`*
