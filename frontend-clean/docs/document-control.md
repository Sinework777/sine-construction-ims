# Document Control Module

## Overview
The Document Control module allows users to view, add, and manage project documents. It enforces role-based access control (RBAC) and robust error handling for all user actions.

## Features
- **View Documents:** All users can view the list and details of documents.
- **Add Documents:** Only users with the `admin` or `pm` role can add new documents.
- **Export:** Export document records to PDF/Excel with error handling.
- **RBAC Enforcement:**
  - `admin`, `pm`: Can add and manage documents.
  - Others: Can only view documents; cannot add.
- **Error Handling:** All actions (add, export, save) display user-friendly error messages on failure or permission denial.

## Usage
- Navigate to the Document Control section from the dashboard.
- Use the tabs/buttons to switch between the document list and the add document form.
- Only authorized roles will see the "+ Add Document" button and form.
- Errors (e.g., failed save/export, permission denied) are shown in red above the main content.

## Implementation Notes
- Uses `useAuth` context to determine the current user's role.
- RBAC checks are enforced in the UI; backend should also enforce RBAC for real data.
- Error handling is implemented for all user actions.

## File Locations
- `src/components/DocumentControl.jsx` (main entry)
- `src/components/DocumentControl/DocumentForm.jsx`
- `src/components/DocumentControl/DocumentList.jsx`
- `src/components/DocumentControl/DocumentView.jsx`

## Example Roles
- `admin`: Full access
- `pm`: Add/view
- Others: View only

## See Also
- [Meeting Minutes Documentation](./meeting-minutes.md)
- [HSE Reports Documentation](./hse-reports.md)
