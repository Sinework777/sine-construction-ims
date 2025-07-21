import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus, FaBuilding, FaLock, FaEnvelope, FaPhone, FaGlobe, FaUserTie } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext.jsx';

const roles = [
  'Admin',
  'Project Manager',
  'QA/QC Engineer',
  'HSE Officer',
  'Document Controller',
  'Cost Engineer',
  'Procurement Engineer',
  'Scheduler / Planner',
  'Site Supervisor',
  'Design Engineer',
  'Architect',
  'Mechanical Engineer',
  'Electrical Engineer',
  'Client / Owner',
];
const industries = ['Construction', 'Design', 'QC', 'HSE', 'Owner', 'Other'];
const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'UAE', 'India', 'Other'];

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    password: '',
    confirmPassword: '',
    industry: '',
    country: '',
    agree: false,
    inviteCode: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  }

  function validate() {
    const errs = {};
    if (!form.fullName) errs.fullName = 'Full name required.';
    if (!validateEmail(form.email)) errs.email = 'Invalid email.';
    if (!form.password || form.password.length < 6) errs.password = 'Password must be at least 6 characters.';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match.';
    if (!form.company) errs.company = 'Company required.';
    if (!form.role) errs.role = 'Role required.';
    if (!form.industry) errs.industry = 'Industry required.';
    if (!form.country) errs.country = 'Country required.';
    if (!form.agree) errs.agree = 'You must agree to terms.';
    return errs;
  }

  function getRolePath(role) {
    const map = {
      'Admin': 'admin',
      'Project Manager': 'pm',
      'QA/QC Engineer': 'qaqc',
      'HSE Officer': 'hse',
      'Document Controller': 'docs',
      'Cost Engineer': 'finance',
      'Procurement Engineer': 'procurement',
      'Scheduler / Planner': 'schedule',
      'Site Supervisor': 'site',
      'Design Engineer': 'design',
      'Architect': 'architect',
      'Mechanical Engineer': 'mechanical',
      'Electrical Engineer': 'electrical',
      'Client / Owner': 'client-view',
    };
    return map[role] || role.replace(/\s+/g, '').toLowerCase();
  }

  function seedRoleCredentials() {
    const roleEmails = {
      'Admin': 'admin@consims.com',
      'Project Manager': 'pm@consims.com',
      'QA/QC Engineer': 'qaqc@consims.com',
      'HSE Officer': 'hse@consims.com',
      'Document Controller': 'docs@consims.com',
      'Cost Engineer': 'finance@consims.com',
      'Procurement Engineer': 'procurement@consims.com',
      'Scheduler / Planner': 'schedule@consims.com',
      'Site Supervisor': 'site@consims.com',
      'Design Engineer': 'design@consims.com',
      'Architect': 'architect@consims.com',
      'Mechanical Engineer': 'mechanical@consims.com',
      'Electrical Engineer': 'electrical@consims.com',
      'Client / Owner': 'client@consims.com',
    };
    Object.entries(roleEmails).forEach(([role, email]) => {
      const rolePath = getRolePath(role);
      const userObj = {
        fullName: role,
        email,
        phone: '',
        company: 'ConsIMS',
        password: 'password123',
        role,
        industry: '',
        country: '',
        agree: true,
        inviteCode: '',
      };
      localStorage.setItem(`signupData_${rolePath}`, JSON.stringify(userObj));
      localStorage.setItem(`sessionUser_${rolePath}`, JSON.stringify({
        name: role,
        email,
        role: rolePath,
        token: Math.random().toString(36).substr(2),
      }));
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setLoading(true);
      setTimeout(() => {
        // Save user with role 'pending' and status 'pending'
        const pendingUser = {
          ...form,
          role: 'pending',
          status: 'pending',
        };
        localStorage.setItem(`signupData_pending_${form.email}`, JSON.stringify(pendingUser));
        localStorage.setItem('sessionUser', JSON.stringify({
          name: form.fullName,
          email: form.email,
          role: 'pending',
          status: 'pending',
          token: Math.random().toString(36).substr(2),
        }));
        login({
          name: form.fullName,
          email: form.email,
          role: 'pending',
          status: 'pending',
          token: Math.random().toString(36).substr(2),
        });
        setLoading(false);
        // Redirect to pending approval page
        navigate('/pending-approval');
      }, 1200);
    }
  }


// Force reseeding credentials on every app load
seedRoleCredentials();
// Debug: Log all seeded credentials to console
const rolePaths = [
  'admin','pm','qaqc','hse','docs','finance','procurement','schedule','site','design','architect','mechanical','electrical','client-view'
];
rolePaths.forEach(rolePath => {
  const cred = localStorage.getItem(`signupData_${rolePath}`);
  if (cred) {
    console.log(`Seeded credential for ${rolePath}:`, JSON.parse(cred));
  } else {
    console.warn(`No credential found for ${rolePath}`);
  }
});

  return (
    <div className={darkMode ? 'min-h-screen bg-slate-900 text-white flex items-center justify-center' : 'min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-center'}>
      <div className="max-w-4xl w-full bg-white dark:bg-slate-800 rounded-2xl shadow-2xl flex overflow-hidden">
        {/* Left: Brand Banner */}
        <div className="hidden md:flex flex-col justify-between items-center bg-blue-700 text-white p-8 w-1/2 relative">
          <div className="flex flex-col items-center gap-4 mt-8">
            <FaBuilding className="text-6xl animate-pulse" />
            <h2 className="text-3xl font-extrabold tracking-tight">Cons-IMS</h2>
            <p className="text-lg font-light">Welcome to your modern construction platform</p>
          </div>
          <div className="absolute bottom-8 left-8">
            <button onClick={() => setDarkMode(m => !m)} className="bg-white/20 hover:bg-white/40 text-white px-4 py-2 rounded-full shadow transition">
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
        {/* Right: Form */}
        <form className="w-full md:w-1/2 p-8 flex flex-col gap-6 justify-center" onSubmit={handleSubmit} autoComplete="off">
          <div className="flex flex-col items-center gap-2 mb-4">
            <FaUserPlus className="text-4xl text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-bold">Create your account</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold mb-1">Full Name</label>
              <input id="fullName" name="fullName" type="text" className={`w-full rounded px-3 py-2 border focus:ring-2 ${errors.fullName ? 'border-red-500' : 'border-slate-300'} focus:ring-blue-500`} value={form.fullName} onChange={handleChange} required />
              {errors.fullName && <span className="text-xs text-red-500">{errors.fullName}</span>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-1">Email Address</label>
              <input id="email" name="email" type="email" className={`w-full rounded px-3 py-2 border focus:ring-2 ${errors.email ? 'border-red-500' : 'border-slate-300'} focus:ring-blue-500`} value={form.email} onChange={handleChange} required />
              {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold mb-1">Phone Number</label>
              <input id="phone" name="phone" type="tel" className="w-full rounded px-3 py-2 border border-slate-300 focus:ring-2 focus:ring-blue-500" value={form.phone} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-semibold mb-1">Company Name</label>
              <input id="company" name="company" type="text" className={`w-full rounded px-3 py-2 border focus:ring-2 ${errors.company ? 'border-red-500' : 'border-slate-300'} focus:ring-blue-500`} value={form.company} onChange={handleChange} required />
              {errors.company && <span className="text-xs text-red-500">{errors.company}</span>}
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-semibold mb-1">Role/Title</label>
              <select id="role" name="role" className={`w-full rounded px-3 py-2 border focus:ring-2 ${errors.role ? 'border-red-500' : 'border-slate-300'} focus:ring-blue-500`} value={form.role} onChange={handleChange} required>
                <option value="">Select Role</option>
                {roles.map(r => <option key={r}>{r}</option>)}
              </select>
              {errors.role && <span className="text-xs text-red-500">{errors.role}</span>}
            </div>
            <div>
              <label htmlFor="industry" className="block text-sm font-semibold mb-1">Industry</label>
              <select id="industry" name="industry" className={`w-full rounded px-3 py-2 border focus:ring-2 ${errors.industry ? 'border-red-500' : 'border-slate-300'} focus:ring-blue-500`} value={form.industry} onChange={handleChange} required>
                <option value="">Select Industry</option>
                {industries.map(i => <option key={i}>{i}</option>)}
              </select>
              {errors.industry && <span className="text-xs text-red-500">{errors.industry}</span>}
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-semibold mb-1">Country/Region</label>
              <select id="country" name="country" className={`w-full rounded px-3 py-2 border focus:ring-2 ${errors.country ? 'border-red-500' : 'border-slate-300'} focus:ring-blue-500`} value={form.country} onChange={handleChange} required>
                <option value="">Select Country</option>
                {countries.map(c => <option key={c}>{c}</option>)}
              </select>
              {errors.country && <span className="text-xs text-red-500">{errors.country}</span>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-1">Password</label>
              <input id="password" name="password" type="password" className={`w-full rounded px-3 py-2 border focus:ring-2 ${errors.password ? 'border-red-500' : 'border-slate-300'} focus:ring-blue-500`} value={form.password} onChange={handleChange} required />
              {errors.password && <span className="text-xs text-red-500">{errors.password}</span>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-1">Confirm Password</label>
              <input id="confirmPassword" name="confirmPassword" type="password" className={`w-full rounded px-3 py-2 border focus:ring-2 ${errors.confirmPassword ? 'border-red-500' : 'border-slate-300'} focus:ring-blue-500`} value={form.confirmPassword} onChange={handleChange} required />
              {errors.confirmPassword && <span className="text-xs text-red-500">{errors.confirmPassword}</span>}
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} className="accent-blue-600" />
              <span>I agree to the <a href="#" className="underline text-blue-600">Terms of Service</a> and <a href="#" className="underline text-blue-600">Privacy Policy</a></span>
            </label>
            {errors.agree && <span className="text-xs text-red-500">{errors.agree}</span>}
            <input type="text" name="inviteCode" placeholder="Invite Code (optional)" className="w-full rounded px-3 py-2 border border-slate-300 focus:ring-2 focus:ring-blue-500" value={form.inviteCode} onChange={handleChange} />
            {/* Captcha placeholder */}
            <div className="mt-2 text-xs text-slate-400">Captcha (coming soon)</div>
          </div>
          <button type="submit" className={`w-full py-3 rounded-full font-bold text-lg flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}>{loading ? <span className="animate-spin">⏳</span> : <FaUserPlus />} Sign Up</button>
          <div className="text-center mt-4">
            <span className="text-slate-500">Already have an account? </span>
            <Link to="/login" className="text-blue-600 underline font-semibold">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
