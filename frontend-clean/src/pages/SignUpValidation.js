// Centralized validation logic for sign-up
import zxcvbn from 'zxcvbn';

export const passwordStrengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
export const passwordRequirements = [
  { label: 'At least 8 characters', test: (pw) => pw.length >= 8 },
  { label: 'One uppercase letter', test: (pw) => /[A-Z]/.test(pw) },
  { label: 'One lowercase letter', test: (pw) => /[a-z]/.test(pw) },
  { label: 'One number', test: (pw) => /[0-9]/.test(pw) },
  { label: 'One special character', test: (pw) => /[^A-Za-z0-9]/.test(pw) },
];

export function validateField(name, value, form) {
  switch (name) {
    case 'firstName':
    case 'lastName':
      return value.trim() ? '' : 'Required';
    case 'email':
      if (!value) return 'Required';
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) return 'Invalid email format';
      return '';
    case 'company':
      return value.trim() ? '' : 'Required';
    case 'phone':
      if (!value) return '';
      return /^\+?[0-9\s-]{7,20}$/.test(value) ? '' : 'Enter a valid phone number';
    case 'password':
      if (!value) return 'Required';
      if (zxcvbn(value).score < 3) return 'Password is too weak';
      for (const req of passwordRequirements) {
        if (!req.test(value)) return req.label;
      }
      return '';
    case 'confirmPassword':
      if (!value) return 'Required';
      if (value !== form.password) return 'Passwords do not match';
      return '';
    case 'terms':
      return value ? '' : 'You must agree to the Terms';
    default:
      return '';
  }
}
