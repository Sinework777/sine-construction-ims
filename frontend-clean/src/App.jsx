import RoleBasedRoute from './components/RoleBasedRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React, { Suspense, lazy } from 'react';
import SysAdminDashboard from './pages/sys-admin/SysAdminDashboard';
import SysAdminDashboardV2 from './pages/sys-admin/SysAdminDashboardV2';
import ConIMSModule from './components/admin/widgets/ConIMSModule';
import DashboardRedirectWrapper from './components/DashboardRedirectWrapper';
const Home = lazy(() => import('./pages/pm/Home'));
const Login = lazy(() => import('./components/Login'));
const Signup = lazy(() => import('./pages/SignUp'));
const ForgotPassword = lazy(() => import('./components/ForgotPassword'));
const ResetPassword = lazy(() => import('./components/ResetPassword'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const SystemAdminDashboard = lazy(() => import('./pages/admin/SystemAdminDashboard'));
const ModuleMarketplace = lazy(() => import('./pages/ModuleMarketplace'));
const DashboardPM = lazy(() => import('./pages/pm/DashboardPM'));
const DashboardQAQC = lazy(() => import('./pages/DashboardQAQC'));
const DashboardHSE = lazy(() => import('./pages/DashboardHSE'));
const NotFound = lazy(() => import('./components/NotFound'));
// IMS Modules (Super Admin)
const DailyReportsModule = lazy(() => import('./pages/dailyReports'));
const QAQCModule = lazy(() => import('./pages/qaqc'));
const HSEModule = lazy(() => import('./pages/hse'));
const BOQModule = lazy(() => import('./pages/boq'));
const MaterialsModule = lazy(() => import('./pages/materials'));
const MeetingMinutesModule = lazy(() => import('./pages/meeting-minutes'));
const DocumentControlModule = lazy(() => import('./pages/document-control'));
const FinanceModule = lazy(() => import('./pages/finance'));
const AuditLogsModule = lazy(() => import('./pages/audit-logs'));
const FeatureFlagsModule = lazy(() => import('./pages/feature-flags'));
const LicensesModule = lazy(() => import('./pages/licenses'));
const BackupsModule = lazy(() => import('./pages/backups'));
const Support = lazy(() => import('./components/Support'));
const AdminSupport = lazy(() => import('./components/admin/Support/Support'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./components/TermsOfService'));
const LandingPage = lazy(() => import('./LandingPage'));
import PrivateRoute from './components/PrivateRoute';
import ProtectedRoutes from './routes/ProtectedRoutes';
import { AuthProvider } from './context/AuthContext.jsx';
// IMS Daily Reports submodules
const DailyReportCreate = lazy(() => import('./pages/dailyReports/create'));
const DailyReportReview = lazy(() => import('./pages/dailyReports/review'));
const DailyReportExport = lazy(() => import('./pages/dailyReports/export'));
// IMS QAQC submodules
const QAQCNCRs = lazy(() => import('./pages/qaqc/ncrs'));
const QAQCChecklists = lazy(() => import('./pages/qaqc/checklists'));
const QAQCDeficiencyLog = lazy(() => import('./pages/qaqc/deficiency-log'));
// IMS HSE submodules
const HSEDailyReports = lazy(() => import('./pages/hse/daily-reports'));
const HSEIncidentReports = lazy(() => import('./pages/hse/incident-reports'));
const HSEToolboxTalks = lazy(() => import('./pages/hse/toolbox-talks'));
const HSESafetyChecklists = lazy(() => import('./pages/hse/safety-checklists'));
// IMS BOQ submodules
const BOQList = lazy(() => import('./pages/boq/list'));
const BOQImport = lazy(() => import('./pages/boq/import'));
// IMS Materials submodules
const MaterialEntry = lazy(() => import('./pages/materials/entry'));
const MaterialExport = lazy(() => import('./pages/materials/export'));
// IMS Meeting Minutes submodules
const MeetingMinutesCreate = lazy(() => import('./pages/meeting-minutes/create'));
const MeetingMinutesReview = lazy(() => import('./pages/meeting-minutes/review'));
// IMS Document Control submodules
const DocumentRegister = lazy(() => import('./pages/document-control/register'));
const DocumentTransmittals = lazy(() => import('./pages/document-control/transmittals'));
// IMS Finance submodules
const FinanceInvoices = lazy(() => import('./pages/finance/invoices'));
const FinancePayments = lazy(() => import('./pages/finance/payments'));
// IMS Audit Logs submodules
const AuditSystemLogs = lazy(() => import('./pages/audit-logs/system'));
const AuditUserLogs = lazy(() => import('./pages/audit-logs/user'));
// IMS Feature Flags submodules
const FeatureFlagsManage = lazy(() => import('./pages/feature-flags/manage'));
// IMS Licenses submodules
const LicensesList = lazy(() => import('./pages/licenses/list'));
const LicensesAdd = lazy(() => import('./pages/licenses/add'));
// IMS Backups submodules
const BackupsNow = lazy(() => import('./pages/backups/now'));
const BackupsHistory = lazy(() => import('./pages/backups/history'));
// Admin submodules
const APIKeys = lazy(() => import('./components/admin/APIKeys/APIKeys'));
const FeatureFlags = lazy(() => import('./components/admin/FeatureFlags/FeatureFlags'));
const ScheduledTasks = lazy(() => import('./components/admin/ScheduledTasks/ScheduledTasks'));
const Licenses = lazy(() => import('./components/admin/Licenses/Licenses'));
const DataBackup = lazy(() => import('./components/admin/DataBackup/DataBackup'));
const Monitoring = lazy(() => import('./components/admin/Monitoring/Monitoring'));
const ModuleAccessControl = lazy(() => import('./components/admin/ModuleAccessControl/ModuleAccessControl'));
const FeatureMarketplace = lazy(() => import('./components/admin/FeatureMarketplace/FeatureMarketplace'));
const TestUserCreation = lazy(() => import('./pages/TestUserCreation'));
const AdminLogs = lazy(() => import('./pages/admin/Logs'));

// ...existing code...

function AppRoutes() {
  // ...existing code...
  // Remove redirect logic from here. It should be handled after login, not after landing on /dashboard.
  return (
    <Suspense fallback={<div className="w-full h-screen flex items-center justify-center text-2xl font-bold">Loading...</div>}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/support" element={<Support />} />
        {/* Test User Creation page for Firestore workflow testing */}
        <Route path="/test-user" element={<TestUserCreation />} />

        {/* Dedicated Super Admin Dashboard route, always email checked in context */}
        <Route path="/sys-admin-dashboard" element={<SysAdminDashboardV2 />} />
        <Route path="/sys-admin-dashboard/conims" element={<ConIMSModule />} />

        {/* Con IMS Modules - direct links for each module and submodule */}
        <Route path="/dailyReports" element={<DailyReportsModule />} />
        <Route path="/qaqc" element={<QAQCModule />} />
        <Route path="/hse" element={<HSEModule />} />
        <Route path="/boq" element={<BOQModule />} />
        <Route path="/materials" element={<MaterialsModule />} />
        <Route path="/meeting-minutes" element={<MeetingMinutesModule />} />
        <Route path="/document-control" element={<DocumentControlModule />} />
        <Route path="/finance" element={<FinanceModule />} />
        <Route path="/audit-logs" element={<AuditLogsModule />} />
        <Route path="/feature-flags" element={<FeatureFlagsModule />} />
        <Route path="/licenses" element={<LicensesModule />} />
        <Route path="/backups" element={<BackupsModule />} />

        {/* IMS Submodule routes */}
        <Route path="/dailyReports/create" element={<DailyReportCreate />} />
        <Route path="/dailyReports/review" element={<DailyReportReview />} />
        <Route path="/dailyReports/export" element={<DailyReportExport />} />
        <Route path="/qaqc/ncrs" element={<QAQCNCRs />} />
        <Route path="/qaqc/checklists" element={<QAQCChecklists />} />
        <Route path="/qaqc/deficiency-log" element={<QAQCDeficiencyLog />} />
        <Route path="/hse/daily-reports" element={<HSEDailyReports />} />
        <Route path="/hse/incident-reports" element={<HSEIncidentReports />} />
        <Route path="/hse/toolbox-talks" element={<HSEToolboxTalks />} />
        <Route path="/hse/safety-checklists" element={<HSESafetyChecklists />} />
        <Route path="/boq/list" element={<BOQList />} />
        <Route path="/boq/import" element={<BOQImport />} />
        <Route path="/materials/entry" element={<MaterialEntry />} />
        <Route path="/materials/export" element={<MaterialExport />} />
        <Route path="/meeting-minutes/create" element={<MeetingMinutesCreate />} />
        <Route path="/meeting-minutes/review" element={<MeetingMinutesReview />} />
        <Route path="/document-control/register" element={<DocumentRegister />} />
        <Route path="/document-control/transmittals" element={<DocumentTransmittals />} />
        <Route path="/finance/invoices" element={<FinanceInvoices />} />
        <Route path="/finance/payments" element={<FinancePayments />} />
        <Route path="/audit-logs/system" element={<AuditSystemLogs />} />
        <Route path="/audit-logs/user" element={<AuditUserLogs />} />
        <Route path="/feature-flags/manage" element={<FeatureFlagsManage />} />
        <Route path="/licenses/list" element={<LicensesList />} />
        <Route path="/licenses/add" element={<LicensesAdd />} />
        <Route path="/backups/now" element={<BackupsNow />} />
        <Route path="/backups/history" element={<BackupsHistory />} />

        {/* System Admin dashboard route (System Admin only) - use new dashboard */}
        <Route path="/admin/system/*" element={<SysAdminDashboard />} />
        {/* Protected dashboard route */}
        <Route path="/dashboard" element={<DashboardRedirectWrapper />} />
        {/* Admin dashboard route (SuperAdmin only) */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoutes requiredRole="SuperAdmin">
            <AdminDashboard />
          </ProtectedRoutes>
        } />
        {/* System Admin dashboard route (System Admin only) */}
        <Route path="/admin/system/*" element={
          <ProtectedRoutes requiredRole="System Admin">
            <SystemAdminDashboard />
          </ProtectedRoutes>
        } />
        {/* Feature Marketplace (System Admin only) */}
        <Route path="/admin/marketplace" element={
          <ProtectedRoutes requiredRole="System Admin">
            <FeatureMarketplace />
          </ProtectedRoutes>
        } />
        {/* Individual admin modules */}
        <Route path="/dashboard/admin/api-keys" element={<ProtectedRoutes requiredRole="System Admin"><APIKeys /></ProtectedRoutes>} />
        <Route path="/dashboard/admin/feature-flags" element={<ProtectedRoutes requiredRole="System Admin"><FeatureFlags /></ProtectedRoutes>} />
        <Route path="/dashboard/admin/scheduled-tasks" element={<ProtectedRoutes requiredRole="System Admin"><ScheduledTasks /></ProtectedRoutes>} />
        <Route path="/dashboard/admin/licenses" element={<ProtectedRoutes requiredRole="System Admin"><Licenses /></ProtectedRoutes>} />
        <Route path="/dashboard/admin/data-backup" element={<ProtectedRoutes requiredRole="System Admin"><DataBackup /></ProtectedRoutes>} />
        <Route path="/dashboard/admin/monitoring" element={<ProtectedRoutes requiredRole="System Admin"><Monitoring /></ProtectedRoutes>} />
        <Route path="/dashboard/admin/support" element={<ProtectedRoutes requiredRole="System Admin"><AdminSupport /></ProtectedRoutes>} />
        <Route path="/dashboard/admin/access-control" element={<ProtectedRoutes requiredRole="System Admin"><ModuleAccessControl /></ProtectedRoutes>} />
        {/* User Management Audit Log (SuperAdmin only) */}
        <Route path="/admin/logs" element={<ProtectedRoutes requiredRole="SuperAdmin"><AdminLogs /></ProtectedRoutes>} />
        <Route path="/pm" element={
          <RoleBasedRoute requiredRole="pm">
            <DashboardPM />
          </RoleBasedRoute>
        } />
        {/* Removed /dashboard/pm route to avoid duplication. */}
        <Route path="/dashboard" element={<DashboardRedirectWrapper />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}


function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

// Do not export AppRoutes. Only export default App to guarantee context.

export default App;
