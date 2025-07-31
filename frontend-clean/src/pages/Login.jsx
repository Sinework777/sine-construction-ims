import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../helpers/authService.jsx';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { FcGoogle } from 'react-icons/fc';
import { FaMicrosoft } from 'react-icons/fa';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lang, setLang] = useState('en');
  const [darkMode, setDarkMode] = useState(false);

  function validateEmail(val) {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }
    setLoading(true);
    try {
      const result = await login({ email, password });
      setLoading(false);
      if (result.success && result.token && result.role) {
        localStorage.setItem('ims_token', result.token);
        localStorage.setItem('ims_user', JSON.stringify({ email, role: result.role }));
        // Role-based routing
        if (result.role === 'System Admin') {
          navigate('/admin/system');
        } else if (result.role === 'admin') {
          navigate('/dashboard/admin');
        } else if (result.role === 'pm') {
          navigate('/dashboard/pm');
        } else if (result.role === 'qaqc') {
          navigate('/dashboard/qaqc');
        } else if (result.role === 'hse') {
          navigate('/dashboard/hse');
        } else {
          navigate('/dashboard');
        }
      } else if (result.pending) {
        /*...*/
        localStorage.setItem('ims_user', JSON.stringify({ email, role: result.role }));
        // Role-based routing
        switch (result.role) {
          case 'System Admin':
            navigate('/admin/system');
            break;
          case 'admin':
            navigate('/dashboard/admin');
            break;
          case 'pm':
            navigate('/dashboard/pm');
            break;
          case 'qaqc':
            navigate('/dashboard/qaqc');
            break;
          case 'hse':
            navigate('/dashboard/hse');
            break;
          default:
            navigate('/dashboard');
        }
      }
    } catch {
      setLoading(false);
      setError('Login failed. Please check your credentials.');
    }
  }

  function handleSocialLogin() {
    // Placeholder for social login logic
    setError('Social login not implemented in demo.');
  }

  return (
    <div className={`min-h-screen flex flex-col sm:flex-row transition-all duration-500 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700' : 'bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400'}`}>
      {/* Branding Section */}
      <div className="hidden sm:flex flex-col justify-between items-start w-1/2 px-10 py-12 relative">
        <div className="flex items-center gap-3 mb-8">
          <img src="https://cdn-icons-png.flaticon.com/512/2933/2933186.png" alt="IMS Logo" className="w-10 h-10 drop-shadow-xl" />
          <span className="font-extrabold text-2xl text-white drop-shadow">IMS Platform</span>
        </div>
        <div className="mt-20">
          <h1 className="text-4xl font-extrabold text-white mb-4 drop-shadow-xl">Construction IMS</h1>
          <p className="text-lg text-blue-100 mb-8 max-w-md">Industry-leading platform for daily reports, RFIs, QA/QC, and more. Secure, scalable, and built for modern teams.</p>
        </div>
        <div className="absolute bottom-8 left-10 text-xs text-blue-200 opacity-80">&copy; {new Date().getFullYear()} IMS Software</div>
      </div>

      {/* Login Card Section */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* Top-right controls */}
        <div className="absolute top-6 right-6 flex gap-3 items-center z-10">
          {/* Language Dropdown */}
          <select value={lang} onChange={e => setLang(e.target.value)} className={`bg-white/80 ${darkMode ? 'text-gray-700' : 'text-blue-700'} font-semibold px-4 py-2 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm`}>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
          {/* Dark mode toggle */}
          <button
            type="button"
            aria-label="Toggle dark mode"
            className={`rounded-full p-2 shadow transition ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-blue-700'}`}
            onClick={() => setDarkMode(d => !d)}
          >
            {darkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </button>
        </div>
        <form
          className={`w-full max-w-md mx-auto ${darkMode ? 'bg-gray-900/60 border-gray-700' : 'bg-white/30 border-blue-200'} backdrop-blur-xl rounded-2xl shadow-2xl border p-8 sm:p-10 flex flex-col gap-6 animate-fade-in`}
          onSubmit={handleLogin}
        >
          <h2 className={`text-2xl font-bold text-center mb-2 ${darkMode ? 'text-yellow-400' : 'text-blue-900'}`}>Sign in to IMS</h2>
          {/* Error message with aria-live for a11y */}
          {error && (
            <div className="text-red-600 text-center mb-2" role="alert" aria-live="polite">{error}</div>
          )}
          {/* Social login buttons */}
          <div className="flex gap-4 mb-2 justify-center">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow hover:scale-105 transition text-gray-700 font-semibold border border-gray-200"
              onClick={() => handleSocialLogin('google')}
              disabled={loading}
            >
              <FcGoogle className="w-5 h-5" /> Google
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow hover:scale-105 transition text-gray-700 font-semibold border border-gray-200"
              onClick={() => handleSocialLogin('microsoft')}
              disabled={loading}
            >
              <FaMicrosoft className="w-5 h-5 text-blue-700" /> Microsoft
            </button>
          </div>
    // Placeholder for social login logic
          <label htmlFor="email" className="sr-only">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
          />
          {/* Password field with label */}
          <label htmlFor="password" className="sr-only">Password</label>
          <input
            id="password"
            name="password"
            type={'password'}
            autoComplete="current-password"
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            disabled={loading}
          />
          {/* ...existing code... */}
        </form>
        {/* Animated background shapes */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-700 rounded-full blur-2xl opacity-30 animate-float" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full blur-2xl opacity-20 animate-float2" />
        </div>
      </div>
    </div>
  );

}
