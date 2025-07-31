// Mock API for User Management
let users = [
  { id: '1', name: 'Alice Admin', email: 'alice@company.com', role: 'System Admin', status: 'Active' },
  { id: '2', name: 'Bob PM', email: 'bob@company.com', role: 'Project Manager', status: 'Pending' },
  { id: '3', name: 'Carol QA', email: 'carol@company.com', role: 'QA/QC', status: 'Active' },
  { id: '4', name: 'Dave HSE', email: 'dave@company.com', role: 'HSE', status: 'Inactive' },
];

export async function fetchUsers() {
  return Promise.resolve([...users]);
}
export async function createUser(user) {
  user.id = (users.length + 1).toString();
  users.push(user);
  return Promise.resolve(user);
}
export async function updateUser(user) {
  users = users.map(u => u.id === user.id ? { ...u, ...user } : u);
  return Promise.resolve(user);
}
export async function deleteUser(userId) {
  users = users.filter(u => u.id !== userId);
  return Promise.resolve();
}
export async function bulkUpdateUsers(userIds) {
  // For demo: just set status to 'Inactive' for all selected
  users = users.map(u => userIds.includes(u.id) ? { ...u, status: 'Inactive' } : u);
  return Promise.resolve();
}
