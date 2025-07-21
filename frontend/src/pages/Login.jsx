import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { FcGoogle } from 'react-icons/fc';
import { FaMicrosoft } from 'react-icons/fa';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lang, setLang] = useState('en');
  const [darkMode, setDarkMode] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  function validateEmail(val) {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val);
  }

  function getPasswordStrength(pw) {
    let score = 0;
    if (pw.length > 7) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    setPasswordStrength(getPasswordStrength(e.target.value));
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
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (email === 'admin@ims.com' && password === 'password123') {
        localStorage.setItem('ims_token', 'fake-jwt-token');
        localStorage.setItem('ims_user', JSON.stringify({ name: 'Admin User', role: 'Admin', project: 'Tower A' }));
        navigate('/dashboard');
      } else {
        setError('Invalid email or password.');
      }
    }, 1200);
  }

  function handleSocialLogin(provider) {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('ims_token', provider + '-fake-jwt');
      navigate('/dashboard?tab=DailyReports');
    }, 1000);
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
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className={`text-sm font-semibold ${darkMode ? 'text-yellow-300' : 'text-blue-800'}`}>Email</label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={`rounded-lg px-4 py-3 ${darkMode ? 'bg-gray-800 text-yellow-200' : 'bg-white/80 text-blue-900'} shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-base`}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className={`text-sm font-semibold ${darkMode ? 'text-yellow-300' : 'text-blue-800'}`}>Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
                className={`rounded-lg px-4 py-3 ${darkMode ? 'bg-gray-800 text-yellow-200' : 'bg-white/80 text-blue-900'} shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-base w-full`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700 text-lg transition`}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0012 6.75c2.42 0 4.675.81 6.44 2.173M21 12c0 1.386-.282 2.705-.792 3.91M3.98 8.223A10.477 10.477 0 003 12c0 1.386.282 2.705.792 3.91m0 0A10.477 10.477 0 0012 17.25c2.42 0 4.675-.81 6.44-2.173m0 0A10.477 10.477 0 0021 12m-9 3.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9.75V9a3.75 3.75 0 10-7.5 0v.75m11.19 2.36a10.477 10.477 0 01-1.44 2.173m-1.44 2.173A10.477 10.477 0 0112 17.25c-2.42 0-4.675-.81-6.44-2.173m0 0A10.477 10.477 0 013 12c0-1.386.282-2.705.792-3.91m0 0A10.477 10.477 0 0112 6.75c2.42 0 4.675.81 6.44 2.173" /></svg>
                )}
              </button>
            </div>
            {/* Password strength meter */}
            <div className="w-full h-2 mt-2 rounded-full bg-gray-200 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  passwordStrength === 0 ? 'bg-red-400 w-1/5' :
                  passwordStrength === 1 ? 'bg-orange-400 w-2/5' :
                  passwordStrength === 2 ? 'bg-yellow-400 w-3/5' :
                  passwordStrength === 3 ? 'bg-green-400 w-4/5' :
                  'bg-blue-500 w-full'
                }`}
              />
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {passwordStrength === 0 && password.length > 0 && 'Very weak'}
              {passwordStrength === 1 && 'Weak'}
              {passwordStrength === 2 && 'Medium'}
              {passwordStrength === 3 && 'Strong'}
              {passwordStrength === 4 && 'Excellent'}
            </div>
          </div>
          {/* Remember Me toggle */}
          <div className="flex items-center gap-2">
            <input
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
              className="accent-blue-700 w-4 h-4 rounded focus:ring-2 focus:ring-blue-400"
            />
            <label htmlFor="rememberMe" className={`text-sm font-medium ${darkMode ? 'text-yellow-300' : 'text-blue-800'}`}>Remember Me</label>
          </div>
          {error && <div className="text-red-500 text-sm text-center mt-2 animate-shake">{error}</div>}
          <button
            type="submit"
            className={`bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 hover:from-blue-800 hover:to-blue-900 text-white font-bold py-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-base disabled:opacity-60 disabled:cursor-not-allowed ${loading ? 'animate-pulse' : ''}`}
            disabled={loading}
          >
            {loading && (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
            )}
            Log In
          </button>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-2">
            <a href="#" className="text-blue-700 hover:underline text-sm">Forgot password?</a>
            <a href="#" className="text-blue-700 hover:underline text-sm">Create account</a>
          </div>
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
