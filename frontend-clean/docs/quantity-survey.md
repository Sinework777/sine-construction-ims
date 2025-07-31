# Quantity Survey Module

This module manages Quantity Surveys for the project. It allows authorized users to add, view, and inspect survey records.

## Features
- View a list of quantity surveys
- Add new survey records (role-restricted)
- View details of a survey
- Role-based access control (RBAC) for add actions
- Error handling and user feedback

## RBAC
- Only users with roles **QS**, **System Admin**, or **Super Admin** can add new surveys.
- Unauthorized users will see the add button disabled and receive a message if they attempt to add.

## Error Handling
- All actions are wrapped in try/catch blocks where applicable.
- User-friendly error messages are displayed for failed or unauthorized actions.

## Future Improvements
- Integrate with backend or Firestore for real data persistence.
- Add edit/delete functionality for survey records.
- Add tests for RBAC and error handling.

---
*Location: `frontend-clean/src/components/QuantitySurvey/`*
