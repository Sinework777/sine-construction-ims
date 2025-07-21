

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaSpinner, FaHome } from 'react-icons/fa';

const roles = [
  'Admin', 'Project Manager', 'QA/QC Engineer', 'HSE Officer', 'Document Controller', 'Cost Engineer', 'Procurement Engineer', 'Scheduler / Planner', 'Site Supervisor', 'Design Engineer', 'Architect', 'Mechanical Engineer', 'Electrical Engineer', 'Client / Owner',
];

export default function Login() {
  // Remove useAuth, use localStorage and navigate for login
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [rememberMe] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  }

  function getRolePath(role) {
    const map = {
      'Admin': 'admin', 'Project Manager': 'pm', 'QA/QC Engineer': 'qaqc', 'HSE Officer': 'hse', 'Document Controller': 'docs', 'Cost Engineer': 'finance', 'Procurement Engineer': 'procurement', 'Scheduler / Planner': 'schedule', 'Site Supervisor': 'site', 'Design Engineer': 'design', 'Architect': 'architect', 'Mechanical Engineer': 'mechanical', 'Electrical Engineer': 'electrical', 'Client / Owner': 'client-view',
    };
    return map[role] || role.replace(/\s+/g, '').toLowerCase();
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    setTimeout(() => {
      let found = false;
      let user = null;
      roles.forEach(role => {
        const rolePath = getRolePath(role);
        const signupData = JSON.parse(localStorage.getItem(`signupData_${rolePath}`));
        if (
          signupData &&
          signupData.email === form.email &&
          signupData.password === form.password
        ) {
          user = JSON.parse(localStorage.getItem(`sessionUser_${rolePath}`)) || {
            name: signupData.fullName,
            email: signupData.email,
            role: rolePath,
            token: Math.random().toString(36).substr(2),
          };
          found = true;
          localStorage.setItem('sessionUser', JSON.stringify(user));
          setLoading(false);
          setSuccess(true);
          setTimeout(() => navigate(`/dashboard/${rolePath}`), 800);
        }
      });
      if (!found) {
        setError('Invalid email or password.');
        setLoading(false);
      }
    }, 1000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 relative">
      {/* Home Button */}
      <button
        className="absolute top-6 left-6 bg-white/80 hover:bg-blue-100 text-blue-700 rounded-full shadow-lg p-3 flex items-center gap-2 font-bold text-lg"
        onClick={() => navigate('/')}
        aria-label="Home"
      >
        <FaHome className="mr-2" /> Home
      </button>
      {/* Card Layout */}
      <div className="w-full max-w-md mx-auto bg-white/90 rounded-2xl shadow-2xl p-8 flex flex-col items-center animate-fade-in">
        {/* Logo */}
        <img src="https://cdn-icons-png.flaticon.com/512/2933/2933186.png" alt="ConsIMS Logo" className="w-14 h-14 mb-4 drop-shadow-xl" />
        <h2 className="text-3xl font-extrabold mb-2 text-center tracking-tight">Sign In</h2>
        <p className="text-base text-slate-500 mb-6 text-center">Access your Construction IMS dashboard</p>
        {/* Error/Success Toast */}
        {error && (
          <div className="w-full mb-4 px-4 py-2 bg-red-100 text-red-700 rounded shadow animate-fade-in text-center">{error}</div>
        )}
        {success && (
          <div className="w-full mb-4 px-4 py-2 bg-green-100 text-green-700 rounded shadow animate-fade-in text-center">Login successful! Redirecting...</div>
        )}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              required
              className="peer w-full px-4 pt-6 pb-2 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none bg-white text-lg transition placeholder-transparent"
              placeholder="Email address"
              autoComplete="username"
            />
            <label htmlFor="email" className="absolute left-4 top-2 text-slate-500 text-sm font-semibold pointer-events-none transition-all peer-focus:text-blue-700 peer-focus:top-1 peer-focus:text-xs peer-placeholder-shown:top-5 peer-placeholder-shown:text-base">Email address</label>
          </div>
          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              required
              className="peer w-full px-4 pt-6 pb-2 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none bg-white text-lg transition placeholder-transparent"
              placeholder="Password"
              autoComplete="current-password"
            />
            <label htmlFor="password" className="absolute left-4 top-2 text-slate-500 text-sm font-semibold pointer-events-none transition-all peer-focus:text-blue-700 peer-focus:top-1 peer-focus:text-xs peer-placeholder-shown:top-5 peer-placeholder-shown:text-base">Password</label>
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700 text-xl"
              onClick={() => setShowPassword(s => !s)}
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between gap-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="rememberMe"
                checked={rememberMe}
                onChange={handleChange}
                className="accent-blue-600 w-4 h-4 rounded"
              />
              Remember Me
            </label>
            <button
              type="button"
              className="text-blue-600 hover:underline font-semibold text-sm"
              onClick={() => navigate('/forgot-password')}
            >
              🔒 Forgot Password?
            </button>
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-blue-800 transition text-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? <FaSpinner className="animate-spin h-5 w-5" /> : null}
            Login
          </button>
        </form>
        {/* Social Login & Captcha Placeholders */}
        <div className="w-full flex flex-col gap-2 mt-6">
          <div className="flex gap-3 justify-center">
            <button className="bg-white border border-slate-200 rounded-full px-4 py-2 flex items-center gap-2 text-slate-700 font-semibold shadow hover:bg-blue-50 transition" disabled>
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-5 h-5" /> Google
            </button>
            <button className="bg-white border border-slate-200 rounded-full px-4 py-2 flex items-center gap-2 text-slate-700 font-semibold shadow hover:bg-blue-50 transition" disabled>
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="w-5 h-5" /> Microsoft
            </button>
          </div>
          <div className="text-xs text-slate-400 text-center mt-2">Captcha (coming soon)</div>
        </div>
        {/* Signup Link */}
        <div className="w-full text-center mt-6">
          <button
            type="button"
            className="text-blue-600 hover:underline font-semibold text-sm"
            onClick={() => navigate('/signup')}
          >
            🆕 Create New Account
          </button>
        </div>
        {/* Branding Watermark */}
        <div className="w-full text-center mt-8 text-xs text-slate-400">Powered by ConsIMS</div>
      </div>
    </div>
  );
}
