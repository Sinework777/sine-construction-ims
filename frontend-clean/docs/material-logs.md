# Material Logs Module

## Overview
The Material Logs module allows users to view, add, and manage material usage and delivery logs for the project. It is accessible from the main dashboard and is designed for role-based access.

## Features
- **View Material Logs:** All users can view the list of material logs and details for each log entry.
- **Add Material Log:** Only users with the `admin` or `supervisor` role can add new material logs.
- **Export Logs:** (If implemented) Users can export logs; errors are handled gracefully.
- **Error Handling:** All actions (add, export, etc.) display user-friendly error messages on failure.
- **RBAC Enforcement:**
  - `admin` and `supervisor`: Can add new logs, view all logs.
  - `viewer`: Can only view logs; cannot add new logs.

## Usage
- Navigate to the Material Logs section from the dashboard.
- Use the tabs/buttons to switch between the log list and the add log form.
- Only authorized roles will see the "+ Add Log" button and form.
- Errors (e.g., failed save/export) are shown in red above the main content.

## Implementation Notes
- Uses `useAuth` context to determine the current user's role.
- All RBAC checks are enforced in the UI; backend should also enforce RBAC for real data.
- Error handling is implemented for all user actions.

## File Locations
- `src/components/MaterialLogs.jsx` (main entry)
- `src/components/MaterialLogs/MaterialLogForm.jsx`
- `src/components/MaterialLogs/MaterialLogList.jsx`
- `src/components/MaterialLogs/MaterialLogView.jsx`

## Example Roles
- `admin`: Full access
- `supervisor`: Can add/view
- `viewer`: View only

## See Also
- [User Management Documentation](./user-management.md)
- [Dashboard & Reporting Documentation](./dashboard-reporting.md)
- [Daily Reports Documentation](./daily-reports.md)
