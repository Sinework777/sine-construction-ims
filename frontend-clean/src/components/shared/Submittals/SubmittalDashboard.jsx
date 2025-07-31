import React, { useState } from 'react';
import SubmittalLog from './SubmittalLog.jsx';
import NewSubmittalForm from './NewSubmittalForm.jsx';
import SubmittalReview from './SubmittalReview.jsx';
import SubmittalAttachments from './SubmittalAttachments.jsx';

const tabs = ['Pending', 'Reviewed', 'Approved'];
export default function SubmittalDashboard() {
  const [activeTab, setActiveTab] = useState('Pending');
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Submittals Dashboard</h1>
      <div className="flex gap-2 mb-4">
        {tabs.map(tab => (
          <button key={tab} className={`px-4 py-2 rounded ${activeTab===tab?'bg-blue-600 text-white':'bg-gray-200 text-gray-700'}`} onClick={()=>setActiveTab(tab)}>{tab}</button>
        ))}
      </div>
      <SubmittalLog status={activeTab} />
      <NewSubmittalForm />
      <SubmittalReview />
      <SubmittalAttachments />
      <div className="mt-6 flex gap-2">
        <button className="bg-yellow-500 text-white px-4 py-2 rounded shadow">Export PDF</button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded shadow">Export Excel</button>
      </div>
    </div>
  );
}
