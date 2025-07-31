import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400">
      <div className="bg-white/80 rounded-xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">Forgot Password</h2>
        <p className="mb-6 text-gray-700">Password reset functionality coming soon.</p>
        <button
          className="bg-blue-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-900 transition"
          onClick={() => navigate('/login')}
        >Back to Login</button>
      </div>
    </div>
  );
}
