// In-memory demo data
let users = [
  { id: 1, name: 'Alice Smith', email: 'alice@sine.com', role: 'Admin', status: 'Active', company: 'Sine Construction', project: 'HQ Tower' },
  { id: 2, name: 'Bob Lee', email: 'bob@sine.com', role: 'PM', status: 'Suspended', company: 'Sine Construction', project: 'Bridge Project' },
  { id: 3, name: 'Carol Jones', email: 'carol@sine.com', role: 'QA/QC', status: 'Active', company: 'Sine Construction', project: 'Mall Expansion' },
];
let companies = [
  { id: 1, name: 'Sine Construction', projects: [1, 2] },
];
let projects = [
  { id: 1, name: 'HQ Tower', companyId: 1 },
  { id: 2, name: 'Bridge Project', companyId: 1 },
  { id: 3, name: 'Mall Expansion', companyId: 1 },
];

// GET /users
router.get('/users', async (req, res) => {
  res.json(users);
});

// PATCH /users/:id/status (suspend/activate)
router.patch('/users/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const user = users.find(u => u.id == id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.status = status;
  res.json({ success: true, user });
});

// PUT /users/:id (edit user)
router.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, role, company, project } = req.body;
  const user = users.find(u => u.id == id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.name = name;
  user.email = email;
  user.role = role;
  user.company = company;
  user.project = project;
  res.json({ success: true, user });
});

// POST /users (add user)
router.post('/users', (req, res) => {
  const { name, email, role, company, project } = req.body;
  const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const user = { id, name, email, role, status: 'Active', company, project };
  users.push(user);
  res.status(201).json({ success: true, user });
});

// --- Entities Management ---
// GET /companies
router.get('/companies', (req, res) => {
  res.json(companies);
});

// POST /companies
router.post('/companies', (req, res) => {
  const { name } = req.body;
  const id = companies.length ? Math.max(...companies.map(c => c.id)) + 1 : 1;
  const company = { id, name, projects: [] };
  companies.push(company);
  res.status(201).json({ success: true, company });
});

// PUT /companies/:id
router.put('/companies/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const company = companies.find(c => c.id == id);
  if (!company) return res.status(404).json({ message: 'Company not found' });
  company.name = name;
  res.json({ success: true, company });
});

// DELETE /companies/:id
router.delete('/companies/:id', (req, res) => {
  const { id } = req.params;
  companies = companies.filter(c => c.id != id);
  res.json({ success: true });
});

// GET /projects
router.get('/projects', (req, res) => {
  res.json(projects);
});

// POST /projects
router.post('/projects', (req, res) => {
  const { name, companyId } = req.body;
  const id = projects.length ? Math.max(...projects.map(p => p.id)) + 1 : 1;
  const project = { id, name, companyId };
  projects.push(project);
  // Add to company
  const company = companies.find(c => c.id == companyId);
  if (company) company.projects.push(id);
  res.status(201).json({ success: true, project });
});

// PUT /projects/:id
router.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { name, companyId } = req.body;
  const project = projects.find(p => p.id == id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  project.name = name;
  project.companyId = companyId;
  res.json({ success: true, project });
});

// DELETE /projects/:id
router.delete('/projects/:id', (req, res) => {
  const { id } = req.params;
  projects = projects.filter(p => p.id != id);
  // Remove from company.projects
  companies.forEach(c => { c.projects = c.projects.filter(pid => pid != id); });
  res.json({ success: true });
});
const express = require('express');
const router = express.Router();

// RBAC Management
const { autoApproveAndAssign } = require('../controllers/user.controller');
// Endpoint to trigger auto-approval and assignment for a user (for testing/demo)
router.post('/users/:uid/auto-approve', async (req, res) => {
  try {
    const { tenantId } = req.body;
    await autoApproveAndAssign(req.params.uid, tenantId || 'defaultTenant');
    res.status(200).json({ success: true, message: 'User auto-approved and assigned Demo role/project.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
router.get('/roles', (req, res) => { /* get all roles */ res.send('Not implemented'); });
router.post('/roles', (req, res) => { /* create role */ res.send('Not implemented'); });
router.put('/roles/:id', (req, res) => { /* update role */ res.send('Not implemented'); });
router.delete('/roles/:id', (req, res) => { /* delete role */ res.send('Not implemented'); });

router.get('/permissions', (req, res) => { /* get all permissions */ res.send('Not implemented'); });
router.post('/permissions', (req, res) => { /* create permission */ res.send('Not implemented'); });
router.put('/permissions/:id', (req, res) => { /* update permission */ res.send('Not implemented'); });
router.delete('/permissions/:id', (req, res) => { /* delete permission */ res.send('Not implemented'); });

router.post('/users/:uid/assign-role', (req, res) => { /* assign role to user */ res.send('Not implemented'); });
router.post('/users/:uid/revoke-role', (req, res) => { /* revoke role from user */ res.send('Not implemented'); });

// Module Management
router.get('/modules', (req, res) => { /* get all modules */ res.send('Not implemented'); });
router.post('/modules', (req, res) => { /* create module */ res.send('Not implemented'); });
router.put('/modules/:id', (req, res) => { /* update module */ res.send('Not implemented'); });
router.delete('/modules/:id', (req, res) => { /* delete module */ res.send('Not implemented'); });

// Approval Workflows
let approvalRequests = [];
router.post('/approvals/request', (req, res) => {
  const { userId, email } = req.body;
  const request = {
    id: approvalRequests.length + 1,
    userId,
    email,
    status: 'pending',
    requestedAt: Date.now()
  };
  approvalRequests.push(request);
  // Simulate notifying super admin dashboard (could be a socket, event, etc.)
  // TODO: Integrate with actual dashboard notification system
  res.json({ success: true, request });
});
router.post('/approvals/:id/approve', (req, res) => { /* approve request */ res.send('Not implemented'); });
router.post('/approvals/:id/reject', (req, res) => { /* reject request */ res.send('Not implemented'); });

// Audit Logs
// KPI Update
let kpi = { signup: 0 };
router.post('/kpi/update', (req, res) => {
  const { type, value } = req.body;
  if (!type || typeof value !== 'number') return res.status(400).json({ message: 'Invalid KPI update' });
  kpi[type] = (kpi[type] || 0) + value;
  res.json({ success: true, kpi });
});
router.get('/audit-logs', (req, res) => { /* get audit logs */ res.send('Not implemented'); });

// TODO: Implement 2FA middleware for sensitive endpoints
// TODO: Add notification triggers for approvals and role changes
// TODO: Ensure all endpoints are USACE-compliant and auditable

module.exports = router;
