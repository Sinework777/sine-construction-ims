import React from 'react';

export default function ProgressBar({ percent, phase }) {
  return (
    <div className="w-full flex flex-col items-center my-4">
      <div className="w-full max-w-xl bg-gray-200 rounded-full h-6 overflow-hidden shadow">
        <div
          className="bg-blue-600 h-6 rounded-full transition-all duration-500 flex items-center justify-center text-white font-bold text-sm"
          style={{ width: `${percent}%` }}
        >
          {percent}%
        </div>
      </div>
      <div className="mt-2 text-gray-700 text-base font-semibold">{phase}</div>
    </div>
  );
}
