
import React from 'react';
import { RBACContext, useRBAC, useRBACState } from './rbacContextImpl';

export function RBACProvider({ children }) {
  const value = useRBACState();
  return (
    <RBACContext.Provider value={value}>
      {children}
    </RBACContext.Provider>
  );
}

// Re-export useRBAC for convenience
export { useRBAC };

