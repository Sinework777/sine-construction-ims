import React from 'react';

const TermsOfService = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
    <h1 className="text-3xl font-bold text-blue-700 mb-4">Terms of Service</h1>
    <div className="max-w-2xl text-gray-700 text-left">
      <p className="mb-4">By using this platform, you agree to the following terms:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>You are responsible for maintaining the confidentiality of your account.</li>
        <li>Do not use the platform for unlawful or prohibited activities.</li>
        <li>We reserve the right to suspend accounts for violations.</li>
        <li>These terms may be updated at any time with notice.</li>
      </ul>
      <p>For questions, contact <a href="mailto:support@consims.com" className="text-blue-600 underline">support@consims.com</a>.</p>
    </div>
    <a href="/" className="text-blue-600 hover:underline mt-8">Go to Home</a>
  </div>
);

export default TermsOfService;
