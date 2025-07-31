// This file manages the live progress state for the PM dashboard build process
// It can be imported and updated by all autopilot phases

export const PM_DASHBOARD_PHASES = [
  { key: 'audit', label: 'Audit & Planning', weight: 10 },
  { key: 'scaffold', label: 'Core Scaffolding', weight: 15 },
  { key: 'modules', label: 'Module & Submodule Generation', weight: 25 },
  { key: 'ui', label: 'UI/UX Build & Integration', weight: 20 },
  { key: 'admin', label: 'Admin Assignment Panel', weight: 10 },
  { key: 'compliance', label: 'Compliance, Logging, Extensibility', weight: 5 },
  { key: 'testing', label: 'Testing, Error Correction, Finalization', weight: 15 },
];

// Returns { percent, phaseLabel }
export function getPMDashboardProgress(currentPhaseKey) {
  let percent = 0;
  let phaseLabel = '';
  let found = false;
  for (const phase of PM_DASHBOARD_PHASES) {
    if (!found) {
      percent += phase.weight;
      phaseLabel = phase.label;
    }
    if (phase.key === currentPhaseKey) found = true;
  }
  if (!found) percent = 100;
  return { percent, phaseLabel };
}
