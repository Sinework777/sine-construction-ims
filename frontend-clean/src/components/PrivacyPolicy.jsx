import React from 'react';

const PrivacyPolicy = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
    <h1 className="text-3xl font-bold text-blue-700 mb-4">Privacy Policy</h1>
    <div className="max-w-2xl text-gray-700 text-left">
      <p className="mb-4">Your privacy is important to us. We do not share your personal information with third parties except as required by law or to provide our services.</p>
      <ul className="list-disc pl-6 mb-4">
        <li>We collect only necessary information for account creation and service delivery.</li>
        <li>Passwords are securely hashed and never stored in plain text.</li>
        <li>We use cookies for authentication and session management only.</li>
        <li>You may request deletion of your account and data at any time.</li>
      </ul>
      <p>For questions, contact <a href="mailto:support@consims.com" className="text-blue-600 underline">support@consims.com</a>.</p>
    </div>
    <a href="/" className="text-blue-600 hover:underline mt-8">Go to Home</a>
  </div>
);

export default PrivacyPolicy;
