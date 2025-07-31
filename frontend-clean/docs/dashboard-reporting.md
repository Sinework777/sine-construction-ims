# Dashboard & Reporting Modules

## Overview
The Dashboard and Reporting modules provide a unified interface for users to access project modules, daily reports, and analytics. Sidebar navigation is filtered by user role (RBAC), ensuring users only see modules they are permitted to access.

## Features
- Modern dashboard UI with module navigation
- RBAC-based sidebar filtering
- Daily report creation, listing, and viewing
- Error handling for report fetches and user feedback

## Usage
- Users see only modules relevant to their role
- Admins can view reports, manage users, and access system settings
- Daily reports can be created, viewed, and managed from the dashboard

## Error Handling
- DashboardAdmin: User-facing error messages for report fetch failures
- DailyReports: UI is resilient, but add error handling to new features as needed

## Extending
- To add new modules, update the `modules` array in `Dashboard.jsx` and specify `roles` as needed
- For new report types, add components and update navigation

## Testing
- Run all frontend tests with `npm test` in the `frontend-clean` directory
- Ensure new modules/components have test coverage

---
For more details, see code comments in each component and the dashboard page files.
