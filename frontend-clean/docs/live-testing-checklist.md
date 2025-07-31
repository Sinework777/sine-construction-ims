# Live Testing & Documentation

## Roles to Test
- Super Admin
- System Admin
- Project Manager (PM)
- QA/QC
- HSE
- Client
- Owner
- Support

## Testing Checklist
- [ ] Login as each role and verify dashboard/modules visibility
- [ ] Test RBAC enforcement for all modules (view, edit, manage)
- [ ] Test approval workflows (request, approve, reject)
- [ ] Test audit log entries for all permission changes
- [ ] Test 2FA and notifications (where implemented)
- [ ] Test mobile UI for all admin features
- [ ] Test USACE compliance features (record-keeping, exports)

## How to Test
1. Import sample RBAC data from `docs/firestore-sample-rbac-data.json` into Firestore.
2. Use Firebase Auth to create test users for each role (matching sample data).
3. Login as each user and walk through all admin and module UIs.
4. Use the admin UI to assign/revoke roles and permissions, and verify changes in real time.
5. Submit approval requests and process them through the workflow.
6. Review audit logs for all actions.
7. Document any issues or missing features for future sprints.

## Extensibility Notes
- All admin UI components are modular and ready for API integration.
- Backend endpoints are scaffolded for secure, scalable RBAC and module management.
- Advanced features (2FA, notifications, compliance) are tracked in `docs/advanced-features-todo.md`.
- Code is commented for clarity and future extensibility.
