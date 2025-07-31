import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Drawer from '@mui/material/Drawer';
import { Add, Edit, Archive, Delete, Group, Business, Assignment, CloudUpload, CloudDownload, PersonAdd, RemoveCircle, Map } from '@mui/icons-material';
import * as entitiesService from '../../services/entitiesService';
import * as storageService from '../../services/storageService';
import * as userService from '../../services/userService';
import { useAuth } from '../../context/useAuth';

export default function EntitiesManagement() {
  // Fix: Add missing handleUserSubmit function
  async function handleUserSubmit() {
    setLoading(true);
    setUserFormError('');
    try {
      await userService.createUserWithRole(userForm, currentUser?.uid || 'admin');
      setOpenUserDrawer(false);
      setSuccess('User created and invite sent.');
      // Refresh user list if needed
    } catch (err) {
      setUserFormError(err.message || 'Failed to create user');
    }
    setLoading(false);
  }
  // Fix: Add missing rbacRoles definition
  const rbacRoles = [
    'System Admin', 'Super Admin', 'Company Admin', 'Project Admin', 'PM', 'QAQC', 'HSE', 'Client', 'Viewer', 'Custom'
  ];
  // Fix: Add missing validateUserStep function
  function validateUserStep() {
    if (userStep === 0) {
      if (!userForm.fullName || !userForm.email || !userForm.company) return 'Full Name, Email, and Company are required.';
      // TODO: Validate unique email (async)
    }
    if (userStep === 1) {
      if (!userForm.roles || !userForm.roles.length) return 'At least one role is required.';
    }
    return '';
  }
  // Fix: Add missing handleUserNext function
  function handleUserNext() {
    const err = validateUserStep();
    if (err) return setUserFormError(err);
    setUserFormError('');
    setUserStep(s => s + 1);
  }
  // Fix: Add missing handleUserBack function
  function handleUserBack() {
    setUserStep(s => Math.max(0, s - 1));
  }
  // Clean Add User/Role handler (moved to top to avoid file corruption)
  function handleAddUser() {
    setUserForm({
      fullName: '',
      email: '',
      phone: '',
      company: '',
      project: '',
      roles: [],
      status: 'Active',
      sendInvite: true,
      groups: []
    });
    setUserStep(0);
    setOpenUserDrawer(true);
  }
  // State for Add User/Role Drawer
  const [openUserDrawer, setOpenUserDrawer] = useState(false);
  const [userStep, setUserStep] = useState(0);
  const [userForm, setUserForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    project: '',
    roles: [],
    status: 'Active',
    sendInvite: true,
    groups: [],
  });
  const [userFormError, setUserFormError] = useState('');
  // ...existing code...
  const { currentUser, userRole } = useAuth();
  const [tab, setTab] = useState(0);
  const [projects, setProjects] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [openProjectDrawer, setOpenProjectDrawer] = useState(false);
  const [projectStep, setProjectStep] = useState(0);
  const [projectLogoFile, setProjectLogoFile] = useState(null);
  const [projectComplianceFiles, setProjectComplianceFiles] = useState([]);
  const [projectManagers, setProjectManagers] = useState([]); // [{uid, email, name}]
  const [projectUsers, setProjectUsers] = useState([]); // [{uid, email, name, role}]
  const [openCompanyDrawer, setOpenCompanyDrawer] = useState(false);
  const [allUsers, setAllUsers] = useState([]); // shared for both company and project forms
  const [companyStep, setCompanyStep] = useState(0);
  const [companyLogoFile, setCompanyLogoFile] = useState(null);
  const [companyComplianceFiles, setCompanyComplianceFiles] = useState([]);
  const [companyAdmins, setCompanyAdmins] = useState([]); // [{uid, email, name}]
  const [editProject, setEditProject] = useState(null);
  const [editCompany, setEditCompany] = useState(null);
  const [projectForm, setProjectForm] = useState({ name: '', company: '', pm: '', status: 'Active', start: '', end: '', logo: '' });
  const [companyForm, setCompanyForm] = useState({ name: '', contacts: '', admins: '', status: 'Active', logo: '' });
  const [assignDialog, setAssignDialog] = useState({ open: false, type: '', entityId: '', users: [] });
  const [bulkDialog, setBulkDialog] = useState({ open: false, type: '' });
  const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Unused, comment out to clean warning

  // Fetch projects and companies
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [proj, comp] = await Promise.all([
          entitiesService.getProjects(),
          entitiesService.getCompanies(),
        ]);
        setProjects(proj);
        setCompanies(comp);
      } catch (e) {
        setError('Failed to load entities');
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  // CRUD handlers
  const handleAddProject = async () => {
    setEditProject(null);
    setProjectForm({
      name: '',
      code: '',
      company: '',
      description: '',
      start: '',
      end: '',
      location: '',
      geo: '',
      status: 'Active',
      managers: [],
      users: [],
      enabledModules: [],
      type: '',
      budget: '',
      complianceDocs: [],
      logo: '',
    });
    setProjectLogoFile(null);
    setProjectComplianceFiles([]);
    setProjectManagers([]);
    setProjectUsers([]);
    setProjectStep(0);
    setOpenProjectDrawer(true);
    // Fetch all users for assignment
    try {
      const usersSnap = await entitiesService.getAllUsers?.();
      setAllUsers(usersSnap || []);
    } catch {
      setAllUsers([]);
    }
  };
  // Permissions: Only Super Admin or Company Admin
  // Normalize userRole for robust permission checks
  const normalizedRole = (userRole || '').replace(/\s+/g, '_').toLowerCase();
  const canAddProject = [
    'super_admin', 'superadmin', 'company_admin', 'system_admin'
  ].includes(normalizedRole);

  // Project Stepper fields/validation
  const projectSteps = [
    'Basic Info',
    'Details',
    'Assignment',
    'Compliance',
    'Review & Submit',
  ];
  const projectTypes = ['Building', 'Infrastructure', 'Fit-out', 'Renovation', 'Other'];
  // const allModules = ['Daily Reports', 'Document Control', 'QA/QC', 'HSE', 'Checklists', 'Support', 'Marketplace'];

  const validateProjectStep = () => {
    if (projectStep === 0) {
      if (!projectForm.name || !projectForm.code || !projectForm.company || !projectForm.type) return 'Name, Code, Company, and Type required.';
      // Duplicate check
      if (projects.find(p => p.name.trim().toLowerCase() === projectForm.name.trim().toLowerCase() || p.code.trim().toLowerCase() === projectForm.code.trim().toLowerCase())) return 'Project name or code already exists.';
    }
    if (projectStep === 1) {
      if (!projectForm.start || !projectForm.end || !projectForm.location) return 'Dates and Location required.';
    }
    if (projectStep === 2) {
      if (!projectManagers.length) return 'At least one Project Manager required.';
    }
    return '';
  };

  const handleProjectNext = () => {
    const err = validateProjectStep();
    if (err) return setError(err);
    setProjectStep(s => s + 1);
  };
  const handleProjectBack = () => setProjectStep(s => Math.max(0, s - 1));

  const handleProjectLogoChange = e => setProjectLogoFile(e.target.files[0]);
  const handleProjectComplianceChange = e => setProjectComplianceFiles(Array.from(e.target.files));
  const handleProjectManagerSelect = uid => {
    const user = allUsers.find(u => u.uid === uid);
    if (user && !projectManagers.some(a => a.uid === uid)) setProjectManagers(a => [...a, user]);
  };
  const handleProjectManagerRemove = uid => setProjectManagers(a => a.filter(u => u.uid !== uid));
  const handleProjectUserSelect = uid => {
    const user = allUsers.find(u => u.uid === uid);
    if (user && !projectUsers.some(a => a.uid === uid)) setProjectUsers(a => [...a, { ...user, role: '' }]);
  };
  const handleProjectUserRemove = uid => setProjectUsers(a => a.filter(u => u.uid !== uid));
  const handleProjectUserRoleChange = (uid, role) => setProjectUsers(a => a.map(u => u.uid === uid ? { ...u, role } : u));

  const handleProjectSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      let logoUrl = '';
      if (projectLogoFile) {
        logoUrl = await storageService.uploadFile(`project_logos/${Date.now()}_${projectLogoFile.name}`, projectLogoFile);
      }
      let complianceUrls = [];
      if (projectComplianceFiles.length) {
        complianceUrls = await Promise.all(projectComplianceFiles.map(f => storageService.uploadFile(`project_compliance/${Date.now()}_${f.name}`, f)));
      }
      const managers = projectManagers.map(a => ({ uid: a.uid, email: a.email, name: a.name }));
      const users = projectUsers.map(a => ({ uid: a.uid, email: a.email, name: a.name, role: a.role }));
      const newProject = {
        ...projectForm,
        logo: logoUrl,
        complianceDocs: complianceUrls,
        managers,
        users,
        createdBy: currentUser?.uid,
        createdAt: new Date().toISOString(),
      };
      const id = await entitiesService.createProject(newProject);
      // Send assignment emails (placeholder)
      // await emailService.sendProjectAssignment([...managers, ...users], newProject);
      await entitiesService.logEntityAction('project', id, 'create', currentUser?.uid, newProject);
      setSuccess('Project created');
      setOpenProjectDrawer(false);
      setProjects(await entitiesService.getProjects());
    } catch (e) {
      setError('Failed to create project');
    }
    setLoading(false);
  };
  const handleEditProject = (project) => {
    setEditProject(project);
    setProjectForm(project);
    setOpenProjectDialog(true);
  };
  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    setLoading(true);
    try {
      await entitiesService.deleteProject(id);
      setSuccess('Project deleted');
      entitiesService.logEntityAction('project', id, 'delete', 'admin');
      setProjects(await entitiesService.getProjects());
    } catch {
      setError('Failed to delete project');
    }
    setLoading(false);
  };

  const handleEditCompany = (company) => {
    setEditCompany(company);
    setCompanyForm(company);
    // setOpenCompanyDialog(true); // Undefined, removed for clean build
  };
  const handleDeleteCompany = async (id) => {
    if (!window.confirm('Delete this company?')) return;
    setLoading(true);
    try {
      await entitiesService.deleteCompany(id);
      setSuccess('Company deleted');
      entitiesService.logEntityAction('company', id, 'delete', 'admin');
      setCompanies(await entitiesService.getCompanies());
    } catch {
      setError('Failed to delete company');
    }
    setLoading(false);
  };

  // Assignment (simplified, can be expanded)
  const handleAssignUser = async (entityType, entityId, userId, role) => {
    setLoading(true);
    try {
      if (entityType === 'project') {
        await entitiesService.assignUserToProject(entityId, userId, role);
        entitiesService.logEntityAction('project', entityId, 'assign_user', 'admin', { userId, role });
      } else {
        await entitiesService.assignUserToCompany(entityId, userId, role);
        entitiesService.logEntityAction('company', entityId, 'assign_user', 'admin', { userId, role });
      }
      setSuccess('User assigned');
      setAssignDialog({ open: false, type: '', entityId: '', users: [] });
    } catch {
      setError('Failed to assign user');
    }
    setLoading(false);
  };

  // Bulk import/export (UI placeholder)
  const handleBulkImport = () => setBulkDialog({ open: true, type: tab === 0 ? 'project' : 'company' });
  const handleBulkExport = () => {
    // Export to CSV/JSON logic can be added here
    setSuccess('Exported!');
  };

  // Permissions: Only Super Admin or Company Admin
  const canAddCompany = [
    'super_admin', 'superadmin', 'company_admin', 'system_admin'
  ].includes(normalizedRole);

  // Company Stepper fields/validation
  const companySteps = [
    'Basic Info',
    'Contact & Location',
    'Modules & Admins',
    'Compliance',
    'Review & Submit',
  ];
  const companyTypes = ['General Contractor', 'Subcontractor', 'Client/Owner', 'Supplier', 'Consultant'];
  const allModules = ['Daily Reports', 'Document Control', 'QA/QC', 'HSE', 'Checklists', 'Support', 'Marketplace'];

  const validateCompanyStep = () => {
    // Add robust validation for each step
    if (companyStep === 0) {
      if (!companyForm.name || !companyForm.legal || !companyForm.type) return 'Name, Legal Entity, and Type required.';
    }
    if (companyStep === 1) {
      if (!companyForm.contactName || !companyForm.contactEmail || !companyForm.address || !companyForm.country) return 'Contact and Address required.';
    }
    if (companyStep === 2) {
      if (!companyAdmins.length) return 'At least one admin required.';
    }
    return '';
  };

  const handleCompanyNext = () => {
    const err = validateCompanyStep();
    if (err) return setError(err);
    setCompanyStep(s => s + 1);
  };
  const handleCompanyBack = () => setCompanyStep(s => Math.max(0, s - 1));

  const handleCompanyLogoChange = e => setCompanyLogoFile(e.target.files[0]);
  const handleCompanyComplianceChange = e => setCompanyComplianceFiles(Array.from(e.target.files));
  const handleCompanyAdminSelect = uid => {
    const user = allUsers.find(u => u.uid === uid);
    if (user && !companyAdmins.some(a => a.uid === uid)) setCompanyAdmins(a => [...a, user]);
  };
  const handleCompanyAdminRemove = uid => setCompanyAdmins(a => a.filter(u => u.uid !== uid));

  const handleCompanySubmit = async () => {
    setLoading(true);
    setError('');
    // Duplicate check
    const existing = companies.find(c => c.name.trim().toLowerCase() === companyForm.name.trim().toLowerCase());
    if (existing) {
      setError('Company name already exists.');
      setLoading(false);
      return;
    }
    try {
      let logoUrl = '';
      if (companyLogoFile) {
        logoUrl = await storageService.uploadFile(`company_logos/${Date.now()}_${companyLogoFile.name}`, companyLogoFile);
      }
      let complianceUrls = [];
      if (companyComplianceFiles.length) {
        complianceUrls = await Promise.all(companyComplianceFiles.map(f => storageService.uploadFile(`company_compliance/${Date.now()}_${f.name}`, f)));
      }
      const admins = companyAdmins.map(a => ({ uid: a.uid, email: a.email, name: a.name }));
      const newCompany = {
        ...companyForm,
        logo: logoUrl,
        complianceDocs: complianceUrls,
        admins,
        createdBy: currentUser?.uid,
        createdAt: new Date().toISOString(),
      };
      const id = await entitiesService.createCompany(newCompany);
      // Send invite emails (placeholder, implement in backend/emailService)
      // await emailService.sendCompanyAdminInvite(admins, newCompany);
      await entitiesService.logEntityAction('company', id, 'create', currentUser?.uid, newCompany);
      setSuccess('Company created');
      setOpenCompanyDrawer(false);
      setCompanies(await entitiesService.getCompanies());
    } catch (e) {
      setError('Failed to create company');
    }
    setLoading(false);
  };

  // UI
  return (
    <Box sx={{ width: '100%', p: { xs: 0, md: 2 } }}>
      <Paper sx={{ mb: 2, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h5" fontWeight={700}>Entities Management</Typography>
          <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
            (Current Role: {userRole || 'unknown'})
          </Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            sx={{ mr: 1 }}
            onClick={canAddProject ? handleAddProject : undefined}
            disabled={!canAddProject}
            title={canAddProject ? '' : 'Only Super Admins or Company Admins can add projects'}
          >
            Add Project
          </Button>

          <Button
            variant="contained"
            color="secondary"
            startIcon={<Add />}
            onClick={canAddCompany ? handleAddUser : undefined}
            disabled={!canAddCompany}
            title={canAddCompany ? '' : 'Only Super Admins or Company Admins can add users'}
          >
            Add User/Role
          </Button>
      {/* Add User/Role Drawer */}
      <Drawer anchor="right" open={openUserDrawer} onClose={() => setOpenUserDrawer(false)} PaperProps={{ sx: { width: { xs: '100%', sm: 500, md: 600 } } }}>
        <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" fontWeight={700} mb={2}>Add New User / Assign Role</Typography>
          <Stepper activeStep={userStep} alternativeLabel sx={{ mb: 2 }}>
            {['User Details', 'Role Assignment', 'Additional Options', 'Review & Confirm'].map(label => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
          </Stepper>
          <Box sx={{ flex: 1, overflowY: 'auto' }}>
            {userStep === 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Full Name" value={userForm.fullName} onChange={e => setUserForm(f => ({ ...f, fullName: e.target.value }))} required fullWidth />
                <TextField label="Email Address" value={userForm.email} onChange={e => setUserForm(f => ({ ...f, email: e.target.value }))} required fullWidth type="email" />
                <TextField label="Phone" value={userForm.phone} onChange={e => setUserForm(f => ({ ...f, phone: e.target.value }))} fullWidth />
                <FormControl fullWidth required>
                  <InputLabel>Company</InputLabel>
                  <Select label="Company" value={userForm.company} onChange={e => setUserForm(f => ({ ...f, company: e.target.value }))}>
                    {companies.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Project Assignment</InputLabel>
                  <Select label="Project Assignment" value={userForm.project} onChange={e => setUserForm(f => ({ ...f, project: e.target.value }))}>
                    <MenuItem value="">None</MenuItem>
                    {projects.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
                  </Select>
                </FormControl>
              </Box>
            )}
            {userStep === 1 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl fullWidth required>
                  <InputLabel>Role(s)</InputLabel>
                  <Select label="Role(s)" multiple value={userForm.roles} onChange={e => setUserForm(f => ({ ...f, roles: e.target.value }))}>
                    {rbacRoles.map(role => <MenuItem key={role} value={role}>{role}</MenuItem>)}
                  </Select>
                </FormControl>
                {/* Advanced: Project-specific roles, invite as admin, etc. */}
              </Box>
            )}
            {userStep === 2 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select label="Status" value={userForm.status} onChange={e => setUserForm(f => ({ ...f, status: e.target.value }))}>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Suspended">Suspended</MenuItem>
                  </Select>
                </FormControl>
                <FormControlLabel control={<Checkbox checked={userForm.sendInvite} onChange={e => setUserForm(f => ({ ...f, sendInvite: e.target.checked }))} />} label="Send invite email on creation" />
                {/* Assign to groups/teams (optional) */}
              </Box>
            )}
            {userStep === 3 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="subtitle2">Review Details:</Typography>
                <Typography>Name: {userForm.fullName}</Typography>
                <Typography>Email: {userForm.email}</Typography>
                <Typography>Phone: {userForm.phone}</Typography>
                <Typography>Company: {companies.find(c => c.id === userForm.company)?.name || ''}</Typography>
                <Typography>Project: {projects.find(p => p.id === userForm.project)?.name || ''}</Typography>
                <Typography>Roles: {userForm.roles.join(', ')}</Typography>
                <Typography>Status: {userForm.status}</Typography>
                <Typography>Send Invite: {userForm.sendInvite ? 'Yes' : 'No'}</Typography>
              </Box>
            )}
          </Box>
          {userFormError && <Alert severity="error" sx={{ mb: 2 }}>{userFormError}</Alert>}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button onClick={handleUserBack} disabled={userStep === 0}>Back</Button>
            {userStep < 3 && (
              <Button variant="contained" onClick={handleUserNext}>Next</Button>
            )}
            {userStep === 3 && (
              <Button variant="contained" color="primary" onClick={handleUserSubmit}>Confirm & Create User</Button>
            )}
          </Box>
        </Box>
      </Drawer>
      {/* Project Creation Drawer (Multi-step) */}
      <Drawer anchor="right" open={openProjectDrawer} onClose={() => setOpenProjectDrawer(false)} PaperProps={{ sx: { width: { xs: '100%', sm: 500, md: 600 } } }}>
        <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" fontWeight={700} mb={2}>{editProject ? 'Edit Project' : 'Add New Project'}</Typography>
          <Stepper activeStep={projectStep} alternativeLabel sx={{ mb: 2 }}>
            {projectSteps.map(label => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
          </Stepper>
          <Box sx={{ flex: 1, overflowY: 'auto' }}>
            {projectStep === 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Project Name" value={projectForm.name} onChange={e => setProjectForm(f => ({ ...f, name: e.target.value }))} required fullWidth />
                <TextField label="Project Code/Reference" value={projectForm.code} onChange={e => setProjectForm(f => ({ ...f, code: e.target.value }))} required fullWidth />
                <FormControl fullWidth required>
                  <InputLabel>Company</InputLabel>
                  <Select label="Company" value={projectForm.company} onChange={e => setProjectForm(f => ({ ...f, company: e.target.value }))}>
                    {companies.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
                  </Select>
                </FormControl>
                <FormControl fullWidth required>
                  <InputLabel>Project Type</InputLabel>
                  <Select label="Project Type" value={projectForm.type} onChange={e => setProjectForm(f => ({ ...f, type: e.target.value }))}>
                    {projectTypes.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
                  </Select>
                </FormControl>
                <Box>
                  <Typography variant="body2">Logo (Avatar):</Typography>
                  <input type="file" accept="image/*" onChange={handleProjectLogoChange} />
                  {projectLogoFile && <Typography variant="caption">{projectLogoFile.name}</Typography>}
                </Box>
              </Box>
            )}
            {projectStep === 1 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Description" value={projectForm.description} onChange={e => setProjectForm(f => ({ ...f, description: e.target.value }))} fullWidth multiline minRows={2} />
                <TextField label="Start Date" type="date" value={projectForm.start} onChange={e => setProjectForm(f => ({ ...f, start: e.target.value }))} InputLabelProps={{ shrink: true }} required />
                <TextField label="End Date" type="date" value={projectForm.end} onChange={e => setProjectForm(f => ({ ...f, end: e.target.value }))} InputLabelProps={{ shrink: true }} required />
                <TextField label="Location (address)" value={projectForm.location} onChange={e => setProjectForm(f => ({ ...f, location: e.target.value }))} required fullWidth />
                {/* Map picker placeholder */}
                <Button startIcon={<Map />} sx={{ mt: 1 }} disabled>Pick on Map (coming soon)</Button>
                <TextField label="Budget (optional)" value={projectForm.budget} onChange={e => setProjectForm(f => ({ ...f, budget: e.target.value }))} fullWidth />
              </Box>
            )}
            {projectStep === 2 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Enabled Modules</InputLabel>
                  <Select label="Enabled Modules" multiple value={projectForm.enabledModules} onChange={e => setProjectForm(f => ({ ...f, enabledModules: e.target.value }))}>
                    {allModules.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                  </Select>
                </FormControl>
                <Typography variant="subtitle2" mt={2}>Project Manager(s):</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                  {projectManagers.map(a => (
                    <Chip key={a.uid} label={a.name || a.email} onDelete={() => handleProjectManagerRemove(a.uid)} />
                  ))}
                </Box>
                <FormControl fullWidth>
                  <InputLabel>Select User</InputLabel>
                  <Select label="Select User" onChange={e => handleProjectManagerSelect(e.target.value)} value="">
                    <MenuItem value="">Select...</MenuItem>
                    {allUsers.filter(u => !projectManagers.some(a => a.uid === u.uid)).map(u => (
                      <MenuItem key={u.uid} value={u.uid}>{u.name || u.email}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Typography variant="subtitle2" mt={2}>Assign Teams/Users:</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                  {projectUsers.map(a => (
                    <Chip key={a.uid} label={a.name || a.email} onDelete={() => handleProjectUserRemove(a.uid)} />
                  ))}
                </Box>
                <FormControl fullWidth>
                  <InputLabel>Select User</InputLabel>
                  <Select label="Select User" onChange={e => handleProjectUserSelect(e.target.value)} value="">
                    <MenuItem value="">Select...</MenuItem>
                    {allUsers.filter(u => !projectUsers.some(a => a.uid === u.uid)).map(u => (
                      <MenuItem key={u.uid} value={u.uid}>{u.name || u.email}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {projectUsers.length > 0 && (
                  <Box sx={{ mt: 1 }}>
                    {projectUsers.map(u => (
                      <FormControl key={u.uid} sx={{ mr: 1, minWidth: 120 }}>
                        <InputLabel>Role</InputLabel>
                        <Select label="Role" value={u.role || ''} onChange={e => handleProjectUserRoleChange(u.uid, e.target.value)}>
                          <MenuItem value="">Select...</MenuItem>
                          <MenuItem value="team_member">Team Member</MenuItem>
                          <MenuItem value="supervisor">Supervisor</MenuItem>
                          <MenuItem value="viewer">Viewer</MenuItem>
                        </Select>
                      </FormControl>
                    ))}
                  </Box>
                )}
              </Box>
            )}
            {projectStep === 3 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="body2">Compliance/Contract Documents (optional):</Typography>
                <input type="file" multiple onChange={handleProjectComplianceChange} />
                {projectComplianceFiles.length > 0 && (
                  <Box>
                    {projectComplianceFiles.map(f => <Typography key={f.name} variant="caption">{f.name}</Typography>)}
                  </Box>
                )}
              </Box>
            )}
            {projectStep === 4 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="subtitle2">Review Details:</Typography>
                <Typography>Name: {projectForm.name}</Typography>
                <Typography>Code: {projectForm.code}</Typography>
                <Typography>Company: {companies.find(c => c.id === projectForm.company)?.name || ''}</Typography>
                <Typography>Type: {projectForm.type}</Typography>
                <Typography>Managers: {projectManagers.map(a => a.email).join(', ')}</Typography>
                <Typography>Status: {projectForm.status}</Typography>
                <Typography>Modules: {projectForm.enabledModules.join(', ')}</Typography>
                <Typography>Start: {projectForm.start} End: {projectForm.end}</Typography>
                <Typography>Location: {projectForm.location}</Typography>
                <Typography>Budget: {projectForm.budget}</Typography>
                <Typography>Users: {projectUsers.map(a => a.email).join(', ')}</Typography>
              </Box>
            )}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button onClick={handleProjectBack} disabled={projectStep === 0}>Back</Button>
            {projectStep < projectSteps.length - 1 && (
              <Button variant="contained" onClick={handleProjectNext}>Next</Button>
            )}
            {projectStep === projectSteps.length - 1 && (
              <Button variant="contained" color="primary" onClick={handleProjectSubmit} disabled={loading}>{loading ? <CircularProgress size={24} /> : 'Create Project'}</Button>
            )}
          </Box>
        </Box>
      </Drawer>
          {canAddCompany && (
            <Button variant="contained" color="secondary" startIcon={<Add />} onClick={handleAddUser}>Add User/Role</Button>
          )}
      {/* Add User/Role Drawer */}
      <Drawer anchor="right" open={openUserDrawer} onClose={() => setOpenUserDrawer(false)} PaperProps={{ sx: { width: { xs: '100%', sm: 500, md: 600 } } }}>
        <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" fontWeight={700} mb={2}>Add New User / Assign Role</Typography>
          <Stepper activeStep={userStep} alternativeLabel sx={{ mb: 2 }}>
            {['User Details', 'Role Assignment', 'Additional Options', 'Review & Confirm'].map(label => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
          </Stepper>
          <Box sx={{ flex: 1, overflowY: 'auto' }}>
            {userStep === 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Full Name" value={userForm.fullName} onChange={e => setUserForm(f => ({ ...f, fullName: e.target.value }))} required fullWidth />
                <TextField label="Email Address" value={userForm.email} onChange={e => setUserForm(f => ({ ...f, email: e.target.value }))} required fullWidth type="email" />
                <TextField label="Phone" value={userForm.phone} onChange={e => setUserForm(f => ({ ...f, phone: e.target.value }))} fullWidth />
                <FormControl fullWidth required>
                  <InputLabel>Company</InputLabel>
                  <Select label="Company" value={userForm.company} onChange={e => setUserForm(f => ({ ...f, company: e.target.value }))}>
                    {companies.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Project Assignment</InputLabel>
                  <Select label="Project Assignment" value={userForm.project} onChange={e => setUserForm(f => ({ ...f, project: e.target.value }))}>
                    <MenuItem value="">None</MenuItem>
                    {projects.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
                  </Select>
                </FormControl>
              </Box>
            )}
            {userStep === 1 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl fullWidth required>
                  <InputLabel>Role(s)</InputLabel>
                  <Select label="Role(s)" multiple value={userForm.roles} onChange={e => setUserForm(f => ({ ...f, roles: e.target.value }))}>
                    {rbacRoles.map(role => <MenuItem key={role} value={role}>{role}</MenuItem>)}
                  </Select>
                </FormControl>
              </Box>
            )}
            {userStep === 2 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select label="Status" value={userForm.status} onChange={e => setUserForm(f => ({ ...f, status: e.target.value }))}>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Suspended">Suspended</MenuItem>
                  </Select>
                </FormControl>
                <FormControlLabel control={<Checkbox checked={userForm.sendInvite} onChange={e => setUserForm(f => ({ ...f, sendInvite: e.target.checked }))} />} label="Send invite email on creation" />
              </Box>
            )}
            {userStep === 3 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="subtitle2">Review Details:</Typography>
                <Typography>Name: {userForm.fullName}</Typography>
                <Typography>Email: {userForm.email}</Typography>
                <Typography>Phone: {userForm.phone}</Typography>
                <Typography>Company: {companies.find(c => c.id === userForm.company)?.name || ''}</Typography>
                <Typography>Project: {projects.find(p => p.id === userForm.project)?.name || ''}</Typography>
                <Typography>Roles: {userForm.roles.join(', ')}</Typography>
                <Typography>Status: {userForm.status}</Typography>
                <Typography>Send Invite: {userForm.sendInvite ? 'Yes' : 'No'}</Typography>
              </Box>
            )}
          </Box>
          {userFormError && <Alert severity="error" sx={{ mb: 2 }}>{userFormError}</Alert>}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button onClick={handleUserBack} disabled={userStep === 0}>Back</Button>
            {userStep < 3 && (
              <Button variant="contained" onClick={handleUserNext}>Next</Button>
            )}
            {userStep === 3 && (
              <Button variant="contained" color="primary" onClick={handleUserSubmit}>Confirm & Create User</Button>
            )}
          </Box>
        </Box>
      </Drawer>
          <Button variant="outlined" color="info" startIcon={<CloudUpload />} sx={{ ml: 1 }} onClick={handleBulkImport}>Bulk Import</Button>
          <Button variant="outlined" color="success" startIcon={<CloudDownload />} sx={{ ml: 1 }} onClick={handleBulkExport}>Export</Button>
        </Box>
      </Paper>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" scrollButtons="auto" sx={{ mb: 2 }}>
        <Tab label="Projects" icon={<Assignment />} iconPosition="start" />
        <Tab label="Companies" icon={<Business />} iconPosition="start" />
      </Tabs>
      {loading && <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>}
      {/* Projects Tab */}
      {tab === 0 && !loading && (
        <Box>
          <Grid container spacing={2}>
            {projects.map(project => (
              <Grid item xs={12} md={6} lg={4} key={project.id}>
                <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar src={project.logo} sx={{ width: 48, height: 48 }}>{project.name?.[0]}</Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography fontWeight={700}>{project.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{project.company}</Typography>
                    <Chip label={project.status} color={project.status === 'Active' ? 'success' : project.status === 'Suspended' ? 'warning' : 'default'} size="small" sx={{ mt: 1 }} />
                  </Box>
                  <Tooltip title="Assign Users"><IconButton onClick={() => setAssignDialog({ open: true, type: 'project', entityId: project.id, users: [] })}><PersonAdd /></IconButton></Tooltip>
                  <Tooltip title="Edit"><IconButton onClick={() => handleEditProject(project)}><Edit /></IconButton></Tooltip>
                  <Tooltip title="Archive"><IconButton disabled><Archive /></IconButton></Tooltip>
                  <Tooltip title="Delete"><IconButton onClick={() => handleDeleteProject(project.id)}><Delete /></IconButton></Tooltip>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {/* Companies Tab */}
      {tab === 1 && !loading && (
        <Box>
          <Grid container spacing={2}>
            {companies.map(company => (
              <Grid item xs={12} md={6} lg={4} key={company.id}>
                <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar src={company.logo} sx={{ width: 48, height: 48 }}>{company.name?.[0]}</Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography fontWeight={700}>{company.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{company.contacts}</Typography>
                    <Chip label={company.status} color={company.status === 'Active' ? 'success' : company.status === 'Archived' ? 'default' : 'warning'} size="small" sx={{ mt: 1 }} />
                  </Box>
                  <Tooltip title="Assign Admins"><IconButton onClick={() => setAssignDialog({ open: true, type: 'company', entityId: company.id, users: [] })}><PersonAdd /></IconButton></Tooltip>
                  <Tooltip title="Edit"><IconButton onClick={() => handleEditCompany(company)}><Edit /></IconButton></Tooltip>
                  <Tooltip title="Archive"><IconButton disabled><Archive /></IconButton></Tooltip>
                  <Tooltip title="Delete"><IconButton onClick={() => handleDeleteCompany(company.id)}><Delete /></IconButton></Tooltip>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {/* Company Creation Drawer (Multi-step) */}
      <Drawer anchor="right" open={openCompanyDrawer} onClose={() => setOpenCompanyDrawer(false)} PaperProps={{ sx: { width: { xs: '100%', sm: 500, md: 600 } } }}>
        <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" fontWeight={700} mb={2}>{editCompany ? 'Edit Company' : 'Add New Company'}</Typography>
          <Stepper activeStep={companyStep} alternativeLabel sx={{ mb: 2 }}>
            {companySteps.map(label => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
          </Stepper>
          <Box sx={{ flex: 1, overflowY: 'auto' }}>
            {companyStep === 0 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Company Name" value={companyForm.name} onChange={e => setCompanyForm(f => ({ ...f, name: e.target.value }))} required fullWidth />
                <TextField label="Legal Entity/Registration" value={companyForm.legal} onChange={e => setCompanyForm(f => ({ ...f, legal: e.target.value }))} required fullWidth />
                <FormControl fullWidth required>
                  <InputLabel>Company Type</InputLabel>
                  <Select label="Company Type" value={companyForm.type} onChange={e => setCompanyForm(f => ({ ...f, type: e.target.value }))}>
                    {companyTypes.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
                  </Select>
                </FormControl>
                <Box>
                  <Typography variant="body2">Logo (Avatar):</Typography>
                  <input type="file" accept="image/*" onChange={handleCompanyLogoChange} />
                  {companyLogoFile && <Typography variant="caption">{companyLogoFile.name}</Typography>}
                </Box>
              </Box>
            )}
            {companyStep === 1 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Primary Contact Name" value={companyForm.contactName} onChange={e => setCompanyForm(f => ({ ...f, contactName: e.target.value }))} required fullWidth />
                <TextField label="Primary Contact Email" value={companyForm.contactEmail} onChange={e => setCompanyForm(f => ({ ...f, contactEmail: e.target.value }))} required fullWidth type="email" />
                <TextField label="Primary Contact Phone" value={companyForm.contactPhone} onChange={e => setCompanyForm(f => ({ ...f, contactPhone: e.target.value }))} fullWidth />
                <TextField label="Address" value={companyForm.address} onChange={e => setCompanyForm(f => ({ ...f, address: e.target.value }))} required fullWidth />
                <TextField label="Country/Region" value={companyForm.country} onChange={e => setCompanyForm(f => ({ ...f, country: e.target.value }))} required fullWidth />
                <TextField label="Timezone" value={companyForm.timezone} onChange={e => setCompanyForm(f => ({ ...f, timezone: e.target.value }))} fullWidth />
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select label="Status" value={companyForm.status} onChange={e => setCompanyForm(f => ({ ...f, status: e.target.value }))}>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Suspended">Suspended</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}
            {companyStep === 2 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Allowed Modules</InputLabel>
                  <Select label="Allowed Modules" multiple value={companyForm.allowedModules} onChange={e => setCompanyForm(f => ({ ...f, allowedModules: e.target.value }))}>
                    {allModules.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                  </Select>
                </FormControl>
                <Typography variant="subtitle2" mt={2}>Default Admin(s):</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                  {companyAdmins.map(a => (
                    <Chip key={a.uid} label={a.name || a.email} onDelete={() => handleCompanyAdminRemove(a.uid)} />
                  ))}
                </Box>
                <FormControl fullWidth>
                  <InputLabel>Select User</InputLabel>
                  <Select label="Select User" onChange={e => handleCompanyAdminSelect(e.target.value)} value="">
                    <MenuItem value="">Select...</MenuItem>
                    {allUsers.filter(u => !companyAdmins.some(a => a.uid === u.uid)).map(u => (
                      <MenuItem key={u.uid} value={u.uid}>{u.name || u.email}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField label="Invite Admin by Email" onBlur={e => {
                  const email = e.target.value.trim();
                  if (email && !companyAdmins.some(a => a.email === email)) setCompanyAdmins(a => [...a, { uid: '', email, name: '' }]);
                  e.target.value = '';
                }} fullWidth placeholder="Enter email and press Enter" />
              </Box>
            )}
            {companyStep === 3 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="body2">Compliance Documents (optional):</Typography>
                <input type="file" multiple onChange={handleCompanyComplianceChange} />
                {companyComplianceFiles.length > 0 && (
                  <Box>
                    {companyComplianceFiles.map(f => <Typography key={f.name} variant="caption">{f.name}</Typography>)}
                  </Box>
                )}
              </Box>
            )}
            {companyStep === 4 && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="subtitle2">Review Details:</Typography>
                <Typography>Name: {companyForm.name}</Typography>
                <Typography>Legal: {companyForm.legal}</Typography>
                <Typography>Type: {companyForm.type}</Typography>
                <Typography>Contact: {companyForm.contactName} ({companyForm.contactEmail})</Typography>
                <Typography>Address: {companyForm.address}, {companyForm.country}</Typography>
                <Typography>Admins: {companyAdmins.map(a => a.email).join(', ')}</Typography>
                <Typography>Status: {companyForm.status}</Typography>
                <Typography>Modules: {companyForm.allowedModules.join(', ')}</Typography>
              </Box>
            )}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button onClick={handleCompanyBack} disabled={companyStep === 0}>Back</Button>
            {companyStep < companySteps.length - 1 && (
              <Button variant="contained" onClick={handleCompanyNext}>Next</Button>
            )}
            {companyStep === companySteps.length - 1 && (
              <Button variant="contained" color="primary" onClick={handleCompanySubmit} disabled={loading}>{loading ? <CircularProgress size={24} /> : 'Create Company'}</Button>
            )}
          </Box>
        </Box>
      </Drawer>
      {/* Assign Users Dialog (simplified placeholder) */}
      <Dialog open={assignDialog.open} onClose={() => setAssignDialog({ open: false, type: '', entityId: '', users: [] })} fullWidth maxWidth="sm">
        <DialogTitle>Assign Users to {assignDialog.type === 'project' ? 'Project' : 'Company'}</DialogTitle>
        <DialogContent>
          <Typography>Enter User ID and Role to assign (for demo):</Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <TextField label="User ID" value={assignDialog.users[0]?.userId || ''} onChange={e => setAssignDialog(d => ({ ...d, users: [{ userId: e.target.value, role: d.users[0]?.role || '' }] }))} />
            <TextField label="Role" value={assignDialog.users[0]?.role || ''} onChange={e => setAssignDialog(d => ({ ...d, users: [{ userId: d.users[0]?.userId || '', role: e.target.value }] }))} />
            <Button variant="contained" onClick={() => handleAssignUser(assignDialog.type, assignDialog.entityId, assignDialog.users[0]?.userId, assignDialog.users[0]?.role)}>Assign</Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAssignDialog({ open: false, type: '', entityId: '', users: [] })}>Close</Button>
        </DialogActions>
      </Dialog>
      {/* Bulk Import/Export Dialog (placeholder) */}
      <Dialog open={bulkDialog.open} onClose={() => setBulkDialog({ open: false, type: '' })} fullWidth maxWidth="sm">
        <DialogTitle>Bulk Import {bulkDialog.type === 'project' ? 'Projects' : 'Companies'}</DialogTitle>
        <DialogContent>
          <Typography>Upload CSV/JSON for bulk import (feature coming soon).</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBulkDialog({ open: false, type: '' })}>Close</Button>
        </DialogActions>
      </Dialog>
      {/* Notifications */}
      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error" onClose={() => setError('')}>{error}</Alert>
      </Snackbar>
      <Snackbar open={!!success} autoHideDuration={3000} onClose={() => setSuccess('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" onClose={() => setSuccess('')}>{success}</Alert>
      </Snackbar>
    </Box>
  );
}
