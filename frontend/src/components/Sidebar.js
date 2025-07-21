import React from 'react';

function Sidebar({ allowedModules = [] }) {
  return (
    <div className="w-64 bg-gray-800 text-white h-full p-4">
      <h2 className="text-lg font-bold mb-4">Navigation</h2>
      <ul className="space-y-2">
        {allowedModules.map((module, index) => (
          <li key={index} className="p-2 hover:bg-gray-700 rounded cursor-pointer">
            {module}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
