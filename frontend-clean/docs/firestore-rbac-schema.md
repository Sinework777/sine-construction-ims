# Firestore RBAC Schema (Multi-Tenant, Per-Module, Per-Project)

## Collections

- `users`  
  - Each user document contains:  
    - `uid` (string, Firebase Auth UID)
    - `email` (string)
    - `displayName` (string)
    - `roles` (array of role IDs, e.g. ['superadmin', 'pm'])
    - `projectRoles` (map: projectId -> array of role IDs)
    - `permissions` (array of custom permissions, optional)
    - `tenantId` (string, for multi-tenant support)

- `roles`  
  - Each role document contains:  
    - `id` (string, e.g. 'superadmin', 'pm', 'qaqc')
    - `name` (string)
    - `description` (string)
    - `permissions` (array of permission IDs)
    - `default` (boolean, optional)

- `permissions`  
  - Each permission document contains:  
    - `id` (string, e.g. 'manage_automation', 'view_reports')
    - `name` (string)
    - `description` (string)
    - `module` (string, e.g. 'automation', 'dashboard')

- `projects`  
  - Each project document contains:  
    - `id` (string)
    - `name` (string)
    - `tenantId` (string)
    - `members` (array of user IDs or map of userId -> role)

- `modules`  
  - Each module document contains:  
    - `id` (string, e.g. 'automation', 'dashboard')
    - `name` (string)
    - `description` (string)
    - `featureToggles` (map: featureName -> boolean)

## Example: User Document

```json
{
  "uid": "abc123",
  "email": "admin@company.com",
  "displayName": "Admin User",
  "roles": ["superadmin"],
  "projectRoles": {
    "projectA": ["pm"],
    "projectB": ["qaqc"]
  },
  "permissions": ["manage_automation"],
  "tenantId": "tenant1"
}
```

---

## Access Matrix

- Role → Permissions (via `roles` collection)
- User → Roles (global and per-project)
- Permission → Module (for fine-grained UI control)
- Tenant isolation via `tenantId` on all docs

---

## Next Steps

- Scaffold these collections in Firestore.
- Add sample data for roles, permissions, and users.
- Enforce RBAC in backend and frontend.
