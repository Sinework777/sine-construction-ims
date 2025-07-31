// Mock API for System Admin Dashboard (for development/demo)

export const mockUsers = [
  { id: '1', name: 'Alice Admin', email: 'alice@company.com', role: 'System Admin', status: 'Active', lastLogin: '2025-07-22' },
  { id: '2', name: 'Bob PM', email: 'bob@company.com', role: 'Project Manager', status: 'Pending', lastLogin: '2025-07-20' },
  { id: '3', name: 'Carol QA', email: 'carol@company.com', role: 'QA/QC', status: 'Active', lastLogin: '2025-07-21' },
  { id: '4', name: 'Dave HSE', email: 'dave@company.com', role: 'HSE', status: 'Inactive', lastLogin: '2025-07-19' },
];

export const mockRoles = [
  { id: 'sysadmin', name: 'System Admin', permissions: ['*'] },
  { id: 'pm', name: 'Project Manager', permissions: ['projects:read', 'users:read', 'reports:write'] },
  { id: 'qaqc', name: 'QA/QC', permissions: ['reports:read', 'reports:write'] },
  { id: 'hse', name: 'HSE', permissions: ['hse:read', 'hse:write'] },
];

export const mockProjects = [
  { id: 'p1', name: 'Tower A', status: 'Active', users: ['1', '2'] },
  { id: 'p2', name: 'Tower B', status: 'Archived', users: ['3'] },
];

export function fetchMockUsers() {
  return Promise.resolve([...mockUsers]);
}
export function fetchMockRoles() {
  return Promise.resolve([...mockRoles]);
}
export function fetchMockProjects() {
  return Promise.resolve([...mockProjects]);
}
