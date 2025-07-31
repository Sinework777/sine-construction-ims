// Step definitions for modular, multi-step sign-up
export const steps = [
  {
    label: 'Basic Info',
    fields: ['firstName', 'lastName', 'email'],
  },
  {
    label: 'Company Info',
    fields: ['company', 'phone', 'howHeard'],
  },
  {
    label: 'Security',
    fields: ['password', 'confirmPassword', 'terms'],
  },
  {
    label: 'Confirm',
    fields: [], // summary step
  },
];

export const howHeardOptions = [
  'Google Search',
  'LinkedIn',
  'Referral',
  'Industry Event',
  'Email Campaign',
  'Other',
];
