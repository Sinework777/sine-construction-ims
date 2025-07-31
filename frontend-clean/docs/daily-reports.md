# Daily Reports Module

## Overview
The Daily Reports module allows authorized users to create, view, and export daily construction site reports. It supports role-based access control (RBAC), error handling, and multiple export formats.

## Features
- Create new daily reports (admin, supervisor roles)
- View daily reports (all roles)
- Export reports to PDF and Excel
- Attach images and signatures
- RBAC enforcement: viewers cannot create or submit reports
- Error handling for all actions (export, submit, etc.)

## RBAC
- **admin, supervisor**: Full access to create, submit, and export reports
- **viewer**: Can only view reports, cannot create or submit

## Error Handling
- All actions (export, submit) display user-friendly error messages on failure

## Usage
- Access via the Daily Reports section in the dashboard
- Only authorized roles see the new report form
- Export buttons available for PDF/Excel

## Implementation Notes
- Uses `useAuth` context for role detection
- All actions wrapped in try/catch for robust error handling

---
_Last updated: July 27, 2025_
