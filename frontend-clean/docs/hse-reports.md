# HSE Reports Module

## Overview
The HSE (Health, Safety, and Environment) Reports module allows users to log, view, and manage safety observations, incidents, and toolbox talks. It enforces role-based access control (RBAC) and robust error handling for all user actions.

## Features
- **Safety Observations:** Log and view safety observations and near misses.
- **Incident Reports:** Submit detailed incident/near-miss reports (OSHA 300/301 compliant).
- **Toolbox Talks:** Log and export toolbox talk sessions.
- **Export:** Export reports to PDF/Excel with error handling.
- **RBAC Enforcement:**
  - `admin`, `inspector`, `supervisor`: Can add and manage logs.
  - `viewer`: Can only view logs; cannot add or submit.
- **Error Handling:** All actions (add, export, submit) display user-friendly error messages on failure or permission denial.

## Usage
- Navigate to the HSE Reports section from the dashboard.
- Use the tabs to switch between Observations, Toolbox Talks, and Incident/Near Miss logging.
- Only authorized roles will see the "+ Log Incident/Near Miss" button and forms.
- Errors (e.g., failed save/export, permission denied) are shown in red above the main content.

## Implementation Notes
- Uses `useAuth` context to determine the current user's role.
- RBAC checks are enforced in the UI; backend should also enforce RBAC for real data.
- Error handling is implemented for all user actions.

## File Locations
- `src/components/HSEReports.jsx` (main entry)
- `src/components/HSEReports/ObservationLog.jsx`
- `src/components/HSEReports/IncidentReportForm.jsx`
- `src/components/HSEReports/ToolboxTalkLog.jsx`

## Example Roles
- `admin`: Full access
- `inspector`: Add/view
- `supervisor`: Add/view
- `viewer`: View only

## See Also
- [Material Logs Documentation](./material-logs.md)
- [User Management Documentation](./user-management.md)
