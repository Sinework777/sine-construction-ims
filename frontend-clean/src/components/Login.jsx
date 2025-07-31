import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaMicrosoft } from 'react-icons/fa';
import { Eye, EyeOff, Building2, Shield, Users, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';



const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const [selectedDemo, setSelectedDemo] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const demoCredentials = [
    { role: 'Admin', email: 'admin@construction.com', password: 'admin123', icon: Shield },
    { role: 'Project Manager', email: 'pm@construction.com', password: 'pm123', icon: Building2 },
    { role: 'QA/QC Manager', email: 'qaqc@construction.com', password: 'qaqc123', icon: CheckCircle },
    { role: 'HSE Manager', email: 'hse@construction.com', password: 'hse123', icon: AlertCircle }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      if (!formData.email || !formData.password) throw new Error('Please fill in all required fields');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) throw new Error('Please enter a valid email address');

      const result = await login(formData.email, formData.password);
      if (result.success && result.user) {
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          // Always route admin@sineims.com to master System Admin dashboard
          if (
            result.user.role === 'System Admin' ||
            formData.email.toLowerCase() === 'admin@sineims.com'
          ) {
            navigate('/admin/system');
          } else {
            navigate('/dashboard');
          }
        }, 800);
      } else {
        setError(result.message || 'Login failed');
        setSuccess('');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed');
      setSuccess('');
    } finally {
      setIsLoading(false);
    }
  };


  const fillDemoCredentials = async (email, password) => {
    setFormData(prev => ({ ...prev, email, password }));
    setError('');
    setSuccess('');
    setIsLoading(true);
    try {
      const result = await login(email, password);
      if (result.success && result.user) {
        setSuccess('Demo login successful! Redirecting...');
        setIsLoading(false);
        setTimeout(() => {
          // Always route admin@sineims.com to master System Admin dashboard
          if (
            result.user.role === 'System Admin' ||
            email.toLowerCase() === 'admin@sineims.com'
          ) {
            navigate('/admin/system');
          } else {
            navigate('/dashboard');
          }
        }, 800);
      } else {
        setError(result.message || 'Demo login failed');
        setSuccess('');
        setIsLoading(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Demo login failed');
      setSuccess('');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        <div className="hidden lg:block space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">SINE Construction IMS</h1>
                <p className="text-gray-600">Professional Construction Management</p>
              </div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Streamline your construction projects with our comprehensive Information Management System. Built for modern construction teams who demand efficiency and excellence.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-600">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
            <div className="flex gap-4 mb-4 justify-center">
              <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow text-gray-700 border border-gray-200" disabled>
                <FcGoogle className="w-5 h-5" /> Google
              </button>
              <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow text-gray-700 border border-gray-200" disabled>
                <FaMicrosoft className="w-5 h-5 text-blue-700" /> Microsoft
              </button>
            </div>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-green-700 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>{success}</span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded pr-10 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot password?</Link>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50`}
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Demo Login */}
            <div className="mt-6 flex flex-col gap-2 items-end w-full max-w-xs ml-auto">
              <div className="flex gap-2 items-center w-full">
                <div className="relative w-full">
                  <button
                    type="button"
                    className={`border border-blue-100 rounded px-2 py-1 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm w-full flex items-center justify-between bg-white ${dropdownOpen ? 'ring-2 ring-blue-500' : ''}`}
                    onClick={() => setDropdownOpen(v => !v)}
                  >
                    <span className="flex items-center gap-2">
                      {selectedDemo && (() => {
                        const cred = demoCredentials.find(c => c.role === selectedDemo);
                        if (cred) {
                          const Icon = cred.icon;
                          return <Icon className="w-4 h-4 text-blue-600" />;
                        }
                        return null;
                      })()}
                      {selectedDemo || 'Select Demo Role'}
                    </span>
                    <span className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute left-0 top-full mt-1 w-full bg-white border border-blue-100 rounded shadow-lg z-10">
                      {demoCredentials.map((cred, idx) => {
                        const Icon = cred.icon;
                        return (
                          <button
                            key={idx}
                            type="button"
                            className={`flex items-center gap-2 px-3 py-2 w-full text-left hover:bg-blue-50 text-blue-700 ${selectedDemo === cred.role ? 'bg-blue-100' : ''}`}
                            onClick={() => {
                              setSelectedDemo(cred.role);
                              setDropdownOpen(false);
                              setFormData({ email: cred.email, password: cred.password, rememberMe: false });
                            }}
                          >
                            <Icon className="w-4 h-4 text-blue-600" />
                            <span>{cred.role}</span>
                            <span className="ml-auto text-xs text-gray-400">{cred.email}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
                <button
                  className="text-blue-600 hover:underline border border-blue-100 rounded px-2 py-1"
                  type="button"
                  disabled={!selectedDemo}
                  onClick={() => {
                    const cred = demoCredentials.find(c => c.role === selectedDemo);
                    if (cred) fillDemoCredentials(cred.email, cred.password);
                  }}
                >
                  Demo Login
                </button>
              </div>
            </div>

            <div className="mt-4 text-sm text-center">
              Don’t have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
