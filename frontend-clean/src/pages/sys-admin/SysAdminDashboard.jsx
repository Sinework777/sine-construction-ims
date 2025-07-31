
import React from 'react';
import SysAdminDashboardV2 from './SysAdminDashboardV2';
// Visual indicator for deployment validation
export default function SysAdminDashboard() {
  return (
    <>
      <div style={{background:'#1976d2',color:'#fff',padding:'8px 24px',fontWeight:700,fontSize:18}}>Super Admin Dashboard V2 - LIVE</div>
      <SysAdminDashboardV2 />
    </>
  );
}
