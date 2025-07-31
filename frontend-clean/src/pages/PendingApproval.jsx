import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PendingApproval() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="bg-white/90 rounded-2xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center animate-fade-in">
        <img src="https://cdn-icons-png.flaticon.com/512/2933/2933186.png" alt="ConsIMS Logo" className="w-14 h-14 mb-4 drop-shadow-xl" />
        <h2 className="text-2xl font-bold mb-2 text-center text-blue-700">Account Pending Approval</h2>
        <p className="text-base text-slate-600 mb-6 text-center">Your account is awaiting admin approval.<br />You will be notified once approved.</p>
        <button
          className="w-full bg-blue-600 text-white font-bold py-2 rounded-xl shadow-lg hover:bg-blue-800 transition mb-4"
          onClick={() => {
            localStorage.removeItem('sessionUser');
            navigate('/login');
          }}
        >Logout</button>
        <a href="mailto:support@consims.com" className="text-blue-600 hover:underline text-sm mb-2">Contact Support</a>
        <div className="w-full text-center mt-8 text-xs text-slate-400">Powered by ConsIMS</div>
      </div>
    </div>
  );
}
