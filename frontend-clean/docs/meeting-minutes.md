# Meeting Minutes Module

## Overview
The Meeting Minutes module allows users to view, add, and manage meeting records. It enforces role-based access control (RBAC) and robust error handling for all user actions.

## Features
- **View Meeting Minutes:** All users can view the list and details of meeting minutes.
- **Add Meeting Minutes:** Only users with the `admin` or `pm` role can add new meeting minutes.
- **Export:** Export minutes to PDF/Excel with error handling.
- **RBAC Enforcement:**
  - `admin`, `pm`: Can add and manage minutes.
  - Others: Can only view minutes; cannot add.
- **Error Handling:** All actions (add, export, save) display user-friendly error messages on failure or permission denial.

## Usage
- Navigate to the Meeting Minutes section from the dashboard.
- Use the tabs/buttons to switch between the minutes list and the add minutes form.
- Only authorized roles will see the "+ Add Minutes" button and form.
- Errors (e.g., failed save/export, permission denied) are shown in red above the main content.

## Implementation Notes
- Uses `useAuth` context to determine the current user's role.
- RBAC checks are enforced in the UI; backend should also enforce RBAC for real data.
- Error handling is implemented for all user actions.

## File Locations
- `src/components/MeetingMinutes.jsx` (main entry)
- `src/components/MeetingMinutes/MinutesForm.jsx`
- `src/components/MeetingMinutes/MinutesList.jsx`
- `src/components/MeetingMinutes/MinutesView.jsx`

## Example Roles
- `admin`: Full access
- `pm`: Add/view
- Others: View only

## See Also
- [HSE Reports Documentation](./hse-reports.md)
- [Material Logs Documentation](./material-logs.md)
