# QAQCReports Module

This module manages Quality Assurance and Quality Control (QAQC) reporting, including Deficiency Logs, Inspection Checklists, and Non-Conformance Reports (NCRs).

## Features
- Deficiency Log: Track and update deficiencies
- Inspection Checklist: Upload and export checklists
- NCR: Add, view, and export non-conformance reports
- Role-based access control (RBAC) for all add/upload actions
- Error handling and user feedback for unauthorized or failed actions

## RBAC
- Only users with roles **QAQC**, **System Admin**, or **Super Admin** can add, upload, or edit QAQC records.
- Unauthorized users will see disabled buttons and receive a message if they attempt restricted actions.

## Error Handling
- All actions are wrapped in try/catch blocks where applicable.
- User-friendly error messages are displayed for failed or unauthorized actions.

## Future Improvements
- Integrate with backend or Firestore for real data persistence.
- Add edit/delete functionality for all QAQC records.
- Add tests for RBAC and error handling.

---
*Location: `frontend-clean/src/components/QAQCReports/`*
