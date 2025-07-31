import React, { useState, useEffect } from 'react';
import ProgressBar from '../../components/pm/ProgressBar';
import { getPMDashboardProgress, PM_DASHBOARD_PHASES } from './PMDashboardAutopilotProgress';

// Simulate live progress for demo; in real autopilot, update phaseKey as each phase completes
export default function PMDashboardAutopilotLive() {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [percent, setPercent] = useState(0);
  const [phaseLabel, setPhaseLabel] = useState(PM_DASHBOARD_PHASES[0].label);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhaseIdx((idx) => {
        if (idx < PM_DASHBOARD_PHASES.length - 1) return idx + 1;
        clearInterval(interval);
        return idx;
      });
    }, 2000); // Simulate phase completion every 2s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const { percent, phaseLabel } = getPMDashboardProgress(PM_DASHBOARD_PHASES[phaseIdx].key);
    setPercent(percent);
    setPhaseLabel(phaseLabel);
  }, [phaseIdx]);

  return <ProgressBar percent={percent} phase={phaseLabel} />;
}
