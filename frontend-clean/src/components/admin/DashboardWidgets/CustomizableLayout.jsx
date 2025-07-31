// Dashboard customizable module layout widget
import React from 'react';
export default function CustomizableLayout({ children }) {
  // TODO: Implement drag-and-drop or grid layout customization
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {children}
    </div>
  );
}
