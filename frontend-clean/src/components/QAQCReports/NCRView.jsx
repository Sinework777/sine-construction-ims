import React, { useState } from 'react';
import { AiOutlinePrinter, AiOutlineFilePdf } from 'react-icons/ai';

export default function NCRView({ report, onBack }) {
  const [collapsed, setCollapsed] = useState({
    info: false,
    photos: false,
    approval: false,
    comments: false,
  });
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  if (!report) return null;

  function handlePrint() {
    window.print();
  }

  function handleCollapse(section) {
    setCollapsed(c => ({ ...c, [section]: !c[section] }));
  }

  function handleAddComment() {
    if (commentText.trim()) {
      setComments([...comments, { text: commentText, date: new Date().toLocaleString() }]);
      setCommentText('');
    }
  }

  return (
    <div className="space-y-6 p-6 bg-white rounded-2xl shadow-xl relative">
      {report.status === 'Draft' && (
        <div className="absolute top-4 right-4 text-yellow-500 text-lg font-bold opacity-60 pointer-events-none select-none">DRAFT</div>
      )}
      <div className="flex justify-between items-center">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition" onClick={onBack}>Back</button>
        <div className="flex items-center gap-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700 transition" onClick={handlePrint}><AiOutlinePrinter size={20} /> Print</button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-xl shadow hover:bg-yellow-600 transition"><AiOutlineFilePdf size={20} /> PDF</button>
        </div>
      </div>
      <div className="mt-4">
        <button className="text-blue-600 underline mb-2" onClick={() => handleCollapse('info')}>{collapsed.info ? 'Expand' : 'Collapse'} Info</button>
        {!collapsed.info && (
          <div>
            <p><strong>Description:</strong> {report.description}</p>
            <p><strong>Location:</strong> {report.location}</p>
            <p><strong>Spec Ref:</strong> {report.specRef}</p>
            <p><strong>Status:</strong> {report.status}</p>
            <p><strong>Responsible Party:</strong> {report.responsibleParty}</p>
            <p><strong>Proposed Fix:</strong> {report.proposedFix}</p>
          </div>
        )}
      </div>
      <div className="mt-4">
        <button className="text-blue-600 underline mb-2" onClick={() => handleCollapse('photos')}>{collapsed.photos ? 'Expand' : 'Collapse'} Photos</button>
        {!collapsed.photos && (
          <div className="grid grid-cols-3 gap-4 mt-4">
            {report.photos && report.photos.map((photo, index) => (
              <img key={index} src={typeof photo === 'string' ? photo : URL.createObjectURL(photo)} alt="Preview" className="w-full h-32 object-cover rounded-xl" />
            ))}
          </div>
        )}
      </div>
      <div className="mt-4">
        <button className="text-blue-600 underline mb-2" onClick={() => handleCollapse('approval')}>{collapsed.approval ? 'Expand' : 'Collapse'} Approval</button>
        {!collapsed.approval && (
          <div>
            {report.signature ? <img src={report.signature} alt="Signature" className="w-48 h-24 object-contain border rounded-xl" /> : <span>No signature</span>}
          </div>
        )}
      </div>
      <div className="mt-4">
        <button className="text-blue-600 underline mb-2" onClick={() => handleCollapse('comments')}>{collapsed.comments ? 'Expand' : 'Collapse'} Comments</button>
        {!collapsed.comments && (
          <div>
            <div className="mb-2">
              {comments.map((c, idx) => (
                <div key={idx} className="text-xs text-slate-600 mb-1">{c.date}: {c.text}</div>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" className="rounded px-2 py-1 border flex-1" value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="Add comment..." />
              <button type="button" className="bg-blue-600 text-white px-3 py-1 rounded shadow hover:bg-blue-700 transition text-xs" onClick={handleAddComment}>Add</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
